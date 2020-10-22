import { V2D } from '../helpers'
import { SVGNode } from '../nodes'

/**
 * Create a circle with a certain radius `r`
 *
 * Optional args are `cx`: center x and `cy`: center y
 *
 */
export default function svgCircle(r: number, center?: V2D): SVGNode {
    return new SVGNode('circle')
        .cx(center !== undefined ? center.x : 0)
        .cy(center !== undefined ? center.y : 0)
        .stroke('#000', '1px')
        .fill('transparent')
        .set('r', r)
}
