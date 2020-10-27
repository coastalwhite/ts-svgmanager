import { SVGEventName } from '@/declarations/Events'
import { SVGLinkedNode } from '@/nodes/Node'

/** A EventHandler for SVGManager */
export type SVGManagerEventHandler = (
    event: Event,
    node: SVGLinkedNode,
) => unknown

/** The combination of an eventName and a handler */
export interface SVGManagerEventDefinition {
    eventName: SVGEventName
    func: SVGManagerEventHandler
}
