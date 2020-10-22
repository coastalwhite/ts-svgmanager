import { SVGPathData, V2D } from '../helpers'
import { SVGNode } from '../nodes'

/**
 * Create a number of connecting lines given by a array of x and y coordinates
 */
export default function lines(points: V2D[]): SVGNode {
    const pathData = new SVGPathData().moveTo(points[0].x, points[0].y)

    points.shift()
    points.forEach((point) => pathData.lineTo(point.x, point.y))

    return new SVGNode('path')
        .set('d', pathData)
        .stroke('#000', '1px')
        .fill('none')
}
