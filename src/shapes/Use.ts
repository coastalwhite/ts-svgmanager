import { SVGManagerDefinition } from '..'
import { SVGNode, SVGUse } from '../nodes'

/**
 * Create a group with children
 */
export default function svgUse(definition: SVGManagerDefinition): SVGNode {
    return new SVGUse(definition)
}
