import { V2D } from '@/helpers/V2D'
import { Component } from '@/components/Component'
import { SVGNode } from '@/nodes/Node'
import { ComponentInstance } from '@/components/Instance'

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
