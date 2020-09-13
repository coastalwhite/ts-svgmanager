import { V2D, SVGManager, SVGNode, PathData, circle } from 'ts-svgmanager'

function example1() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')

    // Render a circle with a radius of 25 at (50, 50)
    manager.render(circle(25), new V2D(50, 50))
}

function example2() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root').setViewBoxWidth(500).setViewBoxHeight(500)

    const gradient = new SVGNode('linearGradient')
        .set('spreadMethod', 'pad')
        .set('x1', '0%')
        .set('y1', '0%')
        .set('x2', '87%')
        .set('y2', '111%')
        .append(
            new SVGNode('stop')
                .set('offset', '0%')
                .set('style', 'stop-color:rgb(72, 60, 102);stop-opacity:1;'),
        )
        .append(
            new SVGNode('stop')
                .set('offset', '100%')
                .set('style', 'stop-color:rgb(136, 169, 197);stop-opacity:1;'),
        )

    // Render a pentagon with a gradient at (0,0)
    const gradientId = manager.ensureDefinition(gradient)
    manager.renderNamed(
        'pentagon',
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
            .set('stroke', '#ccc')
            .set('stroke-width', '1px')
            .set('fill', `url(#${manager.mentionDefinition(gradientId)})`),
        new V2D(0, 0),
    )
}

function example3() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager
        .init('svg-root')
        .setViewBoxWidth(600)
        .setViewBoxHeight(600)
        .setViewBoxLocation(new V2D(-50, -50))

    const gradient = new SVGNode('linearGradient')
        .set('spreadMethod', 'pad')
        .set('x1', '0%')
        .set('y1', '0%')
        .set('x2', '87%')
        .set('y2', '111%')
        .append(
            new SVGNode('stop')
                .set('offset', '0%')
                .set('style', 'stop-color:rgb(72, 60, 102);stop-opacity:1;'),
        )
        .append(
            new SVGNode('stop')
                .set('offset', '100%')
                .set('style', 'stop-color:rgb(136, 169, 197);stop-opacity:1;'),
        )

    // <linearGradient spreadMethod="pad" id="gradient" x1="0%" y1="0%" x2="87%" y2="111%">
    //  <stop offset="0%" style="stop-color:rgb(72, 60, 102);stop-opacity:1;" />
    //     <stop offset="100%" style="stop-color:rgb(136, 169, 197);stop-opacity:1;" />
    // </linearGradient>

    // Render a pentagon with a gradient at (0,0)
    const gradientId = manager.ensureDefinition(gradient)
    manager.renderNamed(
        'pentagon',
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
            .set('stroke', '#ccc')
            .set('stroke-width', '1px')
            .set('fill', `url(#${manager.mentionDefinition(gradientId)})`),
        new V2D(0, 0),
    )

    let time = 0
    setInterval(() => {
        const x = Math.cos(time) * 30 - 15
        const y = Math.sin(time) * 30 - 15

        manager.moveNamed('pentagon', new V2D(x, y))

        time += (2 * Math.PI) / 1000
    }, 1)
}

example1()
example2()
example3()
