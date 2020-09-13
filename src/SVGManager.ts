import V2D from './V2D'
import SVGNode from './SVGNode'

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
    private _rootElement: HTMLElement
    private _svgElement: SVGElement
    private _defintions: string[]
    private _names: string[]
    //private _viewBox: ViewBox;

    private defsElement(): SVGDefsElement {
        let defs = this._svgElement.getElementsByTagName('defs')
        return defs[0]
    }

    private toDefId(elementId: string): string {
        return DEFINITION_PREFIX + elementId
    }

    private getName(name: string): string {
        return NAME_PREFIX + name
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
            element.set('id', this.toDefId(elementId)).toHTML(),
        )

        return elementId
    }

    private addFigure(elementId: string, position: V2D) {
        this._svgElement.appendChild(
            new SVGNode('use')
                .set('href', '#' + elementId)
                .set('x', position.x().toString())
                .set('y', position.y().toString())
                .toHTML(),
        )
    }

    private addNamedFigure(name: string, elementId: string, position: V2D) {
        if (this.doesNameExist(name)) throw new Error('Name already exists!')

        this._svgElement.appendChild(
            new SVGNode('use')
                .set('href', '#' + elementId)
                .set('x', position.x().toString())
                .set('y', position.y().toString())
                .set('id', this.getName(name))
                .toHTML(),
        )

        this._names.push(name)
    }

    /**
     * Constructs a empty SVGManager object within the container with id *rootId*
     * @param rootId The parent id
     */
    public constructor(rootId: string) {
        let rootElement = document.getElementById(rootId)

        this._rootElement = rootElement
        this._defintions = []
        this._names = []
    }

    /**
     * Initializes the SVGManager to DOM
     *
     * # Note
     * This svg has some default styling:
     * - viewBox of '0 0 100 100'
     * - width of 500px
     * - height of 500px
     */
    public init() {
        this._defintions = []
        this._names = []

        const svgElement = new SVGNode('svg')
            .set('viewBox', DEFAULT_VIEWBOX)
            .set('width', DEFAULT_SVG_WIDTH)
            .set('height', DEFAULT_SVG_HEIGHT)
            .append(new SVGNode('defs'))
            .toHTML()

        this._svgElement = this._rootElement.appendChild(svgElement)
    }

    /**
     * Adds vector to the position of minimum of the viewBox
     * @param v vector to be added
     */
    public moveViewBox(v: V2D) {
        const viewBox = this.get('viewBox').split(' ')

        const minX = parseInt(viewBox[0]) + v.x()
        const minY = parseInt(viewBox[1]) + v.y()
        const width = parseInt(viewBox[2])
        const height = parseInt(viewBox[3])

        this.set('viewBox', `${minX} ${minY} ${width} ${height}`)
    }

    /**
     * Sets the width of the SVG root
     * @param width new width
     */
    public setWidth(width: number) {
        this.set('width', width + 'px')
    }

    /**
     * Sets the height of the SVG root
     * @param height new height
     */
    public setHeight(height: number) {
        this.set('height', height + 'px')
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

        this.addFigure(this.toDefId(elementId), position)
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

        this.addFigure(this.toDefId(elementId), position)

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

        this.addNamedFigure(name, this.toDefId(elementId), position)
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

        this.addNamedFigure(name, this.toDefId(elementId), position)
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
                .set('id', this.getName(name))
                .set('x', position.x().toString())
                .set('y', position.y().toString())
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
        this._svgElement.innerHTML = ''
        this._defintions = []
        this._names = []
        this._svgElement.appendChild(new SVGNode('defs').toHTML())
    }

    /**
     * Fetch an attribute value from root SVG element
     * @param attr Attribute name
     */
    public get(attr: string): string {
        return this._svgElement.getAttribute(attr) || ''
    }

    /**
     * Set/change an attribute value from root SVG element
     * @param attr Attribute name
     * @param value Set value
     */
    public set(attr: string, value: string): SVGManager {
        this._svgElement.setAttribute(attr, value)

        return this
    }
}
