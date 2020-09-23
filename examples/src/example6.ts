import { SVGManager, SVGNode } from 'ts-svgmanager'
import {
    SVGLinGradient,
    GradientStop,
    PathData,
    circle,
    SVGAnimate,
} from 'ts-svgmanager/dist/helpers'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(500, 500).setPosition(0, 0)

const passiveAnimation = new SVGAnimate(1500, 'r', [5, 6, 5, 4, 5])
    .repeatIndefinitely()
    .beginAfter(200)

const gradient = new SVGLinGradient([
    new GradientStop(0, 'rgb(72, 60, 102)'),
    new GradientStop(1, 'rgb(136, 169, 197)'),
])
    .spreadMethod('pad')
    .x1(0)
    .y1(0)
    .x2(0.87)
    .y2(1.11)

// Render a pentagon with a gradient at (0,0)
const gradientId = manager.ensureDefinition(gradient)

const vertexDefinition = manager.ensureDefinition(
    circle(0).stroke('none').fill('red').name('vertex'),
)

const vertexUse = new SVGNode('use').set('href', '#' + vertexDefinition)

manager.render(
    new SVGNode('g')
        .append(
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
                .strokeDef(gradientId, '5px')
                .fill('transparent')
                .on('mouseenter', (_e) => {
                    const vertex = manager.fetchNamed('vertex')
                    vertex.r(5).append(passiveAnimation)
                })
                .on('mouseleave', (_e) => {
                    const vertex = manager.fetchNamed('vertex')
                    vertex.removeChildren()
                    vertex.r(0)
                }),
        )
        .append(vertexUse.x(100).y(100))
        .append(vertexUse.x(300).y(100))
        .append(vertexUse.x(400).y(300))
        .append(vertexUse.x(200).y(475))
        .append(vertexUse.x(0).y(300)),
)
