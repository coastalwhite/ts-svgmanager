import { V2D } from '../helpers'
import { SVGNode } from '../nodes'

/**
 * Creates a polygon using the given points
 */
export default function svgPolygon(points: V2D[]): SVGNode {
    return new SVGNode('polygon')
        .set('points', points.map((point) => point.x + ',' + point.y).join(' '))
        .stroke('#000', '1px')
        .fill('none')
}
