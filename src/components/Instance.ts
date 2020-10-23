import { SVGManager } from '..'
import { V2D } from '../helpers'
import { SVGLinkedNode } from '../nodes'
import Id from '../util/Id'
import Component from './Component'
import { v4 as uuidv4 } from 'uuid'
import { svgGroup } from '../shapes'
import { COMPONENT_SHAPE_TAG } from './constants'

export class ComponentInstance {
    private _manager: SVGManager
    private _component: Component
    private _id: Id<ComponentInstance>
    private _points: V2D[]
    private _position: V2D
    private _container: SVGLinkedNode

    constructor(component: Component, manager: SVGManager) {
        this._manager = manager
        this._component = component
        this._id = new Id(uuidv4())
        this._points = []
        this._position = new V2D(0, 0)

        const shape = component.shape(this)

        this._container = manager.render(
            svgGroup(svgGroup(shape).tag(COMPONENT_SHAPE_TAG))
                .tag(Component.toComponentTag(id))
                .set('style', 'pointer-events: all;'),
        )
    }

    public get component(): Component {
        return this._component
    }

    public get id(): Id<ComponentInstance> {
        return this._id
    }

    public get size(): V2D {
        if (this.points.length === 0) return new V2D(0, 0)
        if (this.points.length === 1) return this.points[0]

        let min = new V2D(0, 0)
        let max = new V2D(0, 0)

        this.points.forEach((point) => {
            min = new V2D(Math.min(point.x, min.x), Math.min(point.y, min.y))
            max = new V2D(Math.max(point.x, max.x), Math.min(point.y, max.y))
        })

        return max.sub(min)
    }

    public set size(s: V2D) {
        if (this.points.length === 0) return
        if (this.points.length === 1) {
            this._points = [s]
            return
        }

        const currentSize = this.size
        const factors = currentSize.times(s.apply((x) => 1 / x))

        this.points.map()
    }

    public get points(): V2D[] {
        return this._points
    }

    public set points(ps: V2D[]) {
        this._points = ps
        this.update()
    }

    public get position(): V2D {
        return this._position
    }

    public set position(p: V2D) {
        this._position = p
    }

    public update() {
        this.component.utilizations.forEach((utilization) =>
            utilization.update(this),
        )
    }
}
