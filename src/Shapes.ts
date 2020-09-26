import PathData from './helpers/PathData'
import SVGNode, { AttributeValue } from './SVGNode'

/**
 * Create a circle with a certain radius `r`
 *
 * Optional args are `cx`: center x and `cy`: center y
 *
 */
export function circle(
    r: AttributeValue,
    cx?: AttributeValue,
    cy?: AttributeValue,
): SVGNode {
    return new SVGNode('circle')
        .cx(cx || 0)
        .cy(cy || 0)
        .stroke('#000', '1px')
        .fill('transparent')
        .set('r', r)
}

/**
 * Create a line from one point to another
 */
export function line(
    fromX: AttributeValue,
    fromY: AttributeValue,
    toX: AttributeValue,
    toY: AttributeValue,
): SVGNode {
    return new SVGNode('line')
        .set('x1', fromX)
        .set('y1', fromY)
        .set('x2', toX)
        .set('y2', toY)
        .stroke('#000', '1px')
}

/**
 * Create a number of connecting lines given by a array of x and y coordinates
 */
export function lines(points: { x: number; y: number }[]): SVGNode {
    const pathData = new PathData().moveTo(points[0].x, points[0].y)

    points.shift()
    points.forEach((point) => pathData.lineTo(point.x, point.y))

    return new SVGNode('path')
        .set('d', pathData)
        .stroke('#000', '1px')
        .fill('none')
}

/**
 * Creates a polygon using the given points
 */
export function polygon(points: { x: number; y: number }[]): SVGNode {
    return new SVGNode('polygon')
        .set('points', points.map((point) => point.x + ',' + point.y).join(' '))
        .stroke('#000', '1px')
        .fill('none')
}

/**
 * Creates a rectangle using x, y, width and height
 */
export function rect(
    x: number,
    y: number,
    width: number,
    height: number,
): SVGNode {
    return new SVGNode('rect')
        .x(x)
        .y(y)
        .set('width', width)
        .set('height', height)
        .stroke('#000', '1px')
        .fill('none')
}

/**
 * Creates a ellipse with a certain radius-X (rx) and radius-Y (ry)
 *
 * Optional arguments are center-X (cx) and center-Y (cy)
 */
export function ellipse(
    rx: number,
    ry: number,
    cx?: number,
    cy?: number,
): SVGNode {
    return new SVGNode('ellipse')
        .cx(cx || 0)
        .cy(cy || 0)
        .set('rx', rx)
        .set('ry', ry)
        .stroke('#000', '1px')
        .fill('none')
}

/**
 * Draws a curve from one point to another using a control point
 */
export function curve(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    controlX: number,
    controlY: number,
): SVGNode {
    return new SVGNode('path')
        .set(
            'd',
            new PathData()
                .moveTo(fromX, fromY)
                .quadraticCurveTo(toX, toY, controlX, controlY),
        )
        .stroke('#000', '1px')
}
