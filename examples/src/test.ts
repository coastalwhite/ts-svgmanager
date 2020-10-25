// import { SVGManager } from 'ts-svgmanager'
// import { circle } from 'ts-svgmanager/Shapes'

// // Initialize the SVGManager
// const manager = new SVGManager()
// manager.init('svg-root')

// // Render a circle with a radius of 25 at (50, 50)
// manager.render(circle(25, 50, 50))

// const variableSized = new VariableSizedComponent(
//     'sized',
//     (size: V2D) => svgEllipse(size.sca(1 / 2)).fill('lightgreen'),
//     new V2D(15, 15),
// )

// variableSized.do(manager, { action: 'move' })

// manager.render(svgCircle(10, new V2D(40, 40)).fill('lightblue'))

import {
    bgPattern,
    hightlighting,
    moving,
    panning,
    PolygonComponent,
    resizing,
    SizedComponent,
    StaticComponent,
    svgCircle,
    svgEllipse,
    svgLines,
    SVGManager,
    SVGViewBox,
    V2D,
    zooming,
} from 'ts-svgmanager'

// Initialize the SVGManager
const manager = new SVGManager()
    .init('svg-root')
    .set('viewBox', new SVGViewBox(0, 0, 100, 50))
    .styleSet('border', '1px solid #000')

manager.utilize(panning(), bgPattern({ patternType: 'dotted' }), zooming())

const staticComponent = new StaticComponent(
    'static',
    svgCircle(10).fill('lightblue'),
)
staticComponent.utilize(moving(), hightlighting())

const variableComponent = new SizedComponent('variable', (size: V2D) =>
    svgEllipse(new V2D(size.x / 2, size.y / 2)).fill('coral'),
)
variableComponent.utilize(moving(), resizing())

const pointsComponent = new PolygonComponent('points', (points: V2D[]) =>
    svgLines(points),
)
pointsComponent.utilize(moving(), resizing())

manager.declare(staticComponent)
manager.declare(variableComponent)
manager.declare(pointsComponent)

manager.create('points', new V2D(15, 15), [
    new V2D(0, 0),
    new V2D(10, 10),
    new V2D(20, 0),
])

manager.create('variable', new V2D(15, 15), [new V2D(10, 10)])

manager.create('static', new V2D(20, 30))
manager.create('static', new V2D(60, 30))

// const instance = manager.instantiate('static')
// manager.move(instance, new V2D(50, 25))
