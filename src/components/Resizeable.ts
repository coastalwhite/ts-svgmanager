import { V2D } from '../helpers'
import { SVGNode } from '../nodes'
import Component from './Component'

export default abstract class ResizableComponent extends Component {
    constructor(name: string) {
        super(name)
    }

    public abstract resize(container: SVGNode, to: V2D): void
}
