import { SVGManager } from 'ts-svgmanager'
import { SVGLinGradient, SVGStops } from 'ts-svgmanager/helpers'
import { polygon } from 'ts-svgmanager/Shapes'

// Again we initialize the SVGManager
const manager = new SVGManager().init('svg-root')

// Define a gradient into the manager using the Gradient Helper
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

// Render a pentagon
manager.render(
    polygon([
        { x: 20, y: 10 },
        { x: 80, y: 10 },
        { x: 95, y: 60 },
        { x: 50, y: 95 },
        { x: 5, y: 60 },
    ]).fillDef(blueGradient),
)
