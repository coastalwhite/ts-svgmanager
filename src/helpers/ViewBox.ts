import { V2D } from '..'

/**
 * An Helper class for for the SVG ViewBox
 */
class ViewBox {
    private _minPosition: V2D
    private _dimensions: V2D

    public constructor(
        minX: number,
        minY: number,
        width: number,
        height: number,
    ) {
        this._minPosition = new V2D(minX, minY)
        this._dimensions = new V2D(width, height)
    }

    /**
     * Move the position of the ViewBox
     * @param by Vector to move the position of the viewbox with
     */
    public move(by: V2D): ViewBox {
        this._minPosition = this._minPosition.add(by)

        return this
    }

    /**
     * Sets the position of the ViewBox
     * @param v New position of the viewbox
     */
    public setPosition(v: V2D): ViewBox {
        this._minPosition = v

        return this
    }

    /**
     * Fetch the ViewBox Position
     */
    public getPosition(): V2D {
        return this._minPosition
    }

    /**
     * Sets the dimensions of the ViewBox
     * @param v New dimensions of the ViewBox as V2D(Width, Height)
     */
    public setDimensions(v: V2D): ViewBox {
        this._dimensions = v

        return this
    }

    /**
     * Turns the ViewBox into a string
     */
    public toString(): string {
        const min = this._minPosition
        const dim = this._dimensions
        return `${min.x()} ${min.y()} ${dim.x()} ${dim.y()}`
    }
}

export default ViewBox
