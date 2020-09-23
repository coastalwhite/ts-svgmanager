import SVGNode from '../SVGNode'

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
        super('stop')

        this.set('offset', offset)
        if (stopColor !== undefined) this.set('stop-color', stopColor)
        if (stopOpacity !== undefined) this.set('stop-opacity', stopOpacity)
    }
}

export class SVGRadGradient extends SVGNode {
    /**
     * Create a Radial Gradient with `stops`
     * @param stops Stops of the gradient
     */
    public constructor(stops: GradientStop[]) {
        super('radialGradient')
        stops.forEach((stop) => this.append(stop))
    }

    /**
     * Set the gradientUnits attribute of the Gradient
     * @param value Either 'userSpaceOnUse' or 'objectBoundingBox'
     */
    public gradientUnits(
        value: 'userSpaceOnUse' | 'objectBoundingBox',
    ): SVGRadGradient {
        this.set('gradientUnits', value)
        return this
    }

    /**
     * Set the gradientTransform attribute of the Gradient
     * @param value Transformation
     */
    public gradientTransform(value: string): SVGRadGradient {
        this.set('gradientTransform', value)
        return this
    }

    /**
     * Set the href attribute of the Gradient
     * @param value Value of href
     */
    public href(value: string): SVGRadGradient {
        this.set('href', value)
        return this
    }

    /**
     * Set the spreadMethod attribute of the Gradient
     * @param value Either 'pad', 'reflect' or 'repeat'
     */
    public spreadMethod(value: 'pad' | 'reflect' | 'repeat'): SVGRadGradient {
        this.set('spreadMethod', value)
        return this
    }

    /**
     * Set the fr attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fr(length: number): SVGRadGradient {
        this.set('fr', length)
        return this
    }

    /**
     * Set the fx attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fx(length: number): SVGRadGradient {
        this.set('fx', length)
        return this
    }

    /**
     * Set the fy attribute of the Radial Gradient
     * @param length Length from 0-1
     */
    public fy(length: number): SVGRadGradient {
        this.set('fy', length)
        return this
    }

    /**
     * Set the radius attribute of the Radial Gradient
     * @param radius Radius from 0-1
     */
    public r(radius: number): SVGRadGradient {
        this.set('r', radius)
        return this
    }
}

export class SVGLinGradient extends SVGNode {
    /**
     * Create a Linear Gradient
     * @param stops Stops of the gradient
     */
    public constructor(stops: GradientStop[]) {
        super('linearGradient')
        stops.forEach((stop) => this.append(stop))
    }

    /**
     * Set the gradientUnits attribute of the Gradient
     * @param value Either 'userSpaceOnUse' or 'objectBoundingBox'
     */
    public gradientUnits(
        value: 'userSpaceOnUse' | 'objectBoundingBox',
    ): SVGLinGradient {
        this.set('gradientUnits', value)
        return this
    }

    /**
     * Set the gradientTransform attribute of the Gradient
     * @param value Transformation
     */
    public gradientTransform(value: string): SVGLinGradient {
        this.set('gradientTransform', value)
        return this
    }

    /**
     * Set the href attribute of the Gradient
     * @param value Value of href
     */
    public href(value: string): SVGLinGradient {
        this.set('href', value)
        return this
    }

    /**
     * Set the spreadMethod attribute of the Gradient
     * @param value Either 'pad', 'reflect' or 'repeat'
     */
    public spreadMethod(value: 'pad' | 'reflect' | 'repeat'): SVGLinGradient {
        this.set('spreadMethod', value)
        return this
    }

    /**
     * Set the x1 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public x1(length: number): SVGLinGradient {
        this.set('x1', length)
        return this
    }

    /**
     * Set the x2 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public x2(length: number): SVGLinGradient {
        this.set('x2', length)
        return this
    }

    /**
     * Set the y1 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public y1(length: number): SVGLinGradient {
        this.set('y1', length)
        return this
    }

    /**
     * Set the y2 attribute of the Linear Gradient
     * @param length Length from 0-1
     */
    public y2(length: number): SVGLinGradient {
        this.set('y2', length)
        return this
    }
}
