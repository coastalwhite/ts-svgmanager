import SVGNode, { AttributeValue, SVGLinkedNode } from './SVGNode'

import { v4 as uuidv4 } from 'uuid'
import {
    EventDefinition,
    EventFunc,
    SVGEvent,
    SVGAttribute,
} from './definitions'
import { parseSVGViewBox } from './helpers/Parser'
import ViewBox from './helpers/ViewBox'

const DEFINITION_PREFIX = 'figure-'
const NAME_PREFIX = 'named-'
const TAG_PREFIX = 'tag-'

const DEFAULT_SVG_WIDTH = '500px'
const DEFAULT_SVG_HEIGHT = '500px'
const DEFAULT_VIEWBOX = '0 0 100 100'

export type SVGManagerDefinition = string & { isSvgManagerDef: true }
export type SVGManagerName = string & { isSvgManagerName: true }
export type SVGManagerTag = string & { isSvgManagerTag: true }

/**
 * A class used to manage SVG's in order to minimize definitions
 * and make controlling it from JS/TS as easy and reliable as possible.
 */
export default class SVGManager {
    private _managerid: string

    private _rootElement: HTMLElement
    private _svgElement: SVGElement
    private _defintions: string[]
    private _names: string[]

    private defsElement(): SVGDefsElement {
        const defs = this._svgElement.getElementsByTagName('defs')
        return defs[0]
    }

    private prefixManagerId(str: string): string {
        return this._managerid + '-' + str
    }

    private toDefId(elementId: string): SVGManagerDefinition {
        return this.prefixManagerId(
            DEFINITION_PREFIX + elementId,
        ) as SVGManagerDefinition
    }

    private toNameClass(name: string): SVGManagerName {
        return this.prefixManagerId(NAME_PREFIX + name) as SVGManagerName
    }

    private toTagClass(tag: string): SVGManagerTag {
        return this.prefixManagerId(TAG_PREFIX + tag) as SVGManagerTag
    }

    public getNamesFromElem(el: SVGElement): string[] {
        const prefix = this.prefixManagerId(NAME_PREFIX)

        return Array.from(el.classList)
            .filter((className) => className.startsWith(prefix))
            .map((name) => name.substr(prefix.length))
    }

    public getTagsFromElem(el: SVGElement): string[] {
        const prefix = this.prefixManagerId(TAG_PREFIX)

        return Array.from(el.classList)
            .filter((className) => className.startsWith(prefix))
            .map((name) => name.substr(prefix.length))
    }

    public addNamesToElem(el: SVGElement, names: string[]): SVGElement {
        this.getNamesFromElem(el).forEach((name) => {
            el.classList.remove(name)
        })

        names
            .filter((name) => !this._names.includes(name))
            .forEach((name) => {
                el.classList.add(this.toNameClass(name))
                this._names.push(name)
            })
        return el
    }
    public addTagsToElem(el: SVGElement, tags: string[]): SVGElement {
        this.getTagsFromElem(el).forEach((tag) => {
            el.classList.remove(tag)
        })

        tags.forEach((tag) => el.classList.add(this.toTagClass(tag)))
        return el
    }

    private doesDefExist(elementId: string): boolean {
        return this._defintions.includes(elementId)
    }

    private addDefintion(element: SVGNode): SVGManagerDefinition {
        const definitionId = this.toDefId(element.toHash())

        this._defintions.push(definitionId)
        this.defsElement().appendChild(
            this.addENT(element.set('id', definitionId).toHTML(), element),
        )

        return definitionId
    }

    private addEventsToElem(
        elem: SVGElement,
        events: EventDefinition[],
    ): SVGElement {
        // Group all events together by type
        const groupedEvents = events.reduce((r, a) => {
            r[a.eventType] = r[a.eventType] || []
            r[a.eventType].push(a)
            return r
        }, Object.create(null))

        // Add all event listeners to the HTML elements
        Object.keys(groupedEvents).forEach((ev) =>
            elem.addEventListener(ev, (e) => {
                groupedEvents[ev].forEach((eventCall: EventDefinition) => {
                    eventCall.func(e)
                })
            }),
        )

        return elem
    }

    /**
     * Adds events, names, tags recursively
     */
    private addENT(head: SVGElement, node: SVGNode): SVGElement {
        this.addEventsToElem(head, node.events)
        this.addNamesToElem(head, node.names)
        this.addTagsToElem(head, node.tags)

        const nodeChildren = node.children
        const headChildren = Array.from(head.children) as SVGElement[]
        if (nodeChildren.length === headChildren.length)
            headChildren.forEach((child, index) =>
                this.addENT(child, nodeChildren[index]),
            )

        return head
    }

    private addUse(
        elementId: string,
        args?: {
            names?: string[]
            tags?: string[]
            attributes?: { attrName: SVGAttribute; attrValue: AttributeValue }[]
            events?: EventDefinition[]
        },
    ) {
        const node = new SVGNode('use').set('href', '#' + elementId)
        if (args !== undefined) {
            if (args.attributes !== undefined)
                args.attributes.forEach((attribute) => {
                    node.set(attribute.attrName, attribute.attrValue)
                })
        }

        let elem = node.toHTML()
        if (args !== undefined) {
            if (args.events !== undefined)
                elem = this.addEventsToElem(elem, args.events)
            if (args.names !== undefined)
                elem = this.addNamesToElem(elem, args.names)
            if (args.tags !== undefined)
                elem = this.addTagsToElem(elem, args.names)
        }
        this._svgElement.appendChild(elem)
    }
    private addFigure(element: SVGNode) {
        this._svgElement.appendChild(this.addENT(element.toHTML(), element))
    }

    /**
     * Constructs a empty SVGManager object
     */
    public constructor() {
        this._managerid = uuidv4()

        this._defintions = []
        this._names = []
    }

    /**
     * Initializes the SVGManager to DOM within the container with id *rootId*\
     * It returns itself, for easy programming
     *
     * # Note
     * This svg has some default styling:
     * - viewBox of '0 0 100 100'
     * - width of 500px
     * - height of 500px
     * @param rootId The parent id
     */
    public init(rootId: string): this {
        const rootElement = document.getElementById(rootId)

        this._rootElement = rootElement
        this._defintions = []
        this._names = []

        const svgElement = new SVGNode('svg')
            .set('viewBox', DEFAULT_VIEWBOX)
            .set('width', DEFAULT_SVG_WIDTH)
            .set('height', DEFAULT_SVG_HEIGHT)
            .set('id', this._managerid)
            .append(new SVGNode('defs'))
            .toHTML()

        this._svgElement = this._rootElement.appendChild(svgElement)

        return this
    }

    /**
     * Fetches the ViewBox from root SVG
     */
    get viewBox(): ViewBox {
        return parseSVGViewBox(this._svgElement.getAttribute('viewBox'))
    }

    /**
     * Sets the ViewBox to the root SVG
     */
    set viewBox(vb: ViewBox) {
        this._svgElement.setAttribute('viewBox', vb.toString())
    }

    /**
     * Adds the definition of element to list of definitions,
     * So that next time, when it is used, the element can rendered using the definition.
     */
    public ensureDefinition(element: SVGNode): SVGManagerDefinition {
        const elementId = element.toHash()

        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element)
        }

        return this.toDefId(elementId)
    }

    /**
     * Renders a figure to the SVG using a figure ID/Hash.
     *
     * # Note
     * Requires a definition to present for the figure ID
     * otherwise it throws a Error
     *
     * @param elementId Definition id string
     * @param args Optional arguments from the rendering, including the names, tags, attributes and events
     */
    public renderId(
        definition: SVGManagerDefinition,
        args?: {
            names?: string[]
            tags?: string[]
            attributes?: { attrName: SVGAttribute; attrValue: AttributeValue }[]
            events?: EventDefinition[]
        },
    ): this {
        if (!this.doesDefExist(definition))
            throw new Error("Tried to render an Id that doesn't exist")

        this.addUse(this.toDefId(definition), args)

        return this
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    public render(element: SVGNode): this {
        this.addFigure(element)

        return this
    }

    /**
     * Mutates the SVGManager to add an event.
     * Multiple functions can be set for the same event.
     * Then, it returns itself, for easy programming.
     */
    public on(event: SVGEvent, func: EventFunc): this {
        this._svgElement.addEventListener(event.substr(2), func)
        return this
    }

    /**
     * Removes a named figure from the DOM\
     * If named item does not exist, it will not do anything.
     */
    public removeNamed(name: string): this {
        const items = Array.from(
            this._svgElement.getElementsByClassName(this.toNameClass(name)),
        )
        items.forEach((item) => this._svgElement.removeChild(item))

        return this
    }

    /**
     * Fetches the DOM element that belongs to a named node
     */
    public fetchNamed(name: string): SVGLinkedNode | null {
        const items = Array.from(
            this._svgElement.getElementsByClassName(this.toNameClass(name)),
        ).map((el) => new SVGLinkedNode(el as SVGElement, this))

        if (items.length === 0) return null

        return items[0]
    }

    /**
     * Fetches all DOM elements in the SVG tagged with tag
     */
    public fetchTagged(tag: string): SVGLinkedNode[] {
        return Array.from(
            this._svgElement.getElementsByClassName(this.toTagClass(tag)),
        ).map((el) => new SVGLinkedNode(el as SVGElement, this))
    }

    /**
     * Removes the SVG from the DOM
     */
    public remove() {
        this._rootElement.removeChild(this._svgElement)
    }

    /**
     * Removes all the content from the SVG in the DOM including the definitions
     */
    public clean() {
        // Remove event listeners
        this._rootElement.removeChild(this._svgElement)
        const svgElement = new SVGNode('svg').toHTML()
        for (let i = 0; i < this._svgElement.attributes.length; i++) {
            const attr = this._svgElement.attributes[i]
            svgElement.setAttribute(attr.name, attr.value)
        }

        svgElement.innerHTML = ''
        this._defintions = []
        this._names = []

        svgElement.appendChild(new SVGNode('defs').toHTML())

        this._rootElement.appendChild(svgElement)
        this._svgElement = svgElement
    }

    /**
     * Fetch an attribute value from root SVG element
     * @param attr Attribute name
     */
    public get(attr: SVGAttribute): string {
        return this._svgElement.getAttribute(attr) || ''
    }

    /**
     * Set/change an attribute value from root SVG element
     * @param attr Attribute name
     * @param value Set value
     */
    public set(attr: SVGAttribute, value: AttributeValue): this {
        this._svgElement.setAttribute(attr, value.toString())

        return this
    }

    /**
     * Returns the unique identifier connected to this SVGManager
     */
    public get id(): string {
        return this._managerid
    }
}
