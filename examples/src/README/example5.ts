import { SVGManager } from 'ts-svgmanager'
import { SVGLinGradient, SVGStops } from 'ts-svgmanager/helpers'
import { rect } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

const blueGradient = manager.define(
    new SVGLinGradient(
        new SVGStops()
            .stop(0, 'rgb(72, 60, 102)')
            .stop(1, 'rgb(136, 169, 197)'),
    )
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(0.87)
        .y2(1.11),
)
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

manager.render(
    rect(10, 10, 80, 80)
        .fillDef(blueGradient)
        .on('mouseenter', (_e, node) => node.fillDef(orangeGradient))
        .on('mouseleave', (_e, node) => node.fillDef(blueGradient)),
)
