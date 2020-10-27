import { SVGNode } from '../../nodes/Node'
import { Component } from '../Component'

export class StaticComponent extends Component {
    private _shape: SVGNode

    constructor(name: string, shape: SVGNode) {
        super(name)

        this._shape = shape
    }

    public shape(): SVGNode {
        return this._shape.copy()
    }
}
