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
    public move(byX: number, byY: number): SVGViewBox {
        this._minPosition = this._minPosition.add(new V2D(byX, byY))

        return this
    }

    /**
     * Sets the position of the ViewBox
     * @param v New position of the viewbox
     */
    public setPosition(x: number, y: number): SVGViewBox {
        this._minPosition = new V2D(x, y)

        return this
    }

    /**
     * Fetch the ViewBox Position
     */
    public getPosition(): { x: number; y: number } {
        return { x: this._minPosition.x, y: this._minPosition.y }
    }

    /**
     * Sets the dimensions of the ViewBox
     * @param v New dimensions of the ViewBox as V2D(Width, Height)
     */
    public setDimensions(width: number, height: number): SVGViewBox {
        this._dimensions = new V2D(width, height)

        return this
    }

    /**
     * Fetch the ViewBox Dimension
     */
    public getDimension(): { x: number; y: number } {
        return { x: this._dimensions.x, y: this._dimensions.y }
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
