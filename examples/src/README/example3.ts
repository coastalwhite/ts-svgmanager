import { SVGManager } from 'ts-svgmanager'
import { SVGLinGradient, SVGStops, SVGAnimate } from 'ts-svgmanager/helpers'
import { ellipse } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager
const manager = new SVGManager().init('svg-root')

// We add a gradient for some color
const orangeGradient = manager.define(
    new SVGLinGradient(
        new SVGStops()
            .stop(0, 'rgb(255, 156, 96)')
            .stop(1, 'rgb(245, 125, 125)'),
    )
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(1.28)
        .y2(0.47),
)

// Render a ellipse at (50,50) and add the gradient and the animations
manager.render(
    ellipse(20, 40, 50, 50)
        .fillDef(orangeGradient)
        .animate(new SVGAnimate(2000, 'rx', [20, 40, 20]).repeatIndefinitely())
        .animate(new SVGAnimate(2000, 'ry', [40, 20, 40]).repeatIndefinitely()),
)
