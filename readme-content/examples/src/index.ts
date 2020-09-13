import { V2D, SVGManager, SVGNode, PathData, circle } from '../../../dist'

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

    SVGNode.fromFile('./svg/gradient.svg').then((gradient: SVGNode) => {
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
    })
}

function example4() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root').setViewBoxWidth(500).setViewBoxHeight(500)

    SVGNode.fromFile('./svg/gradient.svg').then((gradient: SVGNode) => {
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
    })
}

function example5() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root').setViewBoxWidth(500).setViewBoxHeight(500)

    SVGNode.fromFile('./svg/gradient.svg').then((gradient: SVGNode) => {
        // Render a pentagon with a gradient at (0,0)
        const gradientId = manager.ensureDefinition(gradient)
        manager.renderNamed(
            'pentagon',
            new SVGNode('path')
                .set(
                    'd',
                    new PathData()
                        .moveTo(-100, -175)
                        .lineTo(100, -175)
                        .lineTo(200, 125)
                        .lineTo(0, 200)
                        .lineTo(-200, 125)
                        .closePath()
                        .toString(),
                )
                .set('stroke', '#ccc')
                .set('stroke-width', '1px')
                .set('fill', `url(#${manager.mentionDefinition(gradientId)})`),
            new V2D(0, 0),
        )
    })

    const svg = document.getElementById(manager.id())
    svg.addEventListener('mousemove', (ev: MouseEvent) => {
        const location = new V2D(
            ev.clientX - svg.clientLeft,
            ev.clientY - svg.clientTop,
        )
        manager.moveNamed('pentagon', location)
    })
}

example1()
example2()
example3()
example4()
example5()
