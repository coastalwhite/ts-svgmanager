import { SVGNode } from '../nodes/Node'
import { AttributeValue } from '../nodes/types'

/**
 * An easy way to create multiple `stop` elements
 *
 * Basically an stack with the `stop` method to add a new `stop`
 */
export class SVGStops {
    private _stops: SVGNode[]

    /** Creates an empty stack */
    public constructor() {
        this._stops = []
    }

    /**
     * Create a gradient stop
     * @param offset offset from 0-1 of the stop
     * @param stopColor Optional color of the stop (default is black)
     * @param stopOpacity Optional opacity from 0-1 of the stop (default is 1)
     */
    public stop(
        offset: AttributeValue,
        stopColor?: AttributeValue,
        stopOpacity?: AttributeValue,
    ): this {
        const node = new SVGNode('stop')

        node.set('offset', offset)
        if (stopColor !== undefined) node.set('stop-color', stopColor)
        if (stopOpacity !== undefined) node.set('stop-opacity', stopOpacity)

        this._stops.push(node)

        return this
    }

    /**
     * Returns head
     */
    public mapHead(f: (node: SVGNode) => void): this {
        f(this.head)

        return this
    }

    /**
     * Turns the head to the stack
     */
    public get head(): SVGNode {
        if (this._stops.length === 0)
            throw 'SVGStops: stack is empty, no head exists'

        return this._stops[this._stops.length - 1]
    }

    /**
     * Pops head element of stack
     */
    public pop(): this {
        this._stops.pop()
        return this
    }

    /**
     * Execute f for every element in stack
     */
    public forEach(
        f: (node: SVGNode, index: number, array: SVGNode[]) => void,
    ): void {
        this._stops.forEach(f)
    }

    public map(
        f: (node: SVGNode, index: number, array: SVGNode[]) => SVGNode,
    ): this {
        this._stops = this._stops.map(f)

        return this
    }

    public push(item: SVGNode): void {
        this._stops.push(item)
    }

    public every(
        f: (node: SVGNode, index: number, array: SVGNode[]) => boolean,
    ): boolean {
        return this._stops.every(f)
    }

    public some(
        f: (node: SVGNode, index: number, array: SVGNode[]) => boolean,
    ): boolean {
        return this._stops.some(f)
    }

    public copy(): SVGStops {
        const svgStops = new SVGStops()

        this._stops
            .map((node) => node.copy())
            .forEach((node) => svgStops.push(node))

        return svgStops
    }
}
