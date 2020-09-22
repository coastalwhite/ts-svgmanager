import SVGEvent from './SVGEvent'
import SVGAttribute from './SVGAttribute'
import SVGTag from './SVGTag'

type EventFunc = (e: Event) => void
interface EventDefinition {
    eventType: SVGEvent
    func: EventFunc
}

export { SVGEvent, SVGTag, SVGAttribute, EventDefinition, EventFunc }
