import PathData from './PathData'
import SVGNode from '../SVGNode'
import V2D from '../definitions/V2D'

/**
 * Returns a SVGNode containing a circle with radius *r* and
 * includes default styling
 *
 * # Note
 * Default styling includes:
 *  - cx, cy both zero
 *  - black 1px outline
 *  - transparent fill
 *
 * These can all be overwritten using the SVGNode.set() method
 */
export const circle = (r: number, cx?: number, cy?: number): SVGNode =>
    new SVGNode('circle')
        .cx(cx || 0)
        .cy(cy || 0)
        .stroke('#000', '1px')
        .fill('transparent')
        .set('r', r)

/**
 * Returns a SVGNode containing a line between two
 * points/vectors *from* and *to* and default styling
 *
 * # Note
 * Default styling includes:
 *  - black 1px line
 *
 * These can all be overwritten using the SVGNode.set() method
 */
export const line = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
): SVGNode =>
    new SVGNode('line')
        .set('x1', fromX.toString())
        .set('y1', fromY.toString())
        .set('x2', toX.toString())
        .set('y2', toY.toString())
        .stroke('#000', '1px')

/**
 * Returns a SVGNode containing a path with lines between multiple
 * points/vectors in *points* and adds default styling
 *
 * # Note
 * Default styling includes:
 *  - black 1px lines
 *  - no filling
 *
 * These can all be overwritten using the SVGNode.set() method
 */
export const lines = (points: { x: number; y: number }[]): SVGNode => {
    const pathData = new PathData().moveTo(points[0].x, points[0].y)

    points.shift()
    points.forEach((point) => pathData.lineTo(point.x, point.y))

    return new SVGNode('path')
        .set('d', pathData.toString())
        .stroke('#000', '1px')
        .fill('none')
}

/**
 * Returns a SVGNode containing a quadratic-curve between two
 * points/vectors *from* and *to*
 * and uses *control* as a quadratic-curve control point. Also adds default styling.
 *
 * # Note
 * Default styling includes:
 *  - black 1px lines
 *
 * These can all be overwritten using the SVGNode.set() method
 */
export const curve = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    controlX: number,
    controlY: number,
): SVGNode =>
    new SVGNode('path')
        .set(
            'd',
            new PathData()
                .moveTo(fromX, fromY)
                .quadraticCurveTo(toX, toY, controlX, controlY)
                .toString(),
        )
        .stroke('#000', '1px')

/**
 * Returns a SVGNode containing a quadratic-curve between two
 * points/vectors *from* and *to*
 * and uses *curving* to determine the amount of the curvature.
 * Also adds default styling.
 *
 * # Note
 * Default styling includes:
 *  - black 1px lines
 *  - transparent filling
 *
 * These can all be overwritten using the SVGNode.set() method
 */
export const curveCalc = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    curving: number,
): SVGNode => {
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
                )
                .toString(),
        )
        .fill('transparent')
        .stroke('#000', '1px')
}
