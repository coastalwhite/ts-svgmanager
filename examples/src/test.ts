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

import { SVGManager } from '../../dist'
import { SVGViewBox, V2D } from '../../dist/helpers'
import { svgCircle } from '../../dist/shapes'
import StaticSizeComponent from '../../dist/components/StaticSize'

// Initialize the SVGManager
const manager = new SVGManager()
    .init('svg-root')
    .set('viewBox', new SVGViewBox(0, 0, 100, 50))
    .styleSet('border', '1px solid #000')

manager.render(svgCircle(10, new V2D(50, 25))).fill('coral')

const staticSized = new StaticSizeComponent('static', () =>
    svgCircle(10).fill('coral'),
)

manager.declare(staticSized)

const instance = manager.instantiate('static')
manager.move(instance, new V2D(50, 25))
