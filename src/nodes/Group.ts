import { SVGNode } from './Node'

/** Shortcut for creating a `g` SVGNode */
export class SVGGroup extends SVGNode {
    public constructor(...children: SVGNode[]) {
        super('g')
        this.append(...children)
    }
}
