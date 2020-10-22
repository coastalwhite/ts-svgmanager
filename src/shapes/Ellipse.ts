import { V2D } from '../helpers'
import { SVGNode } from '../nodes'

/**
 * Creates a ellipse with a certain radius-X (rx) and radius-Y (ry)
 *
 * Optional arguments are center-X (cx) and center-Y (cy)
 */
export default function ellipse(radii: V2D, center?: V2D): SVGNode {
    return new SVGNode('ellipse')
        .cx(center !== undefined ? center.x : 0)
        .cy(center !== undefined ? center.y : 0)
        .set('rx', radii.x)
        .set('ry', radii.y)
        .stroke('#000', '1px')
        .fill('none')
}
