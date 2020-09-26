import { SVGManager } from 'ts-svgmanager'
import ViewBox from 'ts-svgmanager/helpers/ViewBox'
import { circle } from 'ts-svgmanager/Shapes'

// Initializing the SVGManager with a viewBox of '-30 -30 60 60'
const manager = new SVGManager()
    .init('svg-root')
    .viewBox(new ViewBox(-30, -30, 60, 60))

// Rendering a circle with a radius of 20 at (0,0)
manager.render(circle(20))
