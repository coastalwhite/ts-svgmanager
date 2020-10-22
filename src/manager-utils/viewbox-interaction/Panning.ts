import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import {
    ManagerAction,
    ManagerActionSettings,
    ManagerActionSettingsProperty,
} from '../../types'
import { alternatively } from '../../util/alternatively'
import { BGPatternAction } from '../backgrounds/BackgroundPattern'
import { DOMDistanceToSVGDistance } from '../svg-coordinates/DOMToSVG'
import { readViewBox } from './util'

export default class PanningAction extends ManagerAction {
    private _isPanning: boolean

    constructor(settings: ManagerActionSettings, manager: SVGManager) {
        super('panning', settings)
        this._isPanning = false

        manager.on('mousemove', (e) => this.mouseMove(manager)(e as MouseEvent))

        manager.on('mousedown', this.mouseDown(manager))

        manager.on('mouseup', this.mouseUp(manager))

        manager.styleSet('cursor', this.getSetting('cursor'))
    }

    protected getSetting(setting: ManagerActionSettingsProperty): string {
        switch (setting) {
            case 'cursor':
                return alternatively(this._settings[setting], 'grab')
            case 'activeCursor':
                return alternatively(this._settings[setting], 'grabbing')
        }

        return ''
    }

    private mouseMove(manager: SVGManager): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            if (this._isPanning) {
                event.preventDefault()
                svgPan(manager, new V2D(event.movementX, event.movementY))

                const backgroundAction = manager.does(
                    'bg-pattern',
                ) as BGPatternAction
                if (backgroundAction !== undefined)
                    backgroundAction.update(manager)
            }
        }
    }

    private mouseDown(manager: SVGManager): () => void {
        return (): void => {
            this._isPanning = true
            manager.styleSet('cursor', this.getSetting('activeCursor'))
        }
    }

    private mouseUp(manager: SVGManager): () => void {
        return (): void => {
            this._isPanning = false
            manager.styleSet('cursor', this.getSetting('cursor'))
        }
    }
}

function svgPan(manager: SVGManager, by: V2D): void {
    // Get current viewbox
    const viewBox = readViewBox(manager)

    // Pan the viewbox
    viewBox.move(by.apply((c) => DOMDistanceToSVGDistance(c, manager)).sca(-1))

    // Commit the new viewbox
    manager.set('viewBox', viewBox)
}
