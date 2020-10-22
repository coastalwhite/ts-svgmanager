import { SVGLinkedNode } from '../nodes'

/**
 * All documentation can be found on
 * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/Events)
 */
type SVGEventName =
    | 'begin'
    | 'end'
    | 'repeat'
    | 'abort'
    | 'error'
    | 'resize'
    | 'scroll'
    | 'unload'
    | 'copy'
    | 'cut'
    | 'paste'
    | 'cancel'
    | 'canplay'
    | 'canplaythrough'
    | 'change'
    | 'click'
    | 'close'
    | 'cuechange'
    | 'dblclick'
    | 'drag'
    | 'dragend'
    | 'dragenter'
    | 'dragexit'
    | 'dragleave'
    | 'dragover'
    | 'dragstart'
    | 'drop'
    | 'durationchange'
    | 'emptied'
    | 'ended'
    | 'focus'
    | 'input'
    | 'invalid'
    | 'keydown'
    | 'keypress'
    | 'keyup'
    | 'load'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'loadstart'
    | 'mousedown'
    | 'mouseenter'
    | 'mouseleave'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'mousewheel'
    | 'pause'
    | 'play'
    | 'playing'
    | 'progress'
    | 'ratechange'
    | 'reset'
    | 'seeked'
    | 'seeking'
    | 'select'
    | 'show'
    | 'stalled'
    | 'submit'
    | 'suspend'
    | 'timeupdate'
    | 'toggle'
    | 'volumechange'
    | 'waiting'
    | 'wheel'
    | 'activate'
    | 'focusin'
    | 'focusout'

export default SVGEventName

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
