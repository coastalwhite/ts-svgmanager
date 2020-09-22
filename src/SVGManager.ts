import SVGNode, { AttributeValue } from './SVGNode'

import { v4 as uuidv4 } from 'uuid'
import {
    EventDefinition,
    EventFunc,
    SVGAttr,
    SVGEvent,
    SVGTag,
    SVGViewBox,
} from './definitions'
import { parseSVGViewBox } from './helpers/Parser'

const DEFINITION_PREFIX = 'figure-'
const NAME_PREFIX = 'named-'
const TAG_PREFIX = 'tag-'

const DEFAULT_SVG_WIDTH = '500px'
const DEFAULT_SVG_HEIGHT = '500px'
const DEFAULT_VIEWBOX = '0 0 100 100'

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

    private toDefId(elementId: string): string {
        return this.prefixManagerId(DEFINITION_PREFIX + elementId)
    }

    private getName(name: string): string {
        return this.prefixManagerId(NAME_PREFIX + name)
    }

    private getTag(tag: string): string {
        return this.prefixManagerId(TAG_PREFIX + tag)
    }

    private addNamesToElem(el: SVGElement, names: string[]): SVGElement {
        if (names.some((name) => this._names.includes(name)))
            console.log('Duplicate name is being removed!')

        names
            .filter((name) => !this._names.includes(name))
            .forEach((name) => {
                el.classList.add(this.getName(name))
                this._names.push(name)
            })
        return el
    }
    private addTagsToElem(el: SVGElement, tags: string[]): SVGElement {
        tags.forEach((tag) => el.classList.add(this.getTag(tag)))
        return el
    }

    private doesDefExist(elementId: string): boolean {
        return this._defintions.includes(elementId)
    }

    private addDefintion(element: SVGNode): string {
        const elementId = element.toHash()

        this._defintions.push(elementId)
        this.defsElement().appendChild(
            element.set(SVGAttr.Id, this.toDefId(elementId)).toHTML(),
        )

        return elementId
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
            elem.addEventListener((ev as string).substr(2), (e) => {
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
        this.addEventsToElem(head, node.getEvents())
        this.addNamesToElem(head, node.getNames())
        this.addTagsToElem(head, node.getTags())

        const nodeChildren = node.getChildren()
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
            attributes?: { attrName: SVGAttr; attrValue: AttributeValue }[]
            events?: EventDefinition[]
        },
    ) {
        const node = new SVGNode(SVGTag.Use).set(SVGAttr.Href, '#' + elementId)
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
    public init(rootId: string): SVGManager {
        const rootElement = document.getElementById(rootId)

        this._rootElement = rootElement
        this._defintions = []
        this._names = []

        const svgElement = new SVGNode(SVGTag.Svg)
            .set(SVGAttr.ViewBox, DEFAULT_VIEWBOX)
            .set(SVGAttr.Width, DEFAULT_SVG_WIDTH)
            .set(SVGAttr.Height, DEFAULT_SVG_HEIGHT)
            .set(SVGAttr.Id, this._managerid)
            .append(new SVGNode(SVGTag.Defs))
            .toHTML()

        this._svgElement = this._rootElement.appendChild(svgElement)

        return this
    }

    /**
     * Fetches the ViewBox from root SVG
     */
    get viewBox(): SVGViewBox {
        return parseSVGViewBox(this._svgElement.getAttribute('viewBox'))
    }

    /**
     * Sets the ViewBox to the root SVG
     */
    set viewBox(vb: SVGViewBox) {
        this._svgElement.setAttribute('viewBox', vb.toString())
    }

    /**
     * Adds the definition of element to list of definitions,
     * So that next time, when it is used, the element can rendered using the definition.
     */
    public ensureDefinition(element: SVGNode): string {
        const elementId = element.toHash()

        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element)
        }

        return elementId
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
        elementId: string,
        args?: {
            names?: string[]
            tags?: string[]
            attributes?: { attrName: SVGAttr; attrValue: AttributeValue }[]
            events?: EventDefinition[]
        },
    ) {
        if (!this.doesDefExist(elementId))
            throw new Error("Tried to render an Id that doesn't exist")

        this.addUse(this.toDefId(elementId), args)
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    public render(element: SVGNode) {
        this.addFigure(element)
    }

    /**
     * Mutates the SVGManager to add an event.
     * Multiple functions can be set for the same event.
     * Then, it returns itself, for easy programming.
     */
    public addEvent(event: SVGEvent, func: EventFunc): SVGManager {
        this._svgElement.addEventListener(event.substr(2), func)
        return this
    }

    /**
     * Removes a named figure from the DOM\
     * If named item does not exist, it will not do anything.
     */
    public removeNamed(name: string) {
        const items = Array.from(
            this._svgElement.getElementsByClassName(this.getName(name)),
        )
        items.forEach((item) => this._svgElement.removeChild(item))
    }

    /**
     * Fetches the DOM element that belongs to a named node
     */
    public fetchNamed(name: string): SVGElement | null {
        return (
            (Array.from(
                this._svgElement.getElementsByClassName(this.getName(name)),
            )[0] as SVGElement) || null
        )
    }

    /**
     * Fetches all DOM elements in the SVG tagged with tag
     */
    public fetchTagged(tag: string): SVGElement[] {
        return Array.from(
            this._svgElement.getElementsByClassName(this.getTag(tag)),
        ) as SVGElement[]
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
        const attributes = this._svgElement.attributes
        this._rootElement.removeChild(this._svgElement)
        const svgElement = new SVGNode(SVGTag.Svg).toHTML()
        for (let i = 0; i < this._svgElement.attributes.length; i++) {
            const attr = this._svgElement.attributes[i]
            svgElement.setAttribute(attr.name, attr.value)
        }

        svgElement.innerHTML = ''
        this._defintions = []
        this._names = []

        svgElement.appendChild(new SVGNode(SVGTag.Defs).toHTML())

        this._rootElement.appendChild(svgElement)
        this._svgElement = svgElement
    }

    /**
     * Fetch an attribute value from root SVG element
     * @param attr Attribute name
     */
    public get(attr: SVGAttr): string {
        return this._svgElement.getAttribute(attr) || ''
    }

    /**
     * Set/change an attribute value from root SVG element
     * @param attr Attribute name
     * @param value Set value
     */
    public set(attr: SVGAttr, value: AttributeValue): SVGManager {
        this._svgElement.setAttribute(attr, value.toString())

        return this
    }

    /**
     * Returns the unique identifier connected to this SVGManager
     */
    get id(): string {
        return this._managerid
    }

    /**
     * Returns the DOM-id of a definition\
     * Used with e.g. linear gradients
     * @param elementId manager id of the element
     */
    public mentionDefinition(elementId: string): string {
        return this.toDefId(elementId)
    }
}
