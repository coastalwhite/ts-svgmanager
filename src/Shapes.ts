import V2D from './V2D'
import PathData from './PathData'
import SVGNode from './SVGNode'

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
export const circle = (r: number): SVGNode =>
    new SVGNode('circle')
        .set('cx', '0')
        .set('cy', '0')
        .set('stroke', '#000')
        .set('stroke-width', '1px')
        .set('fill', 'transparent')
        .set('r', r.toString())

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
export const line = (from: V2D, to: V2D): SVGNode =>
    new SVGNode('line')
        .set('x1', from.x().toString())
        .set('y1', from.y().toString())
        .set('x2', to.x().toString())
        .set('y2', to.y().toString())
        .set('stroke', '#000')
        .set('stroke-width', '1px')

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
export const lines = (points: V2D[]): SVGNode => {
    const pathData = new PathData().moveTo(points[0].x(), points[0].y())

    points.shift()
    points.forEach((point) => pathData.lineTo(point.x(), point.y()))

    return new SVGNode('path')
        .set('d', pathData.toString())
        .set('stroke', '#000')
        .set('stroke-width', '1px')
        .set('fill', 'none')
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
export const curve = (from: V2D, to: V2D, control: V2D): SVGNode =>
    new SVGNode('path')
        .set(
            'd',
            new PathData()
                .moveTo(from.x(), from.y())
                .quadraticCurveTo(to.x(), to.y(), control.x(), control.y())
                .toString(),
        )
        .set('stroke', '#000')
        .set('stroke-width', '1px')

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
export const curveCalc = (from: V2D, to: V2D, curving: number): SVGNode => {
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
        .set('fill', 'transparent')
        .set('stroke', '#000')
        .set('stroke-width', '1px')
}
