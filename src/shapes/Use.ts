import { SVGNode } from '@/nodes/Node'
import { SVGUse } from '@/nodes/Use'
import { Id } from '@/util/Id'

/**
 * Create a group with children
 */
export function svgUse(definition: Id<SVGNode>): SVGUse {
    return new SVGUse(definition)
}
