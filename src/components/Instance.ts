import { nanoid } from 'nanoid'
import { COMPONENT_SHAPE_TAG } from '../constants'
import { V2D } from '../helpers/V2D'
import { SVGManager } from '../Manager'
import { SVGLinkedNode } from '../nodes/Node'
import { svgGroup } from '../shapes/Group'
import { Id } from '../util/Id'
import { DOMDistanceToSVGDistance } from '../util/svg-coordinates/DOMToSVG'
import { setTransform } from '../util/transform'
import { Component } from './Component'

export class ComponentInstance {
    private _manager: SVGManager
    private _component: Component
    private _id: Id<ComponentInstance>
    private _container: SVGLinkedNode
    private _points: V2D[]
    private _position: V2D

    constructor(
        manager: SVGManager,
        component: Component,
        position?: V2D,
        points?: V2D[],
        containerTag?: string,
    ) {
        this._manager = manager
        this._component = component
        this._id = new Id(nanoid())

        this._points = [new V2D(0, 0)]
        const shape = component.shape(this)

        const container = svgGroup(svgGroup(shape).tag(COMPONENT_SHAPE_TAG))

        if (containerTag === undefined)
            this._container = manager.render(container)
        else
            this._container = manager.tagged(containerTag)[0]?.render(container)

        if (points === undefined)
            this._container
                .tagged(COMPONENT_SHAPE_TAG)
                .forEach((shapeContainer) => {
                    const bb = shapeContainer.element.getBoundingClientRect()
                    this._points = [
                        new V2D(bb.width, bb.height).apply((x) =>
                            DOMDistanceToSVGDistance(x, manager),
                        ),
                    ]
                })
        else this._points = points

        this._position = position || new V2D(0, 0)

        this.component.utils.forEach((util) =>
            util.applyTo(this._manager, this),
        )

        this.update()
    }

    public get component(): Component {
        return this._component
    }

    public get id(): Id<ComponentInstance> {
        return this._id
    }

    public get container(): SVGLinkedNode {
        return this._container
    }

    public get size(): V2D {
        if (this.points.length === 0) return new V2D(0, 0)
        if (this.points.length === 1) return this.points[0]

        let min = new V2D(0, 0)
        let max = new V2D(0, 0)

        this.points.forEach((point) => {
            min = new V2D(Math.min(point.x, min.x), Math.min(point.y, min.y))
            max = new V2D(Math.max(point.x, max.x), Math.max(point.y, max.y))
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
        const factors = s.times(currentSize.apply((x) => 1 / x))

        this.points = this.points.map((p) => p.times(factors))
        this.update()
    }

    public get points(): V2D[] {
        return this._points.map((v) => v.clone())
    }

    public set points(ps: V2D[]) {
        this._points = ps.map((v) => v.clone())
        this.update()
    }

    public get position(): V2D {
        return this._position
    }

    public set position(p: V2D) {
        this._position = p
        this.update()
    }

    public relativePoint(point: V2D): V2D {
        let p = point

        this.component.utils.forEach(
            (util) => (p = util.transformRelativePoints(this, p)),
        )

        return p
    }

    public update(): void {
        this._container
            .tagged(COMPONENT_SHAPE_TAG)
            .forEach((shapeContainter) => {
                shapeContainter.removeChildren()
                shapeContainter.render(this.component.shape(this))
            })

        setTransform(
            this.container,
            'translate',
            this.position.x,
            this.position.y,
        )

        this.component.utils.forEach((util) => util.update(this._manager, this))
    }
}
