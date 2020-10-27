import { SVGNode } from '@/nodes/Node'
import { SVGPathData } from '@/helpers/PathData'
import { SVGAttribute } from '@/declarations/Attributes'
import { SVGTagName } from '@/declarations/TagNames'
import { AttributeValue } from '@/nodes/types'

/**
 * Helper class for easy initialization of SVG Animations
 *
 * Handy to be used with the SVGNode.animate() method
 */
export class SVGAnimate extends SVGNode {
    /**
     * Create an animation
     * @param duration Duration of the total animation in milliseconds
     * @param attr Attribute to be animated
     * @param values The key values
     * @param tag Tag of the animation node
     */
    public constructor(
        duration: number,
        attr?: SVGAttribute,
        values?: AttributeValue[],
        tag?: SVGTagName,
    ) {
        super(tag || 'animate')
        if (attr !== undefined) this.set('attributeName', attr)
        if (values !== undefined)
            this.set('values', values.map((v) => v.toString()).join(';'))
        this.set('dur', duration + 'ms')
    }

    /**
     * Set the animation to repeat indefinitely
     */
    public repeatIndefinitely(): this {
        this.set('repeatCount', 'indefinite')
        this.set('repeatDur', 'indefinite')

        return this
    }

    /**
     * Set the animation to repeat `times` times
     * @param times Number of times from the animation to be repeated
     */
    public repeatTimes(times: number): this {
        this.set('repeatCount', times)

        return this
    }

    /**
     * Set the animation to repeat for `duration` time
     * @param duration Length of repeating time in milliseconds
     */
    public repeatDuration(duration: number): this {
        this.set('repeatDur', `${duration}ms`)

        return this
    }

    /**
     * Set the animation to begin after `аfter` amount of time
     * @param after Time to begin after in milliseconds
     */
    public beginAfter(after: number): this {
        this.set('begin', `${after}ms`)

        return this
    }

    /**
     * Set the animation to begin at `at` timestamps
     * @param at Timestamps in milliseconds for the animation to begin
     */
    public beginAt(at: number[]): this {
        this.set('begin', at.map((time) => `${time}ms`).join(';'))

        return this
    }

    /**
     * Set the animation to end after `аfter` amount of time
     * @param after Time to end after in milliseconds
     */
    public endAfter(after: number): this {
        this.set('end', `${after}ms`)

        return this
    }

    /**
     * Set the animation to end at `at` timestamps
     * @param at Timestamps in milliseconds for the animation to end
     */
    public endAt(at: number[]): this {
        this.set('end', at.map((time) => `${time}ms`).join(';'))

        return this
    }

    /**
     * Set the animation to control pacing
     * Look at [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyTimes) for more info
     * @param times Numbers from 0-1 representing where in the animation time values should take place
     */
    public keyTimes(times: number[]): this {
        this.set('keyTimes', times.map((time) => `${time}`).join(';'))

        return this
    }
}

/**
 * Extension of SVGAnimate used to control motion of shapes along paths
 */
export class SVGAnimateMotion extends SVGAnimate {
    /**
     * Create a SVGAnimateMotion object
     * @param path Path to move along
     * @param duration Duration of motion in milliseconds
     */
    public constructor(path: SVGPathData, duration: number) {
        super(duration, undefined, undefined, 'animateMotion')
        this.set('path', path.toString())
    }

    /**
     * Sets the keyPoints
     * Look at [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keyPoints) for more info
     * @param points Numbers from 0-1 representing where along the path the keyTimes should take place
     */
    public keyPoints(points: number[]): this {
        this.set('keyPoints', points.map((p) => p.toString()).join(';'))
        return this
    }
}
