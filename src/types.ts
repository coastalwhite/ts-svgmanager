export abstract class ManagerAction {
    private _name: ManagerActionName
    protected _settings: ManagerActionSettings

    constructor(name: ManagerActionName, settings: ManagerActionSettings) {
        this._name = name
        this._settings = settings
    }

    public get name(): ManagerActionName {
        return this._name
    }

    protected abstract getSetting(
        setting: ManagerActionSettingsProperty,
    ): string
}

export type ManagerActionSpecifier =
    | { action: 'panning'; settings?: PanningActionSettings }
    | { action: 'zooming'; settings?: ZoomingActionSettings }
    | { action: 'bg-pattern'; settings?: BGPatternActionSettings }

export interface GeneralManagerActionSpecifier {
    action: ManagerActionName
    settings?: ManagerActionSettings
}

export type ManagerActionName = 'panning' | 'zooming' | 'bg-pattern'

type CursorType = 'pointer' | 'grab' | 'grabbing'

export type BGPatternType = 'dotted' | 'grid' | 'rows' | 'columns'
export type ManagerActionSettingsProperty = keyof ManagerActionSettings

export interface PanningActionSettings {
    cursor?: CursorType
    activeCursor?: CursorType
}

export interface ZoomingActionSettings {
    zoomConstant?: number
    zoomMinScale?: number
    zoomMaxScale?: number
}

export interface BGPatternActionSettings {
    patternType?: BGPatternType
    patternColor?: string
    patternWidth?: number
    patternHeight?: number
    patternStrokeWidth?: number
}

export interface ManagerActionSettings
    extends PanningActionSettings,
        ZoomingActionSettings,
        BGPatternActionSettings {}
