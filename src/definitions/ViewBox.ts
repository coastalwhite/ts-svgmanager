import { V2D } from '..'

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

    public move(by: V2D): ViewBox {
        this._minPosition = this._minPosition.add(by)

        return this
    }

    public setPosition(v: V2D): ViewBox {
        this._minPosition = v

        return this
    }

    public getPosition(): V2D {
        return this._minPosition
    }

    public setDimensions(v: V2D): ViewBox {
        this._dimensions = v

        return this
    }

    public toString(): string {
        const min = this._minPosition
        const dim = this._dimensions
        return `${min.x()} ${min.y()} ${dim.x()} ${dim.y()}`
    }
}
