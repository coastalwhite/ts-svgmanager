import { SVGGroup } from '@/nodes/Group'
import { SVGNode } from '@/nodes/Node'

/**
 * Create a group with children
 */
export function svgGroup(...children: SVGNode[]): SVGNode {
    return new SVGGroup(...children)
}
