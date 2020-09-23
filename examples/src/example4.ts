import { SVGManager, SVGNode } from 'ts-svgmanager'
import { fetchSVGNode, PathData } from 'ts-svgmanager/dist/helpers'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(500, 500)

fetchSVGNode('./gradient.svg').then((gradient: SVGNode) => {
    const gradientId = manager.ensureDefinition(gradient)

    // Render a pentagon with a gradient
    manager.render(
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
            .stroke('#ccc', '1px')
            .fillDef(gradientId),
    )
})
