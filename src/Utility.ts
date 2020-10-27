import { nanoid } from 'nanoid'
import { Id } from '@/util/Id'
import { SVGManager } from '@/Manager'

export abstract class ManagerUtil {
    private _id: Id<ManagerUtil>
    private _manager: SVGManager | null

    constructor() {
        this._id = new Id<ManagerUtil>(nanoid())
        this._manager = null
    }

    public get id(): Id<ManagerUtil> {
        return this._id
    }

    public get manager(): SVGManager {
        if (this._manager === null) {
            throw 'ManagerUtil: Not yet applied to a SVGManager'
        }

        return this._manager
    }

    public applyTo(manager: SVGManager): void {
        this._manager = manager
    }

    public abstract useInit(): void
    public abstract update(): void
}
