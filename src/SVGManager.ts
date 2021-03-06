import SVGNode, { AttributeValue, SVGLinkedNode, SVGUse } from './SVGNode'

import { v4 as uuidv4 } from 'uuid'
import { SVGAttribute } from './definitions'
import { SVGManagerEventDefinition } from './Events'
import { SVGManagerDefinition } from '.'

/** @hidden */
const DEFINITION_PREFIX = 'figure-'

/** @hidden */
const DEFAULT_VIEWBOX = '0 0 100 100'

/**
 * A manager class for interactive SVG's
 *
 * ## Initializing
 * ```html
 * <!-- Rest of DOM... -->
 * <div id="svg-root">
 *      <!-- Here the SVG will be inserted -->
 * </div>
 * <!-- Rest of DOM... -->
 * ```
 *
 * ```ts
 * import { SVGManager } from 'ts-svgmanager'
 *
 * // This will initialize a interactive SVG in the container
 * const manager = new SVGManager().init('svg-root')
 * ```
 *
 * ## Examples
 * ### Example 1 - Rendering a circle
 * ```ts
 * import { SVGManager } from 'ts-svgmanager'
 * import ViewBox from 'ts-svgmanager/helpers/ViewBox'
 * import { circle } from 'ts-svgmanager/Shapes'
 *
 * // Initializing the SVGManager with a viewBox of '-30 -30 60 60'
 * const manager = new SVGManager()
 *     .init('svg-root')
 *     .viewBox(new ViewBox(-30, -30, 60, 60))
 *
 * // Rendering a circle with a radius of 20 at (0,0)
 * manager.render(circle(20))
 * ```
 *
 * ### Example 2 - Rendering a custom cursor
 * ```ts
 * import { SVGManager } from 'ts-svgmanager'
 * import ViewBox from 'ts-svgmanager/helpers/ViewBox'
 * import { circle } from 'ts-svgmanager/Shapes'
 *
 * // Initializing the SVGManager with a viewBox of '-30 -30 60 60'
 * const manager = new SVGManager()
 *     .init('svg-root')
 *     .viewBox(new ViewBox(0, 0, 200, 200))
 *     .width(200)
 *     .height(200)
 *     .set('cursor', 'none') // Remove the normal cursor
 *
 * // Rendering a circle with a radius of 10 at (0,0)
 * manager.render(circle(10).tag('custom-cursor'))
 *
 * // Adding the onmousemove listener
 * manager.on('mousemove', (ev: MouseEvent, svgNode) => {
 *     // Get the position of the SVG element
 *     const svgX = svgNode.element.getBoundingClientRect().x,
 *         svgY = svgNode.element.getBoundingClientRect().y
 *
 *     // Get the x and y of the mouse relative to the SVG
 *     const x = ev.clientX - svgX,
 *         y = ev.clientY - svgY
 *
 *     // Move the cursor to this location
 *     manager.tagged('custom-cursor').forEach((cursor) => cursor.cx(x).cy(y))
 * })
 * ```
 */
export default class SVGManager extends SVGLinkedNode {
    /** @hidden Manager identifier */
    private _managerid: string

    /** @hidden Saved definitions */
    private _definitions: SVGManagerDefinition[]

    /**
     * @hidden
     * Fetches the Defs Element in the SVG
     */
    private defsElement(): SVGLinkedNode {
        // Find the first child with defs as a tagName
        const defs = this.children.find((child) => child.tagName === 'defs')

        // If not found throw an error
        if (defs === undefined) throw 'SVGManager: Definition not found in svg'

        return defs
    }

    /** @hidden Turns a hash into a SVGManagerDefinition */
    private toDefId(hash: string): SVGManagerDefinition {
        // Prefix the managerId and the Std Def Prefix
        return `${this._managerid}-${DEFINITION_PREFIX}${hash}` as SVGManagerDefinition
    }

    /** @hidden Returns whether a definition already exists or not */
    private doesDefExist(definition: SVGManagerDefinition): boolean {
        return this._definitions.includes(definition)
    }

    /** @hidden Adds a definition and returns the SVGManagerDefinition */
    private addDefintion(node: SVGNode): SVGManagerDefinition {
        // Fetch definition string
        const definition = this.toDefId(node.toHash())

        // Add definition to saved defs
        this._definitions.push(definition)

        // Append node to defs
        this.defsElement().append(
            SVGManager.addTagsToNode(node.copy().set('id', definition)),
        )

        return definition
    }

    /** @hidden Add a use of a definition to the SVGManager */
    private addUse(
        definition: SVGManagerDefinition,
        args?: {
            tags?: string[]
            attributes?: { attrName: SVGAttribute; attrValue: AttributeValue }[]
            events?: SVGManagerEventDefinition[]
        },
    ): void {
        // Create use with def id
        const useNode = new SVGUse(definition)

        // If arguments are given
        if (args !== undefined) {
            // If args.tags are given add them them to the useNode
            if (args.tags !== undefined)
                args.tags.forEach((tag) => useNode.tag(tag))

            // If args.attributes are given add them them to the useNode
            if (args.attributes !== undefined)
                args.attributes.forEach((attribute) =>
                    useNode.set(attribute.attrName, attribute.attrValue),
                )

            // If args.events are given add them them to the useNode
            if (args.events !== undefined)
                args.events.forEach((event) =>
                    useNode.on(event.eventName, event.func),
                )
        }

        // Append Use to Manager
        this.append(useNode)
    }

    /**
     * Constructs a empty and uninitialized SVGManager object
     */
    public constructor() {
        super(new SVGNode('svg').toHTML())
        this._element = null

        this._managerid = uuidv4()

        this._definitions = []
    }

    /**
     * Initialize the SVGManager
     * @param rootId container-id in which to put the SVG
     */
    public init(rootId: string): this {
        const svgElement = new SVGNode('svg')
            .set('viewBox', DEFAULT_VIEWBOX)
            .set('id', this._managerid)
            .append(new SVGNode('defs'))
            .toHTML()

        const rootElement = document.getElementById(rootId)

        if (rootElement === null)
            throw 'SVGManager: rootId of "' + rootId + '" not found!'

        rootElement.appendChild(svgElement)

        return this
    }

    /**
     * Adds the definition of element to list of definitions,
     * So that next time, when it is used, the element can rendered using the definition.
     *
     * This will be used in [[renderDef]], [[SVGNode.fillDef]] and [[SVGNode.strokeDef]]
     */
    public define(node: SVGNode): SVGManagerDefinition {
        const definition = this.toDefId(node.toHash())

        if (!this.doesDefExist(definition)) this.addDefintion(node)

        return definition
    }

    /**
     * Renders a figure to the SVG using a definition string.
     *
     * # Note
     * Requires a definition to present for the figure ID
     * otherwise it throws a Error
     *
     * @param definition Definition id string
     * @param args Optional arguments from the rendering, including the tags, attributes and events
     */
    public renderDef(
        definition: SVGManagerDefinition,
        args?: {
            tags?: string[]
            attributes?: { attrName: SVGAttribute; attrValue: AttributeValue }[]
            events?: SVGManagerEventDefinition[]
        },
    ): this {
        if (!this.doesDefExist(definition))
            throw "SVGManager: Tried to render an Id that doesn't exist"

        this.addUse(this.toDefId(definition), args)

        return this
    }

    /**
     * Removes the rendered items, definitions, events and innerText
     */
    public clean(): void {
        this.clearEvents()
        this.removeChildren()
        this.text('')
        this.render(new SVGNode('defs'))
    }

    /**
     * A raw append, only use when you know what is going on
     *
     * **Recommended to use [[render]] instead**
     * */
    public append(child: SVGNode): this {
        this.element.appendChild(child.toHTML())

        return this
    }

    /** Setter for the viewBox attribute */
    public viewBox(vb: AttributeValue): SVGManager {
        this.set('viewBox', vb)
        return this
    }

    /** Setter for the width attribute */
    public width(length: AttributeValue): SVGManager {
        this.set('width', length)
        return this
    }

    /** Setter for the height attribute */
    public height(length: AttributeValue): SVGManager {
        this.set('height', length)
        return this
    }

    /**
     * The id connected to this SVGManager,
     * also set as the DOM-id for the SVG element
     */
    public get id(): string {
        return this._managerid
    }

    /**
     * The actual SVG element on the DOM
     */
    public get element(): SVGElement {
        const elem = document.getElementById(
            this._managerid,
        ) as SVGElement | null

        if (elem === null)
            throw 'SVGManager: Cannot find SVG element, maybe initialize the SVGManager?'
        return elem
    }
}
