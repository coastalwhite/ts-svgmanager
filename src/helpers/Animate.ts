import PathData from './PathData'
import { SVGAttr, SVGTag } from '../definitions'
import SVGNode, { AttributeValue } from '../SVGNode'

/**
 * Helper class for easy initialization of SVG Animations
 *
 * Handy to be used with the SVGNode.animate() method
 */
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

    /**
     * Set the animation to repeat indefinitely
     */
    public repeatIndefinitely(): SVGAnimate {
        this._attributes.set(SVGAttr.RepeatCount, 'indefinite')
        this._attributes.set(SVGAttr.RepeatDur, 'indefinite')

        return this
    }

    /**
     * Set the animation to repeat `times` times
     * @param times Number of times from the animation to be repeated
     */
    public repeatTimes(times: number): SVGAnimate {
        this._attributes.set(SVGAttr.RepeatCount, times)

        return this
    }

    /**
     * Set the animation to repeat for `duration` time
     * @param duration Length of repeating time in milliseconds
     */
    public repeatDuration(duration: number): SVGAnimate {
        this._attributes.set(SVGAttr.RepeatDur, `${duration}ms`)

        return this
    }

    /**
     * Set the animation to begin after `аfter` amount of time
     * @param after Time to begin after in milliseconds
     */
    public beginAfter(after: number): SVGAnimate {
        this._attributes.set(SVGAttr.Begin, `${after}ms`)

        return this
    }

    /**
     * Set the animation to begin at `at` timestamps
     * @param at Timestamps in milliseconds for the animation to begin
     */
    public beginAt(at: number[]): SVGAnimate {
        this._attributes.set(
            SVGAttr.Begin,
            at.map((time) => `${time}ms`).join(';'),
        )

        return this
    }

    /**
     * Set the animation to end after `аfter` amount of time
     * @param after Time to end after in milliseconds
     */
    public endAfter(after: number): SVGAnimate {
        this._attributes.set(SVGAttr.End, `${after}ms`)

        return this
    }

    /**
     * Set the animation to end at `at` timestamps
     * @param at Timestamps in milliseconds for the animation to end
     */
    public endAt(at: number[]): SVGAnimate {
        this._attributes.set(
            SVGAttr.End,
            at.map((time) => `${time}ms`).join(';'),
        )

        return this
    }

    /**
     * Set the animation to control pacing
     * Look at [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyTimes) for more info
     * @param times Numbers from 0-1 representing where in the animation time values should take place
     */
    public keyTimes(times: number[]): SVGAnimate {
        this._attributes.set(
            SVGAttr.KeyTimes,
            times.map((time) => `${time}`).join(';'),
        )

        return this
    }

    /**
     * Set an attribute of the animation node to a value
     * @param attr Attribute to set
     * @param value Value to set to
     */
    public set(attr: SVGAttr, value: AttributeValue): SVGAnimate {
        this._attributes.set(attr, value)
        return this
    }

    /**
     * Converts the SVGAnimate into a SVGNode
     */
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

/**
 * Extension of SVGAnimate used to control motion of shapes along paths
 */
export class SVGAnimateMotion extends SVGAnimate {
    private _path: PathData

    /**
     * Create a SVGAnimateMotion object
     * @param path Path to move along
     * @param duration Duration of motion in milliseconds
     */
    public constructor(path: PathData, duration: number) {
        super(duration)
        this._path = path
    }

    /**
     * Sets the keyPoints
     * Look at [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyPoints) for more info
     * @param points Numbers from 0-1 representing where along the path the keyTimes should take place
     */
    public keyPoints(points: number[]): SVGAnimateMotion {
        this._attributes.set(
            SVGAttr.KeyPoints,
            points.map((p) => p.toString()).join(';'),
        )
        return this
    }

    /**
     * Converts the SVGAnimateMotion into a SVGNode
     */
    public toNode(): SVGNode {
        const animate = new SVGNode(SVGTag.AnimateMotion)
            .set(SVGAttr.Dur, `${this._duration}ms`)
            .set(SVGAttr.Path, this._path.toString())

        this._attributes.forEach((value, attr) => animate.set(attr, value))

        return animate
    }
}
