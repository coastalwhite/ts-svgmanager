import { SVGNode } from '../..'
import Component from '../Component'

export default class StaticSizeComponent extends Component {
    private _shape: SVGNode

    constructor(name: string, shape: SVGNode) {
        super(name)

        this._shape = shape
    }

    public shape(): SVGNode {
        return this._shape.copy()
    }
}
