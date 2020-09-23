import { SVGManager, SVGNode } from 'ts-svgmanager'
import {
    SVGLinGradient,
    GradientStop,
    PathData,
} from 'ts-svgmanager/dist/helpers'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(500, 500).setPosition(0, 0)

const gradient1Id = manager.ensureDefinition(
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
const gradient2Id = manager.ensureDefinition(
    new SVGLinGradient([
        new GradientStop(0, 'rgb(255, 156, 96)'),
        new GradientStop(1, 'rgb(245, 125, 125)'),
    ])
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(1.28)
        .y2(0.47),
)

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
        .fillDef(gradient1Id)
        .name('pentagon')
        .on('mouseenter', (_e) =>
            manager.fetchNamed('pentagon').fillDef(gradient2Id),
        )
        .on('mouseleave', (_e) =>
            manager.fetchNamed('pentagon').fillDef(gradient1Id),
        ),
)
