import { SVGManager } from '../..'
import { SVGLinkedNode } from '../../nodes'
import Component from '../Component'

export type ComponentInstanceId = string & { isComponentInstanceId: boolean }

export abstract class ComponentAction {
    private _currentlyHandling: ComponentInstanceId[]

    private _name: ComponentActionName
    protected _settings: ComponentActionSettings

    constructor(name: ComponentActionName, settings: ComponentActionSettings) {
        this._name = name
        this._settings = settings
        this._currentlyHandling = []
    }

    public get name(): ComponentActionName {
        return this._name
    }

    protected abstract getSetting(
        setting: ComponentActionSettingsProperty,
    ): string

    public abstract update(
        container: SVGLinkedNode,
        component: Component,
        manager: SVGManager,
    ): void

    protected startHandling(id: ComponentInstanceId): void {
        this._currentlyHandling.push(id)
    }

    protected stopHandling(id: ComponentInstanceId): void {
        this._currentlyHandling = this._currentlyHandling.filter(
            (item) => item !== id,
        )
    }

    protected stopHandlingAll(): void {
        this._currentlyHandling = []
    }

    protected isHandling(id: ComponentInstanceId): boolean {
        return this._currentlyHandling.includes(id)
    }

    protected get currentlyHandling(): ComponentInstanceId[] {
        return this._currentlyHandling
    }

    public abstract applyTo(
        id: string,
        container: SVGLinkedNode,
        component: Component,
        manager: SVGManager,
    ): void
}

export type ComponentActionSpecifier =
    | { action: 'move'; settings?: MoveActionSettings }
    | { action: 'resize'; settings?: ResizeActionSettings }
    | { action: 'rotate' }

export type ComponentActionName = 'move' | 'resize' | 'rotate'

export type ComponentActionSettingsProperty = keyof ComponentActionSettings

export interface MoveActionSettings {
    hoverCursor?: string
    activeCursor?: string
}

export interface ResizeActionSettings {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
}

export interface ComponentActionSettings
    extends ResizeActionSettings,
        MoveActionSettings {}
