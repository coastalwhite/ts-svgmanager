export default class PathData {
    private _inner: string

    public constructor() {
        this._inner = ''
    }

    public moveTo(x: number, y: number): PathData {
        this._inner += ` M ${x} ${y}`
        return this
    }

    public lineTo(x: number, y: number): PathData {
        this._inner += ` L ${x} ${y}`
        return this
    }

    public horizontalLineTo(x: number): PathData {
        this._inner += ` H ${x}`
        return this
    }

    public verticalLineTo(y: number): PathData {
        this._inner += ` V ${y}`
        return this
    }

    public lineRelativeTo(x: number, y: number): PathData {
        this._inner += ` l ${x} ${y}`
        return this
    }

    public horizontalLineRelativeTo(x: number): PathData {
        this._inner += ` h ${x}`
        return this
    }

    public verticalLineRelativeTo(y: number): PathData {
        this._inner += ` v ${y}`
        return this
    }

    public curveTo(
        endX: number,
        endY: number,
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
    ): PathData {
        this._inner += ` C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`
        return this
    }

    public curveRelativeTo(
        endX: number,
        endY: number,
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
    ): PathData {
        this._inner += ` c ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`
        return this
    }

    public smoothCurveTo(
        endX: number,
        endY: number,
        control1X: number,
        control1Y: number,
        control2X: number,
        control2Y: number,
    ): PathData {
        this._inner += ` S ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`
        return this
    }

    public smoothCurveRelativeTo(
        endX: number,
        endY: number,
        controlX: number,
        controlY: number,
    ): PathData {
        this._inner += ` s ${controlX} ${controlY}, ${endX} ${endY}`
        return this
    }

    public quadraticCurveTo(
        endX: number,
        endY: number,
        controlX: number,
        controlY: number,
    ): PathData {
        this._inner += ` Q ${controlX} ${controlY}, ${endX} ${endY}`
        return this
    }

    public quadraticCurveRelativeTo(
        endX: number,
        endY: number,
        controlX: number,
        controlY: number,
    ): PathData {
        this._inner += ` q ${controlX} ${controlY}, ${endX} ${endY}`
        return this
    }

    public quadraticStringTo(x: number, y: number): PathData {
        this._inner += ` T ${x} ${y}`
        return this
    }

    public quadraticStringRelativeTo(x: number, y: number): PathData {
        this._inner += ` t ${x} ${y}`
        return this
    }

    public arcTo(
        x: number,
        y: number,
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: boolean,
        sweepFlag: boolean,
    ): PathData {
        this._inner += ` A ${rx} ${ry} ${xAxisRotation} ${
            largeArcFlag ? '1' : '0'
        } ${sweepFlag ? '1' : '0'} ${x} ${y}`
        return this
    }

    public arcRelativeTo(
        x: number,
        y: number,
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: boolean,
        sweepFlag: boolean,
    ): PathData {
        this._inner += ` a ${rx} ${ry} ${xAxisRotation} ${
            largeArcFlag ? '1' : '0'
        } ${sweepFlag ? '1' : '0'} ${x} ${y}`
        return this
    }

    public closePath(): PathData {
        this._inner += ` Z`
        return this
    }

    public toString(): string {
        return this._inner.trim()
    }
}
