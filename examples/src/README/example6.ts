import { SVGManager } from 'ts-svgmanager'
import ViewBox from 'ts-svgmanager/helpers/ViewBox'
import { circle } from 'ts-svgmanager/Shapes'

// Initializing the SVGManager with a viewBox of '-30 -30 60 60'
const manager = new SVGManager()
    .init('svg-root')
    .viewBox(new ViewBox(0, 0, 200, 200))
    .width(200)
    .height(200)
    .set('cursor', 'none')

// Rendering a circle with a radius of 10 at (0,0)
manager.render(circle(10).tag('custom-cursor'))

// Adding the onmousemove listener
manager.on('mousemove', (ev: MouseEvent, svgNode) => {
    // Get the position of the SVG element
    const svgX = svgNode.element.getBoundingClientRect().x,
        svgY = svgNode.element.getBoundingClientRect().y

    // Get the x and y of the mouse relative to the SVG
    const x = ev.clientX - svgX,
        y = ev.clientY - svgY

    // Move the cursor to this location
    manager.tagged('custom-cursor').forEach((cursor) => cursor.cx(x).cy(y))
})
