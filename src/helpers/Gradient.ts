import { SVGAttr, SVGTag } from '../definitions'
import SVGNode, { AttributeValue } from '../SVGNode'

export class GradientStop extends SVGNode {
    /**
     * Create a gradient stop
     * @param offset offset from 0-1 of the stop
     * @param stopColor Optional color of the stop (default is black)
     * @param stopOpacity Optional opacity from 0-1 of the stop (default is 1)
     */
    public constructor(
        offset: number,
        stopColor?: string,
        stopOpacity?: number,
    ) {
        super(SVGTag.Stop)

        this.set(SVGAttr.Offset, offset)
        if (stopColor !== undefined) this.set(SVGAttr.StopColor, stopColor)
        if (stopOpacity !== undefined)
            this.set(SVGAttr.StopOpacity, stopOpacity)
    }
}

abstract class SVGGradient {
    protected _stops: GradientStop[]
    protected _attributes: Map<SVGAttr, AttributeValue>

    public constructor(stops: GradientStop[]) {
        this._stops = stops
    }

    /**
     * Set the gradientUnits attribute of the Gradient
     * @param value Either 'userSpaceOnUse' or 'objectBoundingBox'
     */
    public gradientUnits(
        value: 'userSpaceOnUse' | 'objectBoundingBox',
    ): SVGGradient {
        this._attributes.set(SVGAttr.GradientUnits, value)
        return this
    }

    /**
     * Set the gradientTransform attribute of the Gradient
     * @param value Transformation
     */
    public gradientTransform(value: string): SVGGradient {
        this._attributes.set(SVGAttr.GradientTransform, value)
        return this
    }

    /**
     * Set the href attribute of the Gradient
     * @param value Value of href
     */
    public href(value: string): SVGGradient {
        this._attributes.set(SVGAttr.Href, value)
        return this
    }

    /**
     * Set the spreadMethod attribute of the Gradient
     * @param value Either 'pad', 'reflect' or 'repeat'
     */
    public spreadMethod(value: 'pad' | 'reflect' | 'repeat'): SVGGradient {
        this._attributes.set(SVGAttr.SpreadMethod, value)
        return this
    }

    /**
     * Set an attribute of the gradient node to a value
     * @param attr Attribute to set
     * @param value Value to set to
     */
    public set(attr: SVGAttr, value: AttributeValue): SVGGradient {
        this._attributes.set(attr, value)
        return this
    }

    /**
     * Turn Gradient into SVGNode
     */
    public abstract toNode(): SVGNode
}

export class SVGRadGradient extends SVGGradient {
    /**
     * Create a Radial Gradient with `stops`
     * @param stops Stops of the gradient
     */
    public constructor(stops: GradientStop[]) {
        super(stops)
    }

    /**
     * Set the circle center x attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public cx(length: number): SVGRadGradient {
        this._attributes.set(SVGAttr.Cx, length)
        return this
    }

    /**
     * Set the circle center y attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public cy(length: number): SVGRadGradient {
        this._attributes.set(SVGAttr.Cy, length)
        return this
    }

    /**
     * Set the fr attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fr(length: number): SVGRadGradient {
        this._attributes.set(SVGAttr.Fr, length)
        return this
    }

    /**
     * Set the fx attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fx(length: number): SVGRadGradient {
        this._attributes.set(SVGAttr.Fx, length)
        return this
    }

    /**
     * Set the fy attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fy(length: number): SVGRadGradient {
        this._attributes.set(SVGAttr.Fy, length)
        return this
    }

    /**
     * Set the radius attribute of the Radial Gradient
     * @param radius Radius from 0-1
     */
    public r(radius: number): SVGRadGradient {
        this._attributes.set(SVGAttr.R, radius)
        return this
    }

    /**
     * Turn Radial Gradient into SVGNode
     */
    public toNode(): SVGNode {
        const gradient = new SVGNode(SVGTag.RadialGradient)

        this._stops.forEach((stop) => gradient.append(stop))
        this._attributes.forEach((value, attr) => gradient.set(attr, value))

        return gradient
    }
}

export class SVGLinGradient extends SVGGradient {
    /**
     * Create a Linear Gradient
     * @param stops Stops of the gradient
     */
    public constructor(stops: GradientStop[]) {
        super(stops)
    }

    /**
     * Set the x1 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public x1(length: number): SVGLinGradient {
        this._attributes.set(SVGAttr.X1, length)
        return this
    }

    /**
     * Set the x2 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public x2(length: number): SVGLinGradient {
        this._attributes.set(SVGAttr.X2, length)
        return this
    }

    /**
     * Set the y1 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public y1(length: number): SVGLinGradient {
        this._attributes.set(SVGAttr.Y1, length)
        return this
    }

    /**
     * Set the y2 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public y2(length: number): SVGLinGradient {
        this._attributes.set(SVGAttr.Y2, length)
        return this
    }

    /**
     * Turn Linear Gradient into SVGNode
     */
    public toNode(): SVGNode {
        const gradient = new SVGNode(SVGTag.RadialGradient)

        this._stops.forEach((stop) => gradient.append(stop))
        this._attributes.forEach((value, attr) => gradient.set(attr, value))

        return gradient
    }
}
