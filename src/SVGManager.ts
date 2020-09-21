import V2D from './V2D'
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
import { htmlParseSVGNode, parseSVGViewBox } from './Parser'

const DEFINITION_PREFIX = 'figure-'
const NAME_PREFIX = 'named-'

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

    private addUse(
        elementId: string,
        args?: {
            name?: string
            attributes?: { attrName: SVGAttr; attrValue: AttributeValue }[]
            events?: EventDefinition[]
        },
    ) {
        const node = new SVGNode(SVGTag.Use).set(SVGAttr.Href, '#' + elementId)
        if (args !== undefined) {
            if (args.name !== undefined)
                node.set(SVGAttr.Id, this.getName(args.name))
            if (args.attributes !== undefined)
                args.attributes.forEach((attribute) => {
                    node.set(attribute.attrName, attribute.attrValue)
                })
        }

        let elem = node.toHTML()
        if (args !== undefined && args.events !== undefined)
            elem = this.addEventsToElem(elem, args.events)
        this._svgElement.appendChild(elem)
    }
    private addFigure(element: SVGNode, events: EventDefinition[]) {
        const elemHTML = element.toHTML()

        if (
            elemHTML.hasAttribute(SVGAttr.Id) &&
            elemHTML.getAttribute(SVGAttr.Id) !== ''
        )
            elemHTML.setAttribute(SVGAttr.Id, this.getName(elemHTML.id))
        else elemHTML.removeAttribute(SVGAttr.Id)

        this._svgElement.appendChild(this.addEventsToElem(elemHTML, events))
    }

    /**
     * Constructs a empty SVGManager object
     */
    public constructor() {
        this._managerid = uuidv4()

        this._defintions = []
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
     */
    public renderId(
        elementId: string,
        args?: {
            name?: string
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
        this.addFigure(element, element.getEvents())
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
        const item = document.getElementById(this.getName(name))
        if (item !== null) this._svgElement.removeChild(item)
    }

    /**
     *
     */
    public fetchNamed(name: string): SVGElement | null {
        const item = document.getElementById(this.getName(name))
        if (item === null) return null
        return (item as unknown) as SVGElement
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
    public set(attr: SVGAttr, value: string): SVGManager {
        this._svgElement.setAttribute(attr, value)

        return this
    }

    /**
     * Returns the unique identifier connected to this SVGManager
     */
    get id(): string {
        return this._managerid
    }

    /**
     * Returns the DOM-id of a named item
     * @param name name of named item
     */
    public mentionNamedItem(name: string): string {
        return this.getName(name)
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
