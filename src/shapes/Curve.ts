import { SVGPathData, V2D } from '../helpers'
import { SVGNode } from '../nodes'

/**
 * Draws a curve from one point to another using a control point
 */
export default function svgCurve(from: V2D, to: V2D, control: V2D): SVGNode {
    return new SVGNode('path')
        .set(
            'd',
            new SVGPathData()
                .moveTo(from.x, from.y)
                .quadraticCurveTo(to.x, to.y, control.x, control.y),
        )
        .stroke('#000', '1px')
}
