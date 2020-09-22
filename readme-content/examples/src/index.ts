import {
    V2D,
    SVGManager,
    SVGNode,
    SVGTag,
    SVGAttr,
    SVGEvent,
} from '../../../dist'
import { SVGAnimateMotion } from '../../../dist/helpers/Animate'
import PathData from '../../../dist/helpers/PathData'
import { fetchSVGNode } from '../../../dist/helpers/Parser'
import { circle } from '../../../dist/helpers/Shapes'
import {
    GradientStop,
    mentionGradient,
    SVGLinGradient,
} from '../../../dist/helpers/Gradient'

function example1() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')

    // Render a circle with a radius of 25 at (50, 50)
    manager.render(circle(25, 50, 50))
}

function example2() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')
    manager.viewBox = manager.viewBox.setDimensions(new V2D(500, 500))

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
    manager.render(
        new SVGNode(SVGTag.Path)
            .set(
                SVGAttr.D,
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 475)
                    .lineTo(0, 300)
                    .closePath()
                    .toString(),
            )
            .set(SVGAttr.Stroke, '#ccc')
            .set(SVGAttr.StrokeWidth, '1px')
            .set(SVGAttr.Fill, `url(#${manager.mentionDefinition(gradientId)})`)
            .name('pentagon')
            .setXY(new V2D(0, 0)),
    )
}

function example3() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')
    manager.viewBox = manager.viewBox
        .setDimensions(new V2D(600, 600))
        .setPosition(new V2D(0, 0))

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
    manager.render(
        new SVGNode(SVGTag.Path)
            .set(
                SVGAttr.D,
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 475)
                    .lineTo(0, 300)
                    .closePath()
                    .toString(),
            )
            .set(SVGAttr.Stroke, '#ccc')
            .set(SVGAttr.StrokeWidth, '1px')
            .set(SVGAttr.Fill, `url(#${manager.mentionDefinition(gradientId)})`)
            .name('pentagon')
            .animate(
                new SVGAnimateMotion(
                    new PathData()
                        .moveTo(0, 0)
                        .lineTo(100, 0)
                        .lineTo(100, 100)
                        .lineTo(0, 100)
                        .closePath(),
                    2000,
                ).repeatIndefinitely(),
            ),
    )
}

function example4() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')
    manager.viewBox = manager.viewBox.setDimensions(new V2D(500, 500))

    fetchSVGNode('./svg/gradient.svg').then((gradient: SVGNode) => {
        // Render a pentagon with a gradient at (0,0)
        const gradientId = manager.ensureDefinition(gradient)
        manager.render(
            new SVGNode(SVGTag.Path)
                .set(
                    SVGAttr.D,
                    new PathData()
                        .moveTo(100, 100)
                        .lineTo(300, 100)
                        .lineTo(400, 300)
                        .lineTo(200, 475)
                        .lineTo(0, 300)
                        .closePath()
                        .toString(),
                )
                .set(SVGAttr.Stroke, '#ccc')
                .set(SVGAttr.StrokeWidth, '1px')
                .set(
                    SVGAttr.Fill,
                    `url(#${manager.mentionDefinition(gradientId)})`,
                )
                .set(SVGAttr.Style, 'transition: fill .2s ease')
                .name('pentagon')
                .setXY(new V2D(0, 0)),
        )
    })
}

function example5() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')
    manager.viewBox = manager.viewBox
        .setDimensions(new V2D(500, 500))
        .setPosition(new V2D(0, 0))

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
        new SVGNode(SVGTag.Path)
            .set(
                SVGAttr.D,
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 475)
                    .lineTo(0, 300)
                    .closePath()
                    .toString(),
            )
            .set(SVGAttr.Stroke, '#ccc')
            .set(SVGAttr.StrokeWidth, '1px')
            .set(SVGAttr.Fill, mentionGradient(manager, gradient1Id))
            .name('pentagon')
            .addEvent(SVGEvent.MouseEnter, (_e) => {
                const elem = manager.fetchNamed('pentagon')
                elem.setAttribute(
                    SVGAttr.Fill,
                    mentionGradient(manager, gradient2Id),
                )
            })
            .addEvent(SVGEvent.MouseLeave, (_e) => {
                const elem = manager.fetchNamed('pentagon')
                elem.setAttribute(
                    SVGAttr.Fill,
                    mentionGradient(manager, gradient1Id),
                )
            })
            .setXY(new V2D(0, 0)),
    )
}

function example6() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')
    manager.viewBox = manager.viewBox
        .setDimensions(new V2D(500, 500))
        .setPosition(new V2D(0, 0))

    Promise.all([
        fetchSVGNode('./svg/gradient.svg'),
        fetchSVGNode('./svg/gradient2.svg'),
    ]).then((gradients: SVGNode[]) => {
        const gradient1Id = manager.ensureDefinition(gradients[0]),
            gradient2Id = manager.ensureDefinition(gradients[1])

        const gradient1URL = `url(#${manager.mentionDefinition(gradient1Id)})`,
            gradient2URL = `url(#${manager.mentionDefinition(gradient2Id)})`

        manager.render(
            new SVGNode(SVGTag.G)
                .append(
                    new SVGNode(SVGTag.Path)
                        .set(
                            SVGAttr.D,
                            new PathData()
                                .moveTo(100, 100)
                                .lineTo(300, 100)
                                .lineTo(400, 300)
                                .lineTo(200, 475)
                                .lineTo(0, 300)
                                .closePath()
                                .toString(),
                        )
                        .set(SVGAttr.Stroke, '#ccc')
                        .set(SVGAttr.StrokeWidth, '1px')
                        .set(SVGAttr.Fill, gradient1URL)
                        .name('pentagon')
                        .addEvent(SVGEvent.MouseEnter, (_e) => {
                            const elem = manager.fetchNamed('pentagon')
                            elem.setAttribute(SVGAttr.Fill, gradient2URL)

                            const vertices = manager.fetchTagged('vertex')
                            vertices.forEach((vertex) =>
                                vertex.setAttribute(SVGAttr.R, '5'),
                            )
                        })
                        .addEvent(SVGEvent.MouseLeave, (_e) => {
                            const elem = manager.fetchNamed('pentagon')
                            elem.setAttribute(SVGAttr.Fill, gradient1URL)

                            const vertices = manager.fetchTagged('vertex')
                            vertices.forEach((vertex) =>
                                vertex.setAttribute(SVGAttr.R, '0'),
                            )
                        }),
                )
                .append(circle(0, 100, 100).tag('vertex'))
                .append(circle(0, 300, 100).tag('vertex'))
                .append(circle(0, 400, 300).tag('vertex'))
                .append(circle(0, 200, 475).tag('vertex'))
                .append(circle(0, 0, 300).tag('vertex')),
        )
    })
}

example1()
example2()
example3()
example4()
example5()
example6()
