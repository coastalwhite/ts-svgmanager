import PathData from './helpers/PathData'
import SVGNode from './SVGNode'
import V2D from './definitions/V2D'

/**
 *
 */
export function circle(r: number, cx?: number, cy?: number): SVGNode {
    return new SVGNode('circle')
        .cx(cx || 0)
        .cy(cy || 0)
        .stroke('#000', '1px')
        .fill('transparent')
        .set('r', r)
}

/**
 *
 */
export function line(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
): SVGNode {
    return new SVGNode('line')
        .set('x1', fromX)
        .set('y1', fromY)
        .set('x2', toX)
        .set('y2', toY)
        .stroke('#000', '1px')
}

/**
 *
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
 *
 */
export function polygon(points: { x: number; y: number }[]): SVGNode {
    return new SVGNode('polygon')
        .set('points', points.map((point) => point.x + ',' + point.y).join(' '))
        .stroke('#000', '1px')
        .fill('none')
}

/**
 *
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
 *
 */
export function ellipse(
    rx: number,
    ry: number,
    cx?: number,
    cy?: number,
): SVGNode {
    return new SVGNode('rect')
        .cx(cx || 0)
        .cy(cy || 0)
        .set('rx', rx)
        .set('ry', ry)
        .stroke('#000', '1px')
        .fill('none')
}

/**
 *
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

/**
 *
 */
export function curveCalc(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    curving: number,
): SVGNode {
    const from = new V2D(fromX, fromY),
        to = new V2D(toX, toY)
    const middle = from.middle(to)
    const dif = to.sub(from)
    let normal = new V2D(-1 * dif.y(), dif.x())
    if (!((normal.y() > 0 && curving >= 0) || (normal.y() < 0 && curving < 0)))
        normal = normal.sca(-1)

    const normalNormalized = middle.add(
        normal.sca((2 * curving) / normal.length()),
    )

    return new SVGNode('path')
        .set(
            'd',
            new PathData()
                .moveTo(from.x(), from.y())
                .quadraticCurveTo(
                    to.x(),
                    to.y(),
                    normalNormalized.x(),
                    normalNormalized.y(),
                ),
        )
        .fill('transparent')
        .stroke('#000', '1px')
}
