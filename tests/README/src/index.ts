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
    manager.init('svg-root')

    const gradient =
        'linear-gradient(0deg, rgb(72, 60, 102) 0%, rgb(136, 169, 197) 100%)'

    // Render a pentagon with a gradient at (0,0)
    manager.renderNamed(
        'pentagon',
        new SVGNode('path')
            .set(
                'd',
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 400)
                    .lineTo(400, 300)
                    .lineTo(200, 400)
                    .closePath()
                    .toString(),
            )
            .set('stroke', '#ccc')
            .set('stroke-width', '1px')
            .set('fill', gradient),
        new V2D(0, 0),
    )
}

function example3() {
    // Initialize the SVGManager
    const manager = new SVGManager()
    manager.init('svg-root')

    const gradient =
        'linear-gradient(0deg, rgb(72, 60, 102) 0%, rgb(136, 169, 197) 100%)'

    // Render a pentagon with a gradient at (0,0)
    manager.renderNamed(
        'pentagon',
        new SVGNode('path')
            .set(
                'd',
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 400)
                    .lineTo(400, 300)
                    .lineTo(200, 400)
                    .closePath()
                    .toString(),
            )
            .set('stroke', '#ccc')
            .set('stroke-width', '1px')
            .set('fill', gradient),
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
