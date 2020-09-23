import { SVGManager, SVGNode } from 'ts-svgmanager'
import {
    SVGLinGradient,
    GradientStop,
    PathData,
} from 'ts-svgmanager/dist/helpers'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(500, 500)

// Define a gradient into the manager using the Gradient Helper
const gradientId = manager.ensureDefinition(
    new SVGLinGradient([
        new GradientStop(0, 'rgb(72, 60, 102)'),
        new GradientStop(1, 'rgb(136, 169, 197)'),
    ])
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(0.87)
        .y2(1.11),
)

// Render a pentagon with a gradient at (0,0)
manager.render(
    new SVGNode('path')
        .set(
            'd',
            new PathData()
                .moveTo(100, 100)
                .lineTo(300, 100)
                .lineTo(400, 300)
                .lineTo(200, 475)
                .lineTo(0, 300)
                .closePath()
                .toString(),
        )
        .stroke('#ccc', '1px')
        .fillDef(gradientId),
)
