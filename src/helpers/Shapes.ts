import V2D from '../V2D'
import PathData from './PathData'
import SVGNode from '../SVGNode'
import { SVGAttr, SVGTag } from '../definitions'

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
    new SVGNode(SVGTag.Circle)
        .set(SVGAttr.Cx, cx || 0)
        .set(SVGAttr.Cy, cy || 0)
        .set(SVGAttr.Stroke, '#000')
        .set(SVGAttr.StrokeWidth, '1px')
        .set(SVGAttr.Fill, 'transparent')
        .set(SVGAttr.R, r.toString())

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
    new SVGNode(SVGTag.Line)
        .set(SVGAttr.X1, from.x().toString())
        .set(SVGAttr.Y1, from.y().toString())
        .set(SVGAttr.X2, to.x().toString())
        .set(SVGAttr.Y2, to.y().toString())
        .set(SVGAttr.Stroke, '#000')
        .set(SVGAttr.StrokeWidth, '1px')

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

    return new SVGNode(SVGTag.Path)
        .set(SVGAttr.D, pathData.toString())
        .set(SVGAttr.Stroke, '#000')
        .set(SVGAttr.StrokeWidth, '1px')
        .set(SVGAttr.Fill, 'none')
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
    new SVGNode(SVGTag.Path)
        .set(
            SVGAttr.D,
            new PathData()
                .moveTo(from.x(), from.y())
                .quadraticCurveTo(to.x(), to.y(), control.x(), control.y())
                .toString(),
        )
        .set(SVGAttr.Stroke, '#000')
        .set(SVGAttr.StrokeWidth, '1px')

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

    return new SVGNode(SVGTag.Path)
        .set(
            SVGAttr.D,
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
        .set(SVGAttr.Fill, 'transparent')
        .set(SVGAttr.Stroke, '#000')
        .set(SVGAttr.StrokeWidth, '1px')
}
