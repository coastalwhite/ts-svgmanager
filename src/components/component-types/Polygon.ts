import { Component } from '@/components/Component'
import { V2D } from '@/helpers/V2D'
import { SVGNode } from '@/nodes/Node'
import { ComponentInstance } from '@/components/Instance'
import { svgGroup } from '@/shapes/Group'

export class PolygonComponent extends Component {
    private _shape: (points: V2D[]) => SVGNode

    constructor(name: string, shape: (points: V2D[]) => SVGNode) {
        super(name)

        this._shape = shape
    }

    public shape(instance: ComponentInstance): SVGNode {
        return svgGroup(this._shape(instance.points)).set(
            'transform',
            `translate(${-instance.size.x / 2},${-instance.size.y / 2})`,
        )
    }
}
