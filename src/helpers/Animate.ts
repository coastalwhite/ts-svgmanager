import { PathData, SVGNode } from '..'
import { SVGAttr, SVGTag } from '../definitions'
import { AttributeValue } from '../SVGNode'

export default class SVGAnimate {
    private _attr?: SVGAttr
    private _values: AttributeValue[]
    protected _duration: number
    protected _attributes: Map<SVGAttr, AttributeValue>

    /**
     * Create an animation
     * @param attr Attribute to be animated
     * @param values The key values
     * @param duration Duration of the total animation in milliseconds
     */
    public constructor(
        duration: number,
        attr?: SVGAttr,
        values?: AttributeValue[],
    ) {
        this._attr = attr
        this._values = values || []
        this._duration = duration

        this._attributes = new Map()
    }

    public repeatIndefinitely(): SVGAnimate {
        this._attributes.set(SVGAttr.RepeatCount, 'indefinite')
        this._attributes.set(SVGAttr.RepeatDur, 'indefinite')

        return this
    }

    public repeatTimes(times: number): SVGAnimate {
        this._attributes.set(SVGAttr.RepeatCount, times)

        return this
    }

    public repeatDuration(duration: number): SVGAnimate {
        this._attributes.set(SVGAttr.RepeatDur, `${duration}ms`)

        return this
    }

    public beginAfter(after: number): SVGAnimate {
        this._attributes.set(SVGAttr.Begin, `${after}ms`)

        return this
    }

    public beginAt(at: number[]): SVGAnimate {
        this._attributes.set(
            SVGAttr.Begin,
            at.map((time) => `${time}ms`).join(';'),
        )

        return this
    }

    public endAfter(after: number): SVGAnimate {
        this._attributes.set(SVGAttr.End, `${after}ms`)

        return this
    }

    public endAt(at: number[]): SVGAnimate {
        this._attributes.set(
            SVGAttr.End,
            at.map((time) => `${time}ms`).join(';'),
        )

        return this
    }

    public keyTimes(times: number[]): SVGAnimate {
        this._attributes.set(
            SVGAttr.KeyTimes,
            times.map((time) => `${time}`).join(';'),
        )

        return this
    }

    public set(attr: SVGAttr, value: AttributeValue): SVGAnimate {
        this._attributes.set(attr, value)
        return this
    }

    public toNode(): SVGNode {
        const animate = new SVGNode(SVGTag.Animate).set(
            SVGAttr.Dur,
            `${this._duration}ms`,
        )

        if (this._attr !== undefined)
            animate.set(SVGAttr.AttributeName, this._attr)

        if (this._values.length !== 0)
            animate.set(SVGAttr.Values, this._values.join(';'))

        this._attributes.forEach((value, attr) => animate.set(attr, value))

        return animate
    }
}

export class SVGAnimateMotion extends SVGAnimate {
    private _path: PathData

    public constructor(path: PathData, duration: number) {
        super(duration)
        this._path = path
    }

    public keyPoints(points: number[]): SVGAnimateMotion {
        this._attributes.set(
            SVGAttr.KeyPoints,
            points.map((p) => p.toString()).join(';'),
        )
        return this
    }

    public toNode(): SVGNode {
        const animate = new SVGNode(SVGTag.AnimateMotion)
            .set(SVGAttr.Dur, `${this._duration}ms`)
            .set(SVGAttr.Path, this._path.toString())

        this._attributes.forEach((value, attr) => animate.set(attr, value))

        return animate
    }
}
