import { V2D } from '@/helpers/V2D'
import { SVGNode } from '@/nodes/Node'

/**
 * Creates a ellipse with a certain radius-X (rx) and radius-Y (ry)
 *
 * Optional arguments are center-X (cx) and center-Y (cy)
 */
export function svgEllipse(radii: V2D, center?: V2D): SVGNode {
    return new SVGNode('ellipse')
        .cx(center !== undefined ? center.x : 0)
        .cy(center !== undefined ? center.y : 0)
        .set('rx', radii.x)
        .set('ry', radii.y)
        .stroke('#000', '1px')
        .fill('none')
}
