/**
 * A JS Class representing the HTML-Path D attribute
 */
export default class PathData {
    private _inner: string

    public constructor() {
        this._inner = ''
    }

    /**
     * Appends a move to a certain point to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public moveTo(x: number, y: number): this {
        this._inner += ` M ${x} ${y}`
        return this
    }

    /**
     * Appends a line to a certain point to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public lineTo(x: number, y: number): this {
        this._inner += ` L ${x} ${y}`
        return this
    }

    /**
     * Appends a horizontal line to a certain x-value to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public horizontalLineTo(x: number): this {
        this._inner += ` H ${x}`
        return this
    }

    /**
     * Appends a vertical line to a certain y-value to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public verticalLineTo(y: number): this {
        this._inner += ` V ${y}`
        return this
    }

    /**
     * Appends a line to a certain point relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public lineRelativeTo(x: number, y: number): this {
        this._inner += ` l ${x} ${y}`
        return this
    }

    /**
     * Appends a horizontal line to a certain x-value relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public horizontalLineRelativeTo(x: number): this {
        this._inner += ` h ${x}`
        return this
    }

    /**
     * Appends a vertical line to a certain y-value relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public verticalLineRelativeTo(y: number): this {
        this._inner += ` v ${y}`
        return this
    }

    /**
     * Appends a curve to a certain point to the PathData, using control point 1 & 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public curveTo(
        endX: number,
        endY: number,
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
    ): this {
        this._inner += ` C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`
        return this
    }

    /**
     * Appends a curve to a certain point relative to where the last action ended to the PathData, using control point 1 & 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public curveRelativeTo(
        endX: number,
        endY: number,
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
    ): this {
        this._inner += ` c ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`
        return this
    }

    /**
     * Appends a smooth curve (following a normal curve) to a certain point to the PathData, using control point 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public smoothCurveTo(
        endX: number,
        endY: number,
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
    ): this {
        this._inner += ` S ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`
        return this
    }

    /**
     * Appends a smooth curve (following a normal curve) to a certain point
     * relative to where the last action ended to the PathData, using control point 2
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public smoothCurveRelativeTo(
        endX: number,
        endY: number,
        controlX: number,
        controlY: number,
    ): this {
        this._inner += ` s ${controlX} ${controlY}, ${endX} ${endY}`
        return this
    }

    /**
     * Appends a quadratic curve to a certain point
     * to the PathData, using control point 1
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public quadraticCurveTo(
        endX: number,
        endY: number,
        controlX: number,
        controlY: number,
    ): this {
        this._inner += ` Q ${controlX} ${controlY}, ${endX} ${endY}`
        return this
    }

    /**
     * Appends a quadratic curve to a certain point
     * relative to where the last action ended to the PathData, using control point 1
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public quadraticCurveRelativeTo(
        endX: number,
        endY: number,
        controlX: number,
        controlY: number,
    ): this {
        this._inner += ` q ${controlX} ${controlY}, ${endX} ${endY}`
        return this
    }

    /**
     * Appends a quadratic curve (following a quadratic curve) to a certain point
     * to the PathData,
     * smoothing out the curve using the previous quadratic curve
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public quadraticStringTo(x: number, y: number): this {
        this._inner += ` T ${x} ${y}`
        return this
    }

    /**
     * Appends a quadratic curve (following a quadratic curve) to a certain point
     * relative to where the last action ended to the PathData,
     * smoothing out the curve using the previous quadratic curve
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Bezier_Curves)
     */
    public quadraticStringRelativeTo(x: number, y: number): this {
        this._inner += ` t ${x} ${y}`
        return this
    }

    /**
     * Appends an arc to a certain point to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs)
     */
    public arcTo(
        x: number,
        y: number,
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: boolean,
        sweepFlag: boolean,
    ): this {
        this._inner += ` A ${rx} ${ry} ${xAxisRotation} ${
            largeArcFlag ? '1' : '0'
        } ${sweepFlag ? '1' : '0'} ${x} ${y}`
        return this
    }

    /**
     * Appends an arc to a certain point relative to where the last action ended to the PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Arcs)
     */
    public arcRelativeTo(
        x: number,
        y: number,
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: boolean,
        sweepFlag: boolean,
    ): this {
        this._inner += ` a ${rx} ${ry} ${xAxisRotation} ${
            largeArcFlag ? '1' : '0'
        } ${sweepFlag ? '1' : '0'} ${x} ${y}`
        return this
    }

    /**
     * Closes a PathData
     *
     * # Note / Arguments
     * For further information: [Look here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands)
     */
    public closePath(): this {
        this._inner += ` Z`
        return this
    }

    public toString(): string {
        return this._inner.trim()
    }
}
