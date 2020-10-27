import { SVGPathData } from '../helpers/PathData'
import { V2D } from '../helpers/V2D'
import { SVGNode } from '../nodes/Node'

/**
 * Create a number of connecting lines given by a array of x and y coordinates
 */
export function svgLines(points: V2D[]): SVGNode {
    const pathData = new SVGPathData().moveTo(points[0].x, points[0].y)

    points.shift()
    points.forEach((point) => pathData.lineTo(point.x, point.y))

    return new SVGNode('path')
        .set('d', pathData)
        .stroke('#000', '1px')
        .fill('none')
}
