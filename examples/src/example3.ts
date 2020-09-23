import { SVGManager, SVGNode } from 'ts-svgmanager'
import {
    SVGLinGradient,
    GradientStop,
    SVGAnimate,
    ViewBox,
} from 'ts-svgmanager/dist/helpers'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = new ViewBox(-250, -250, 500, 500)

const gradient = new SVGLinGradient([
    new GradientStop(0, 'rgb(255, 156, 96)'),
    new GradientStop(1, 'rgb(245, 125, 125)'),
])
    .spreadMethod('pad')
    .x1(0)
    .y1(0)
    .x2(1.28)
    .y2(0.47)

// Render a pentagon with a gradient at (0,0)
const gradientId = manager.ensureDefinition(gradient)
manager.render(
    new SVGNode('ellipse')
        .set('rx', 100)
        .set('ry', 200)
        .stroke('#ccc', '1px')
        .fillDef(gradientId)
        .animate(
            new SVGAnimate(2000, 'rx', [100, 200, 100]).repeatIndefinitely(),
        )
        .animate(
            new SVGAnimate(2000, 'ry', [200, 100, 200]).repeatIndefinitely(),
        ),
)
