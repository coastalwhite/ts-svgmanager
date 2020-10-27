import { SVGTagName } from '../declarations/TagNames'
import { SVGNode } from '../nodes/Node'
import { AttributeValue } from '../nodes/types'
import { SVGStops } from './Stops'

class SVGGradient extends SVGNode {
    /**
     * Create a Linear Gradient
     * @param stops Stops of the gradient
     */
    public constructor(tagName: SVGTagName, stops: SVGStops) {
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
