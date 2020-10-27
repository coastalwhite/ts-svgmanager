import { V2D } from '../helpers/V2D'
import { SVGNode } from '../nodes/Node'

/**
 * Creates a polygon using the given points
 */
export function svgPolygon(points: V2D[]): SVGNode {
    return new SVGNode('polygon')
        .set('points', points.map((point) => point.x + ',' + point.y).join(' '))
        .stroke('#000', '1px')
        .fill('none')
}
