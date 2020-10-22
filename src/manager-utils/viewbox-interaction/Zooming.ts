import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import {
    ManagerAction,
    ManagerActionSettings,
    ManagerActionSettingsProperty,
} from '../../types'
import { alternatively } from '../../util/alternatively'
import limit from '../../util/limit'
import { BGPatternAction } from '../backgrounds/BackgroundPattern'
import { DOMVectorToSVGVector } from '../svg-coordinates/DOMToSVG'
import { getViewBoxScale, readViewBox } from './util'

export class ZoomingAction extends ManagerAction {
    constructor(settings: ManagerActionSettings, manager: SVGManager) {
        super('zooming', settings)

        manager.on('wheel', (e) => this.wheel(manager)(e as WheelEvent))
    }

    protected getSetting(setting: ManagerActionSettingsProperty): string {
        switch (setting) {
            case 'zoomConstant':
                return alternatively(this._settings[setting], 0.04).toString()
            case 'zoomMinScale':
                return alternatively(this._settings[setting], 1).toString()
            case 'zoomMaxScale':
                return alternatively(this._settings[setting], 10).toString()
        }

        return ''
    }

    private wheel(manager: SVGManager): (event: WheelEvent) => void {
        return (event: WheelEvent): void => {
            event.preventDefault()
            svgZoom(
                manager,
                1 - event.deltaY * parseFloat(this.getSetting('zoomConstant')),
                new V2D(event.clientX, event.clientY),
                parseFloat(this.getSetting('zoomMinScale')),
                parseFloat(this.getSetting('zoomMaxScale')),
            )

            const backgroundAction = manager.does(
                'bg-pattern',
            ) as BGPatternAction
            if (backgroundAction !== undefined) backgroundAction.update(manager)
        }
    }
}

function svgZoom(
    manager: SVGManager,
    factor: number,
    center: V2D,
    minScale = 0,
    maxScale = Infinity,
): void {
    if (factor <= 0) throw 'zooming factor needs to be more than 0'
    if (minScale > maxScale) throw 'minScale cannot be larger than maxScale'

    if (getViewBoxScale(manager) === 0) return

    const adjustedCenter = DOMVectorToSVGVector(center, manager)

    factor = limit(
        factor,
        minScale / getViewBoxScale(manager),
        maxScale / getViewBoxScale(manager),
    )

    const viewBox = readViewBox(manager)
    viewBox.move(adjustedCenter.sca(1 - 1 / factor))
    viewBox.setDimensions(viewBox.getDimension().sca(1 / factor))
    manager.set('viewBox', viewBox)
}
