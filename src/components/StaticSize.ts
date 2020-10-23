import { SVGManager } from '..'
import { SVGLinkedNode, SVGNode } from '../nodes'
import Component from './Component'
import { MovingAction } from './component-actions/Moving'
import {
    ComponentActionSpecifier,
    ComponentInstanceId,
} from './component-actions/types'

export default class StaticSizeComponent extends Component {
    private _shape: () => SVGNode

    constructor(name: string, shape: () => SVGNode) {
        super(name)

        this._shape = shape
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

    public instantiate(
        manager: SVGManager,
    ): { id: ComponentInstanceId; container: SVGLinkedNode } {
        const groups = this.createGroups()

        this.getShapeContainer(groups.container).append(this._shape())
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
