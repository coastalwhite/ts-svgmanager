import { SVGManager } from 'ts-svgmanager'
import { circle } from 'ts-svgmanager/Shapes'

// Initialize manager
const manager = new SVGManager().init('svg-root')

// Define a Circle with radius 10
const definition = manager.define(circle(10))

manager.renderDef(definition)
