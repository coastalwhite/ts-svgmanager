import { SVGNode } from '.'
import { SVGManagerDefinition } from '..'

/** Shortcut for creating a `use` SVGNode for a certain SVGManagerDefinition */
export class SVGUse extends SVGNode {
    public constructor(definition: SVGManagerDefinition) {
        super('use')
        this.set('href', '#' + definition)
    }
}
