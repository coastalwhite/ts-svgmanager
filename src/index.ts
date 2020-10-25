import {
    SVGNode,
    SVGLinkedNode,
    AttributeMap,
    AttributeValue,
    SVGGroup,
    SVGManagerTag,
    SVGUse,
} from './nodes'
import SVGManager from './Manager'
import {
    SVGAnimate,
    SVGAnimateMotion,
    SVGLinGradient,
    SVGRadGradient,
    SVGStops,
    svgXMLtoNode,
    svgParseNode,
    svgFetchNode,
    svgFetchNodeSync,
    SVGPathData,
    SVGViewBox,
    V2D,
} from './helpers'
import {
    svgCircle,
    svgRect,
    svgPolygon,
    svgLine,
    svgLines,
    svgEllipse,
    svgCurve,
    svgGroup,
    svgUse,
} from './shapes'
import {
    Component,
    ComponentInstance,
    ComponentUtil,
    hightlighting,
    moving,
    PolygonComponent,
    resizing,
    SizedComponent,
    StaticComponent,
} from './components'
import { panning, zooming, bgPattern } from './manager-utils'

export {
    SVGManager,
    SVGNode,
    SVGLinkedNode,
    SVGUse,
    SVGGroup,
    AttributeValue,
    AttributeMap,
    SVGManagerTag,
    SVGAnimate,
    SVGAnimateMotion,
    SVGLinGradient,
    SVGRadGradient,
    SVGStops,
    svgXMLtoNode,
    svgParseNode,
    svgFetchNode,
    svgFetchNodeSync,
    SVGPathData,
    SVGViewBox,
    V2D,
    svgCircle,
    svgRect,
    svgPolygon,
    svgLine,
    svgLines,
    svgEllipse,
    svgCurve,
    svgGroup,
    svgUse,
    Component,
    ComponentInstance,
    ComponentUtil,
    moving,
    resizing,
    hightlighting,
    StaticComponent,
    SizedComponent,
    PolygonComponent,
    panning,
    zooming,
    bgPattern,
}

/**
 * @hidden
 * The DOM-id of a SVG Defs item.
 *
 * # Usage
 * Returned by SVGManager.define. \\
 * Used by SVGManager.renderDef, SVGNode.fillDef and SVGNode.strokeDef
 *
 * # Examples
 *
 * ## Example 1 - Rendering a definition
 * ```ts
 * import { SVGManager } from 'ts-svgmanager'
 * import { circle } from 'ts-svgmanager/Shapes'
 *
 * // Initialize manager
 * const manager = new SVGManager().init('svg-root')
 *
 * // Define a Circle with radius 10
 * const definition = manager.define(circle(10))
 *
 * manager.renderDef(definition)
 * ```
 *
 * # Example 2 - Rendering a gradient as a background
 * ```ts
 * import { SVGManager } from 'ts-svgmanager'
 * import { SVGStops, SVGLinGradient } from 'ts-svgmanager/helpers/Gradient'
 * import { circle } from 'ts-svgmanager/Shapes'
 * 
 * // Initialize manager
 * const manager = new SVGManager().init('svg-root')
 * 
 * // Define a Linear Gradient with 2 stops
 * const gradient = manager.define(
 *     new SVGLinGradient(new SVGStops().stop(0, '#ccc').stop(1, '#333')),
 * )

 * // Render a circle with radius 5 and the gradient as a background
 * manager.render(circle(5).fillDef(gradient).stroke('none'))
 * ```
 */
export type SVGManagerDefinition = string & { isSvgManagerDef: true }
