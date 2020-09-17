import V2D from './V2D'
import SVGNode from './SVGNode'

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

    private doesDefExist(elementId: string): boolean {
        return this._defintions.includes(elementId)
    }

    private doesNameExist(name: string): boolean {
        return this._names.includes(name)
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

    private addFigure(
        elementId: string,
        position: V2D,
        events: EventDefinition[],
    ) {
        const elem = this.addEventsToElem(
            new SVGNode(SVGTag.Use)
                .set(SVGAttr.Href, '#' + elementId)
                .set(SVGAttr.X, position.x().toString())
                .set(SVGAttr.Y, position.y().toString())
                .toHTML(),
            events,
        )

        this._svgElement.appendChild(elem)
    }

    private addNamedFigure(
        name: string,
        elementId: string,
        position: V2D,
        events: EventDefinition[],
    ) {
        if (this.doesNameExist(name)) throw new Error('Name already exists!')

        const elem = this.addEventsToElem(
            new SVGNode(SVGTag.Use)
                .set(SVGAttr.Href, '#' + elementId)
                .set(SVGAttr.X, position.x().toString())
                .set(SVGAttr.Y, position.y().toString())
                .set(SVGAttr.Id, this.getName(name))
                .toHTML(),
            events,
        )

        this._svgElement.appendChild(elem)

        this._names.push(name)
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
     */
    public renderId(elementId: string, position: V2D) {
        if (!this.doesDefExist(elementId))
            throw new Error("Tried to render an Id that doesn't exist")

        this.addFigure(this.toDefId(elementId), position, [])
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    public render(element: SVGNode, position: V2D): string {
        const elementId = element.toHash()

        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element)
        }

        this.addFigure(this.toDefId(elementId), position, element.getEvents())

        return elementId
    }

    /**
     * Renders a figure to the SVG using a SVGNode with a callback name.\
     * If this name already exists, it will not do anything and output this to the debug console.
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    public renderNamed(name: string, element: SVGNode, position: V2D) {
        if (this.doesNameExist(name)) {
            console.debug(
                'SVG Manager: Tried to reuse name for named figure, stop execution. (renderNamed)',
            )
            return
        }

        const elementId = element.toHash()
        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element)
        }

        this.addNamedFigure(
            name,
            this.toDefId(elementId),
            position,
            element.getEvents(),
        )
    }

    /**
     * Renders a figure to the SVG using a figure ID/Hash with a callback name.\
     * If this name already exists, it will not do anything and output this to the debug console.
     *
     * # Note
     * Requires a definition to present for the figure ID
     * otherwise it throws a Error
     */
    public renderNamedId(name: string, elementId: string, position: V2D) {
        if (this.doesNameExist(name)) {
            console.debug(
                'SVG Manager: Tried to reuse name for named figure, stop execution. (renderNamedId)',
            )
            return
        }

        if (!this.doesDefExist(elementId))
            throw new Error("Tried to render an Id that doesn't exist")

        this.addNamedFigure(name, this.toDefId(elementId), position, [])
    }

    /**
     * Moves a named figure to *v*\
     * If named item does not exist, it will not do anything.
     */
    public moveNamed(name: string, v: V2D) {
        const elem = document.getElementById(this.getName(name))

        if (elem === null) return

        if (elem.tagName === 'g') {
            elem.setAttribute('transform', `translate(${v.x()}, ${v.y()})`)
        } else {
            elem.setAttribute('x', `${v.x()}`)
            elem.setAttribute('y', `${v.y()}`)
        }
    }

    /**
     * Fetches location of a named figure\
     * If named item does not exist, it will throw a error.
     */
    public fetchNamedLocation(name: string): V2D {
        const elem = document.getElementById(this.getName(name))

        if (elem === null) throw new Error('Named item does not exist')

        if (elem.tagName === 'g') {
            const transform_value = elem.getAttribute('transform')
            const t_translate_value = transform_value.substr(
                'translate('.length,
            )
            const translate_values = t_translate_value
                .substr(0, t_translate_value.length - 1)
                .split(', ')

            return new V2D(
                parseInt(translate_values[0]),
                parseInt(translate_values[1]),
            )
        } else {
            return new V2D(
                parseInt(elem.getAttribute('x')),
                parseInt(elem.getAttribute('y')),
            )
        }
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
        this._names = this._names.filter((x) => x !== name)
    }

    /**
     * Removes a named figure from the DOM, if it exists\
     * Then will render *element* in its place.
     */
    public rerenderNamed(name: string, element: SVGNode, position: V2D) {
        this.removeNamed(name)
        this.renderNamed(name, element, position)
    }

    /**
     * Renders a SVGNode *element* to the DOM without definition.
     */
    public seperateRenderNamed(name: string, element: SVGNode, position: V2D) {
        this._svgElement.appendChild(
            element
                .set(SVGAttr.Id, this.getName(name))
                .set(SVGAttr.X, position.x().toString())
                .set(SVGAttr.Y, position.y().toString())
                .toHTML(),
        )
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
     * Adjusts an attribute of a named item
     * @param name Name of named item
     * @param attr Attribute to adjust
     * @param value Value to adjust to
     */
    public adjustNamedAttr(
        name: string,
        attr: SVGAttr,
        value: string,
    ): SVGManager {
        const namedItem = document.getElementById(this.getName(name))
        if (namedItem === null) return
        const defId = namedItem.getAttribute('href').substr(1)
        const elem = document.getElementById(defId)
        if (elem === null) return
        const defNode = htmlParseSVGNode(elem)
        const newDefId = this.ensureDefinition(defNode.set(attr, value))
        namedItem.setAttribute(SVGAttr.Href, '#' + this.toDefId(newDefId))
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
