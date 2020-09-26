// import { SVGManager } from 'ts-svgmanager'
// import { circle } from 'ts-svgmanager/Shapes'

// // Initialize the SVGManager
// const manager = new SVGManager()
// manager.init('svg-root')

// // Render a circle with a radius of 25 at (50, 50)
// manager.render(circle(25, 50, 50))

import { SVGManager, SVGNode } from 'ts-svgmanager'
import { PathData } from 'ts-svgmanager/helpers'

// Initialize a circle with args
const pill = new SVGNode('path')
    .set(
        'd',
        new PathData()
            .moveTo(10, 40)
            .lineTo(10, 60)
            .curveTo(30, 60, 10, 70, 30, 70)
            .lineTo(30, 40)
            .curveTo(10, 40, 30, 30, 10, 30)
            .closePath(),
    )
    .stroke('#000', '1px')
    .fill('none')

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

// Render this
manager.render(pill)
