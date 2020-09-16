import SVGEvent from './Events'
import SVGTag from './Tags'
import SVGAttr from './Attributes'
import SVGViewBox from './ViewBox'

type EventFunc = (e: Event) => void
interface EventDefinition {
    eventType: SVGEvent
    func: EventFunc
}

export { SVGEvent, SVGTag, SVGAttr, SVGViewBox, EventDefinition, EventFunc }
