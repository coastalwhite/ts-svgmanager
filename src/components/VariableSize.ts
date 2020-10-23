import { SVGNode, SVGManager } from '..'
import { V2D } from '../helpers'
import { SVGLinkedNode } from '../nodes'
import { MovingAction } from './component-actions/Moving'
import { ResizeAction } from './component-actions/Resize'
import {
    ComponentActionSpecifier,
    ComponentInstanceId,
} from './component-actions/types'
import ResizableComponent from './Resizeable'

export default class VariableSizeComponent extends ResizableComponent {
    private _shape: (size: V2D) => SVGNode
    private _defaultSize: V2D

    constructor(name: string, shape: (size: V2D) => SVGNode, defaultSize: V2D) {
        super(name)

        this._shape = shape
        this._defaultSize = defaultSize
    }

    protected activateAction(
        specifier: ComponentActionSpecifier,
        manager: SVGManager,
    ): void {
        if (this.does(specifier.action) !== undefined) throw 'Cannot redefine'

        switch (specifier.action) {
            case 'move':
                this.addAction(new MovingAction({}, this, manager))
                break
            case 'resize':
                this.addAction(new ResizeAction({}, this, manager))
                break
        }
    }

    public do(
        manager: SVGManager,
        ...actionSpecifiers: ComponentActionSpecifier[]
    ): this {
        actionSpecifiers
            .filter((specifier) => this.does(specifier.action) === undefined)
            .forEach((specifier) => this.activateAction(specifier, manager))
        return this
    }

    public resize(container: SVGNode, to: V2D): void {
        const shapeContainer = this.getShapeContainer(container)

        shapeContainer.removeChildren()
        shapeContainer.append(this._shape(to))
    }

    public instantiate(
        manager: SVGManager,
    ): { id: ComponentInstanceId; container: SVGLinkedNode } {
        const groups = this.createGroups()

        this.getShapeContainer(groups.container).append(
            this._shape(this._defaultSize),
        )
        const container = manager.render(groups.container)

        this.applyActions(manager, groups.id, container)

        this.update(container, manager)

        return { id: groups.id, container }
    }

    public update(container: SVGLinkedNode, manager: SVGManager): void {
        this.actions.forEach((action) =>
            action.update(container, this, manager),
        )
    }
}
