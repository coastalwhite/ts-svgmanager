import { SVGManager } from '..'
import { V2D } from '../helpers'
import { alternatively } from '../util/alternatively'
import limit from '../util/limit'
import { ManagerUtil } from '../Utility'
import { DOMVectorToSVGVector } from '../util/svg-coordinates/DOMToSVG'
import { getViewBoxScale, readViewBox } from './util'

export interface ZoomUtilSettings {
    zoomConstant: number
    zoomMinScale: number
    zoomMaxScale: number
}

export default class ZoomUtil extends ManagerUtil {
    public settings: ZoomUtilSettings

    constructor(settings?: Partial<ZoomUtilSettings>) {
        super()

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            zoomConstant: alternatively(givenSettings.zoomConstant, 0.04),
            zoomMinScale: alternatively(givenSettings.zoomMinScale, 0.1),
            zoomMaxScale: alternatively(givenSettings.zoomMaxScale, 50),
        }
    }

    private wheel(): (event: WheelEvent) => void {
        return (event: WheelEvent): void => {
            event.preventDefault()
            svgZoom(
                this.manager,
                1 - event.deltaY * this.settings.zoomConstant,
                new V2D(event.clientX, event.clientY),
                this.settings.zoomMinScale,
                this.settings.zoomMaxScale,
            )

            this.manager.updateUtils()
        }
    }

    public useInit(): void {
        this.manager.on('wheel', (e) => this.wheel()(e as WheelEvent))
    }

    public update(): void {
        return
    }
}

function svgZoom(
    manager: SVGManager,
    factor: number,
    center: V2D,
    minScale: number,
    maxScale: number,
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
