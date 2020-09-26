import { SVGTag } from '../definitions'
import SVGNode, { AttributeValue } from '../SVGNode'

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

class SVGGradient extends SVGNode {
    /**
     * Create a Linear Gradient
     * @param stops Stops of the gradient
     */
    public constructor(tagName: SVGTag, stops: SVGStops) {
        super(tagName)
        stops.forEach((stop) => this.append(stop))
    }

    /**
     * Set the gradientUnits attribute of the Gradient
     * @param value Either 'userSpaceOnUse' or 'objectBoundingBox'
     */
    public gradientUnits(value: 'userSpaceOnUse' | 'objectBoundingBox'): this {
        this.set('gradientUnits', value)
        return this
    }

    /**
     * Set the gradientTransform attribute of the Gradient
     * @param value Transformation
     */
    public gradientTransform(value: AttributeValue): this {
        this.set('gradientTransform', value)
        return this
    }

    /**
     * Set the href attribute of the Gradient
     * @param value Value of href
     */
    public href(value: AttributeValue): this {
        this.set('href', value)
        return this
    }

    /**
     * Set the spreadMethod attribute of the Gradient
     * @param value Either 'pad', 'reflect' or 'repeat'
     */
    public spreadMethod(value: 'pad' | 'reflect' | 'repeat'): this {
        this.set('spreadMethod', value)
        return this
    }
}

export class SVGRadGradient extends SVGGradient {
    /**
     * Create a Radial Gradient with `stops`
     * @param stops Stops of the gradient
     */
    public constructor(stops: SVGStops) {
        super('radialGradient', stops)
    }

    /**
     * Set the fr attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fr(length: AttributeValue): SVGRadGradient {
        this.set('fr', length)
        return this
    }

    /**
     * Set the fx attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fx(length: AttributeValue): SVGRadGradient {
        this.set('fx', length)
        return this
    }

    /**
     * Set the fy attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fy(length: AttributeValue): SVGRadGradient {
        this.set('fy', length)
        return this
    }
}

export class SVGLinGradient extends SVGGradient {
    /**
     * Create a Linear Gradient with `stops`
     * @param stops Stops of the gradient
     */
    public constructor(stops: SVGStops) {
        super('linearGradient', stops)
    }

    /**
     * Set the x1 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public x1(length: AttributeValue): this {
        this.set('x1', length)
        return this
    }

    /**
     * Set the x2 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public x2(length: AttributeValue): this {
        this.set('x2', length)
        return this
    }

    /**
     * Set the y1 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public y1(length: AttributeValue): this {
        this.set('y1', length)
        return this
    }

    /**
     * Set the y2 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public y2(length: AttributeValue): this {
        this.set('y2', length)
        return this
    }
}
