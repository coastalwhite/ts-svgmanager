import { V2D } from '../helpers'
import { SVGNode } from '../nodes'

/**
 * Create a line from one point to another
 */
export default function line(from: V2D, to: V2D): SVGNode {
    return new SVGNode('line')
        .set('x1', from.x)
        .set('y1', from.y)
        .set('x2', to.x)
        .set('y2', to.y)
        .stroke('#000', '1px')
}
