import { SVGGroup, SVGNode } from '../nodes'

/**
 * Create a group with children
 */
export default function svgGroup(...children: SVGNode[]): SVGNode {
    return new SVGGroup(...children)
}
