import { V2D } from '@/helpers/V2D'
import { SVGNode } from '@/nodes/Node'

/**
 * Creates a rectangle using x, y, width and height
 */
export function svgRect(position: V2D, size: V2D): SVGNode {
    return new SVGNode('rect')
        .x(position.x)
        .y(position.y)
        .set('width', size.x)
        .set('height', size.y)
        .stroke('#000', '1px')
        .fill('none')
}
