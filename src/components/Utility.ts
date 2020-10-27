import { V2D } from '../helpers/V2D'
import { SVGManager } from '../Manager'
import { SVGGroup } from '../nodes/Group'
import { SVGLinkedNode, SVGNode } from '../nodes/Node'
import { svgGroup } from '../shapes/Group'
import { Id } from '../util/Id'
import { ComponentInstance } from './Instance'

export abstract class ComponentUtil {
    protected abstract readonly UTIL_IDENTIFIER: string
    protected abstract readonly requirements: {
        id: Id<ComponentUtil>
        construct: () => ComponentUtil
    }[]

    private _required: ComponentUtil[]

    private _currentlyHandling: ComponentInstance[]

    constructor() {
        this._currentlyHandling = []
        this._required = []
    }

    public get id(): Id<ComponentUtil> {
        return new Id(this.UTIL_IDENTIFIER)
    }

    public required(utilId: string): ComponentUtil {
        const req = this._required.find(
            (required) => required.id.val === utilId,
        )

        if (req === undefined) throw 'Failed to fetch requirement'

        return req
    }

    public container(instance: ComponentInstance): SVGLinkedNode | undefined {
        return instance.container.tagged(this.UTIL_IDENTIFIER)[0]
    }

    protected createContainer(...children: SVGNode[]): SVGGroup {
        return svgGroup(...children).tag(this.UTIL_IDENTIFIER)
    }

    protected startHandling(instance: ComponentInstance): void {
        this._currentlyHandling.push(instance)
    }

    protected stopHandling(instance: ComponentInstance): void {
        this._currentlyHandling = this.currentlyHandling.filter((item) =>
            item.id.equals(instance.id),
        )
    }

    protected stopHandlingAll(): void {
        this._currentlyHandling = []
    }

    protected isHandling(instance: ComponentInstance): boolean {
        return (
            this.currentlyHandling.find((item) =>
                item.id.equals(instance.id),
            ) !== undefined
        )
    }

    protected get currentlyHandling(): ComponentInstance[] {
        return this._currentlyHandling
    }

    public fetchRequirements(currentUtils: ComponentUtil[]): ComponentUtil[] {
        const needed: ComponentUtil[] = []

        this._required = this.requirements.map((requirement) => {
            const currentUtil = currentUtils.find((util) =>
                util.id.equals(requirement.id),
            )

            let util: ComponentUtil
            if (currentUtil === undefined) {
                util = requirement.construct()
                needed.push(util)
            } else util = currentUtil

            return util
        })

        return needed
    }

    public abstract transformRelativePoints(
        instance: ComponentInstance,
        point: V2D,
    ): V2D
    public abstract useInit(manager: SVGManager): void

    public abstract applyTo(
        manager: SVGManager,
        instance: ComponentInstance,
    ): void

    public abstract update(
        manager: SVGManager,
        instance: ComponentInstance,
    ): void
}
