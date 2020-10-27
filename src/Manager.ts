import { nanoid } from 'nanoid'
import { SVGGroup } from './nodes/Group'
import { Component } from './components/Component'
import { ComponentInstance } from './components/Instance'
import { V2D } from './helpers/V2D'
import { SVGViewBox } from './helpers/ViewBox'
import { SVGLinkedNode, SVGNode } from './nodes/Node'
import { AttributeValue } from './nodes/types'
import { Id } from './util/Id'
import { ManagerUtil } from './Utility'
import {
    DEFAULT_ZINDEX,
    DEFINITION_PREFIX,
    ZINDICES_CONTAINER_TAG,
    ZINDICES_PREFIX,
} from './constants'
import { toTagClass } from './util/tags'
import { svgGroup } from './shapes/Group'

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
export class SVGManager extends SVGLinkedNode {
    /** @hidden Manager identifier */
    private _managerid: string

    /** @hidden Saved definitions */
    private _definitions: Id<SVGNode>[]
    private _utils: ManagerUtil[]

    /** @hidden Should be sorted */
    private _zIndices: number[]

    private _components: {
        component: Component
        instances: ComponentInstance[]
    }[]

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
    private toDefId(hash: string): Id<SVGNode> {
        // Prefix the managerId and the Std Def Prefix
        return new Id(`${this._managerid}-${DEFINITION_PREFIX}${hash}`)
    }

    private isValidZIndex(zIndex: number): boolean {
        return zIndex >= 0 && zIndex <= 999
    }

    private addZIndexContainer(zIndex: number): SVGLinkedNode {
        if (!this.isValidZIndex(zIndex))
            throw 'SVGManager: Invalid ZIndex given as ' + zIndex

        if (this._zIndices.includes(zIndex))
            throw 'Trying to add a container which already exists'

        const zIndicesContainer = this.element.getElementsByClassName(
            toTagClass(ZINDICES_CONTAINER_TAG),
        )[0]
        if (zIndicesContainer === undefined)
            throw 'SVGManager: ZIndices container is undefined'

        const zIndexContainer = svgGroup()
            .tag(ZINDICES_PREFIX + zIndex.toString())
            .toHTML()
        const biggerIndices = this._zIndices.filter((index) => zIndex < index)

        if (this._zIndices.length === 0 || biggerIndices.length === 0) {
            this._zIndices.push(zIndex)

            return new SVGLinkedNode(
                zIndicesContainer.appendChild(zIndexContainer),
            )
        }

        this._zIndices = [
            ...this._zIndices.slice(
                0,
                this._zIndices.length - biggerIndices.length,
            ),
            zIndex,
            ...biggerIndices,
        ]

        const nextZIndexContainer = zIndicesContainer.getElementsByClassName(
            toTagClass(ZINDICES_PREFIX + biggerIndices[0].toString()),
        )[0] as SVGElement

        if (nextZIndexContainer === undefined)
            throw 'Mismatch of internal zIndices and DOM zIndices'

        return new SVGLinkedNode(
            zIndicesContainer.insertBefore(
                zIndexContainer,
                nextZIndexContainer,
            ),
        )
    }

    private fetchZIndexContainer(zIndex: number): SVGLinkedNode {
        const zIndicesContainer = this.element.getElementsByClassName(
            toTagClass(ZINDICES_CONTAINER_TAG),
        )[0]
        if (zIndicesContainer === undefined)
            throw 'SVGManager: ZIndices container is undefined'

        const nextZIndexContainer = zIndicesContainer.getElementsByClassName(
            toTagClass(ZINDICES_PREFIX + zIndex.toString()),
        )[0] as SVGElement

        if (nextZIndexContainer === undefined)
            return this.addZIndexContainer(zIndex)

        return new SVGLinkedNode(nextZIndexContainer)
    }

    /**
     * Constructs a empty SVGManager object
     */
    public constructor() {
        super(new SVGNode('svg').toHTML())
        this._element = null

        this._managerid = nanoid()

        this._definitions = []
        this._utils = []
        this._zIndices = []
        this._components = []
    }

    /**
     * Initialize a SVGManager
     * @param rootId container-id in which to put the SVG
     */
    public init(rootId: string): this {
        const svgElement = new SVGNode('svg')
            .set('id', this._managerid)
            .append(new SVGNode('defs'))
            .append(new SVGGroup().tag(ZINDICES_CONTAINER_TAG))
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
    public define(node: SVGNode): { id: Id<SVGNode>; link: SVGLinkedNode } {
        // Fetch definition string
        const definition = this.toDefId(nanoid())

        // Add definition to saved defs
        this._definitions.push(definition)

        // Append node to defs
        return {
            id: definition,
            link: this.defsElement().returnAppend(
                node.copy().set('id', definition.val),
            ),
        }
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
     * Getter for the SVG viewBox attribute
     */
    public get viewBox(): SVGViewBox | undefined {
        const viewBoxStr = this.get('viewBox')

        if (viewBoxStr === undefined) return undefined

        return SVGViewBox.parse(viewBoxStr.toString())
    }

    /** Setter for the width attribute */
    public width(length: AttributeValue): this {
        this.set('width', length)
        return this
    }

    /** Setter for the height attribute */
    public height(length: AttributeValue): this {
        this.set('height', length)
        return this
    }

    public get utils(): ManagerUtil[] {
        return this._utils
    }

    public utilize(...utils: ManagerUtil[]): this {
        this._utils.push(...utils)
        utils.forEach((util) => {
            util.applyTo(this)
            util.useInit()
        })
        return this
    }

    public utilizes(util: ManagerUtil): boolean {
        return (
            this._utils.find((managerUtil) =>
                managerUtil.id.equals(util.id),
            ) !== undefined
        )
    }

    public updateUtils(): void {
        this.utils.forEach((util) => util.update())
    }

    /**
     * The id connected to this SVGManager,
     * also set as the DOM-id for the SVG element
     */
    public get id(): string {
        return this._managerid
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     */
    public render(node: SVGNode, zIndex?: number): SVGLinkedNode {
        if (zIndex === undefined) zIndex = DEFAULT_ZINDEX

        return this.fetchZIndexContainer(zIndex).returnAppend(node)
    }

    /**
     * The actual SVG element on the DOM
     */
    public get element(): SVGSVGElement {
        const elem = document.getElementById(
            this._managerid,
        ) as SVGElement | null

        if (elem === null)
            throw 'SVGManager: Cannot find SVG element, maybe initialize the SVGManager?'
        return elem as SVGSVGElement
    }

    public declare(...components: Component[]): void {
        this._components.push(
            ...components
                .filter(
                    (component) =>
                        this._components.find(
                            (c) => c.component.name === component.name,
                        ) === undefined,
                )
                .map((component) => ({ component, instances: [] })),
        )

        components.forEach((component) => component.useInit(this))
    }

    public create(
        componentName: string,
        position: V2D,
        points?: V2D[],
        zIndex?: number,
    ): ComponentInstance {
        const ci = this._components.find(
            (c) => c.component.name === componentName,
        )

        if (ci === undefined) throw 'Component does not exists!'

        const instance = new ComponentInstance(
            this,
            ci.component,
            position,
            points,
            zIndex,
        )
        ci.instances.push(instance)

        return instance
    }

    // private findCI(
    //     componentName: string,
    // ): { component: Component; instances: ComponentInstances } | undefined {
    //     return this._componentInstances.find(
    //         (ci) => ci.component.name === componentName,
    //     )
    // }

    // private findInstance(
    //     instanceId: ComponentInstanceId,
    // ): { component: Component; container: SVGLinkedNode } | undefined {
    //     const ci = this._componentInstances.find((ci) =>
    //         Object.keys(ci.instances).includes(instanceId),
    //     )

    //     if (ci === undefined) return undefined

    //     const container = this.tagged(Component.toComponentTag(instanceId))

    //     if (container.length === 0) return undefined

    //     return {
    //         component: ci.component,
    //         container: container[0],
    //     }
    // }

    // public instantiate(componentName: string): ComponentInstanceId {
    //     const ci = this.findCI(componentName)

    //     if (ci === undefined) throw 'Component name is unknown'

    //     const instance = ci.component.instantiate(this)
    //     ci.instances[instance.id] = instance.container

    //     return instance.id
    // }

    // public update(id: ComponentInstanceId): void {
    //     const instance = this.findInstance(id)
    //     if (instance === undefined) throw 'undefined component not found'

    //     instance.component.update(instance.container, this)
    // }

    // public fetch(id: ComponentInstanceId): SVGLinkedNode {
    //     return this.tagged(Component.toComponentTag(id))[0]
    // }

    // public move(id: ComponentInstanceId, to: V2D): void {
    //     const instance = this.findInstance(id)
    //     if (instance === undefined) throw 'sdkjfal'

    //     instance.component.moveTo(instance.container, to)
    // }
}
