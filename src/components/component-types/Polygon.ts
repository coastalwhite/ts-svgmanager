import { V2D } from '../../helpers/V2D'
import { SVGNode } from '../../nodes/Node'
import { svgGroup } from '../../shapes/Group'
import { Component } from '../Component'
import { ComponentInstance } from '../Instance'

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
