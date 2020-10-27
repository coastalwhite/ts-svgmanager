import { V2D } from '../../helpers/V2D'
import { SVGNode } from '../../nodes/Node'
import { Component } from '../Component'
import { ComponentInstance } from '../Instance'

export class SizedComponent extends Component {
    private _shape: (size: V2D) => SVGNode

    constructor(name: string, shape: (size: V2D) => SVGNode) {
        super(name)

        this._shape = shape
    }

    public shape(instance: ComponentInstance): SVGNode {
        return this._shape(instance.size)
    }
}
