import { SVGManager } from 'ts-svgmanager'
import { circle } from 'ts-svgmanager/dist/helpers/Shapes'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

// Render a circle with a radius of 25 at (50, 50)
manager.render(circle(25, 50, 50))
