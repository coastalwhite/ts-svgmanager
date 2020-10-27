import { SVGPathData } from '@/helpers/PathData'
import { V2D } from '@/helpers/V2D'
import { SVGNode } from '@/nodes/Node'

/**
 * Draws a curve from one point to another using a control point
 */
export function svgCurve(from: V2D, to: V2D, control: V2D): SVGNode {
    return new SVGNode('path')
        .set(
            'd',
            new SVGPathData()
                .moveTo(from.x, from.y)
                .quadraticCurveTo(to.x, to.y, control.x, control.y),
        )
        .stroke('#000', '1px')
}
