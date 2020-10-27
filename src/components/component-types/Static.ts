import { SVGNode } from '../..'
import { Component } from '@/components/Component'

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
