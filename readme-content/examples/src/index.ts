import {
    V2D,
    SVGManager,
    SVGNode,
    PathData,
    circle,
    fetchSVGNode,
    SVGTag,
    SVGAttr,
    SVGEvent,
} from '../../../dist'

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

    const gradient = new SVGNode(SVGTag.LinearGradient)
        .set(SVGAttr.SpreadMethod, 'pad')
        .set(SVGAttr.X1, '0%')
        .set(SVGAttr.Y1, '0%')
        .set(SVGAttr.X2, '87%')
        .set(SVGAttr.Y2, '111%')
        .append(
            new SVGNode(SVGTag.Stop)
                .set(SVGAttr.Offset, '0%')
                .set(
                    SVGAttr.Style,
                    'stop-color:rgb(72, 60, 102);stop-opacity:1;',
                ),
        )
        .append(
            new SVGNode(SVGTag.Stop)
                .set(SVGAttr.Offset, '100%')
                .set(
                    SVGAttr.Style,
                    'stop-color:rgb(136, 169, 197);stop-opacity:1;',
                ),
        )

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
        .setDimensions(new V2D(500, 500))
        .setPosition(new V2D(-50, -50))

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
                .name('pentagon')
                .setXY(new V2D(0, 0)),
        )

        let time = 0
        setInterval(() => {
            const x = Math.cos(time) * 30 - 15
            const y = Math.sin(time) * 30 - 15

            const elem = manager.fetchNamed('pentagon')
            elem.setAttribute(
                SVGAttr.Transform,
                `translate(${x.toString()},${y.toString()})`,
            )

            time += (2 * Math.PI) / 1000
        }, 1)
    })
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
        .setPosition(new V2D(-50, -50))

    Promise.all([
        fetchSVGNode('./svg/gradient.svg'),
        fetchSVGNode('./svg/gradient2.svg'),
    ]).then((gradients: SVGNode[]) => {
        const gradient1Id = manager.ensureDefinition(gradients[0]),
            gradient2Id = manager.ensureDefinition(gradients[1])

        const gradient1URL = `url(#${manager.mentionDefinition(gradient1Id)})`,
            gradient2URL = `url(#${manager.mentionDefinition(gradient2Id)})`

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
                .set(SVGAttr.Fill, gradient1URL)
                .name('pentagon')
                .addEvent(SVGEvent.MouseEnter, (e) => {
                    const elem = manager.fetchNamed('pentagon')
                    elem.setAttribute(SVGAttr.Fill, gradient2URL)
                })
                .addEvent(SVGEvent.MouseLeave, (e) => {
                    const elem = manager.fetchNamed('pentagon')
                    elem.setAttribute(SVGAttr.Fill, gradient1URL)
                })
                .setXY(new V2D(0, 0)),
        )
    })
}

function example6() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')
    manager.viewBox = manager.viewBox
        .setDimensions(new V2D(500, 500))
        .setPosition(new V2D(-50, -50))

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
                        .addEvent(SVGEvent.MouseEnter, (e) => {
                            const elem = manager.fetchNamed('pentagon')
                            elem.setAttribute(SVGAttr.Fill, gradient2URL)

                            const vertices = manager.fetchTagged('vertex')
                            vertices.forEach((vertex) =>
                                vertex.setAttribute(SVGAttr.R, '5'),
                            )
                        })
                        .addEvent(SVGEvent.MouseLeave, (e) => {
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
