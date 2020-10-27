import { UtilEventHandlers } from '../types/EventedUtils'
import { ManagerUtil } from '../Utility'

export default abstract class ManagerEventedUtil<
    N extends string,
    H
> extends ManagerUtil {
    private _events: UtilEventHandlers<H>

    constructor() {
        super()
        this._events = {}
    }

    public on(eventName: N, handler: H): this {
        if (this._events[eventName] === undefined) this._events[eventName] = []

        this._events[eventName].push(handler)

        return this
    }

    protected trigger(eventName: N, ...args: unknown[]): void {
        this._events[eventName]?.forEach((handler) =>
            ((handler as unknown) as (...args: unknown[]) => void)(...args),
        )
    }
}
