import { SVGManager } from '../Manager'
import { SVGNode } from '../nodes/Node'
import { ComponentInstance } from './Instance'
import { ComponentUtil } from './Utility'

export abstract class Component {
    private _name: string
    private _utils: ComponentUtil[]

    constructor(name: string) {
        this._name = name
        this._utils = []
    }

    public get name(): string {
        return this._name
    }

    public get utils(): ComponentUtil[] {
        return this._utils
    }

    public utilize(...utils: ComponentUtil[]): void {
        utils.forEach((util) => {
            if (this.utils.find((u) => u.id.equals(util.id)) === undefined)
                this._utils.push(...util.fetchRequirements(this.utils), util)
        })
    }

    public utilizes(util: ComponentUtil): boolean {
        return (
            this.utils.find((componentUtil) =>
                componentUtil.id.equals(util.id),
            ) !== undefined
        )
    }

    public useInit(manager: SVGManager): void {
        this.utils.forEach((util) => util.useInit(manager))
    }
    public abstract shape(instance: ComponentInstance): SVGNode
}
