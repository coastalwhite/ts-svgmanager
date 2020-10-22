// import { SVGManager } from 'ts-svgmanager'
// import { circle } from 'ts-svgmanager/Shapes'

// // Initialize the SVGManager
// const manager = new SVGManager()
// manager.init('svg-root')

// // Render a circle with a radius of 25 at (50, 50)
// manager.render(circle(25, 50, 50))

import { SVGManager } from '../../dist'
import { SVGViewBox, V2D } from '../../dist/helpers'
import { svgCircle } from '../../dist/shapes'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.set('viewBox', new SVGViewBox(0, 0, 100, 100))

manager.render(svgCircle(10, new V2D(40, 40)).fill('lightblue'))

manager.do({ action: 'panning' }, { action: 'zooming' })
