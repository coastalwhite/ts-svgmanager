import { V2D } from '../helpers/V2D'
import { SVGNode } from '../nodes/Node'

/**
 * Create a line from one point to another
 */
export function svgLine(from: V2D, to: V2D): SVGNode {
    return new SVGNode('line')
        .set('x1', from.x)
        .set('y1', from.y)
        .set('x2', to.x)
        .set('y2', to.y)
        .stroke('#000', '1px')
}
