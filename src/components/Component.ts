import { v4 as uuidv4 } from 'uuid'
import { SVGManager } from '..'
import { V2D } from '../helpers'
import { DOMVectorToSVGVector } from '../manager-utils/svg-coordinates/DOMToSVG'
import { SVGGroup, SVGLinkedNode, SVGNode } from '../nodes'
import { svgGroup } from '../shapes'
import {
    ComponentAction,
    ComponentActionName,
    ComponentInstanceId,
} from './component-actions/types'
import { COMPONENT_SHAPE_TAG, COMPONENT_TAG_PREFIX } from './constants'

export default abstract class Component {
    private _name: string
    private _actions: ComponentAction[]

    constructor(name: string) {
        this._name = name
        this._actions = []
    }

    protected addAction(action: ComponentAction): void {
        this._actions.push(action)
    }

    protected getShapeContainer(container: SVGGroup): SVGGroup {
        return container.tagged(COMPONENT_SHAPE_TAG)[0]
    }

    protected createGroups(): { id: ComponentInstanceId; container: SVGGroup } {
        const id = uuidv4() as ComponentInstanceId

        const container = svgGroup(svgGroup().tag(COMPONENT_SHAPE_TAG))
            .tag(Component.toComponentTag(id))
            .set('style', 'pointer-events: all;')

        return { id, container }
    }

    protected applyActions(
        manager: SVGManager,
        id: ComponentInstanceId,
        container: SVGLinkedNode,
    ): void {
        this._actions.forEach((action) =>
            action.applyTo(id, container, this, manager),
        )
    }

    public get name(): string {
        return this._name
    }

    protected get actions(): ComponentAction[] {
        return this._actions
    }

    public size(container: SVGLinkedNode, manager: SVGManager): V2D {
        const boundingBox = container
            .tagged(COMPONENT_SHAPE_TAG)[0]
            .element.getBoundingClientRect()

        return DOMVectorToSVGVector(
            new V2D(boundingBox.width, boundingBox.height),
            manager,
        )
    }

    public position(container: SVGNode): V2D {
        const transform = container.get('transform')

        if (transform === undefined) return new V2D(0, 0)

        const trimmedAttrValue = transform.toString().trim()
        if (!trimmedAttrValue.startsWith('translate')) return new V2D(0, 0)

        const argumentString = trimmedAttrValue.substr('translate'.length)

        const translateArgs = argumentString
            .replace(/\s*/g, '')
            .match(/(?:\()([e\d.-]+)(?:,)([e\d.-]+)(?:\))/)

        if (translateArgs === null) throw 'Incorrect translate format'

        return new V2D(
            parseFloat(translateArgs[1]),
            parseFloat(translateArgs[2]),
        )
    }

    public moveTo(container: SVGNode, to: V2D): void {
        container.set('transform', `translate(${to.x},${to.y})`)
    }

    public moveBy(container: SVGNode, by: V2D): V2D {
        const newPosition = this.position(container).add(by)

        this.moveTo(container, newPosition)

        return newPosition
    }

    public does(action: ComponentActionName): ComponentAction | undefined {
        return this._actions.find((a) => a.name === action)
    }

    public static toComponentTag(id: string): string {
        return COMPONENT_TAG_PREFIX + id
    }

    public static getComponentId(
        container: SVGNode,
    ): ComponentInstanceId | null {
        return container.tags
            .filter((tag) => tag.startsWith(COMPONENT_TAG_PREFIX))
            .map((tag) =>
                tag.substr(COMPONENT_TAG_PREFIX.length),
            )[0] as ComponentInstanceId | null
    }

    public abstract instantiate(
        manager: SVGManager,
    ): { id: ComponentInstanceId; container: SVGLinkedNode }
    public abstract update(container: SVGLinkedNode, manager: SVGManager): void
}
