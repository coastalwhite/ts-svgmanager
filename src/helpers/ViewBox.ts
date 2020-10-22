import V2D from './V2D'

/**
 * An Helper class for for the SVG ViewBox
 */
export default class SVGViewBox {
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
    public move(by: V2D): SVGViewBox {
        this._minPosition = this._minPosition.add(by)

        return this
    }

    public resize(by: V2D): SVGViewBox {
        this._dimensions = this._dimensions.add(by)

        return this
    }

    /**
     * Sets the position of the ViewBox
     * @param v New position of the viewbox
     */
    public setPosition(position: V2D): SVGViewBox {
        this._minPosition = position

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
    public setDimensions(dimensions: V2D): SVGViewBox {
        this._dimensions = dimensions

        return this
    }

    /**
     * Fetch the ViewBox Dimension
     */
    public getDimension(): V2D {
        return this._dimensions
    }

    /**
     * Parses a ViewBox from a string
     */
    public static parse(str: string): SVGViewBox {
        const splitted = str.split(' ')

        if (splitted.length !== 4) throw 'ViewBox parsing: Incorrect format'

        return new SVGViewBox(
            parseFloat(splitted[0]),
            parseFloat(splitted[1]),
            parseFloat(splitted[2]),
            parseFloat(splitted[3]),
        )
    }

    /**
     * Turns the ViewBox into a string
     */
    public toString(): string {
        const min = this._minPosition
        const dim = this._dimensions
        return `${min.x} ${min.y} ${dim.x} ${dim.y}`
    }
}
