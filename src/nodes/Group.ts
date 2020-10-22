import { SVGNode } from '.'

/** Shortcut for creating a `g` SVGNode */
export default class SVGGroup extends SVGNode {
    public constructor(...children: SVGNode[]) {
        super('g')
        this.append(...children)
    }
}
