import { SVGManager } from 'ts-svgmanager'
import { SVGStops, SVGLinGradient } from 'ts-svgmanager/helpers/Gradient'
import { circle } from 'ts-svgmanager/Shapes'

// Initialize manager
const manager = new SVGManager().init('svg-root')

// Define a Linear Gradient with 2 stops
const gradient = manager.define(
    new SVGLinGradient(new SVGStops().stop(0, '#ccc').stop(1, '#333')),
)

// Render a circle with radius 5 and the gradient as a background
manager.render(circle(5).fillDef(gradient).stroke('none'))
