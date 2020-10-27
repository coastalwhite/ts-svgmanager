import { Id } from '../util/Id'
import { SVGNode } from './Node'

/** Shortcut for creating a `use` SVGNode for a certain SVGManagerDefinition */
export class SVGUse extends SVGNode {
    public constructor(definition: Id<SVGNode>) {
        super('use')
        this.set('href', '#' + definition.val)
    }
}
