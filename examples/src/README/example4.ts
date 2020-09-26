import { SVGManager, SVGNode } from 'ts-svgmanager'
import { fetchSVGNode } from 'ts-svgmanager/helpers'
import { rect } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

// Fetch the SVG node from the file
fetchSVGNode('./gradient.svg').then((node: SVGNode) => {
    const blueGradient = manager.define(node)

    // Render a rect with the blue gradient
    manager.render(rect(10, 10, 80, 80).fillDef(blueGradient))
})
