import { CursorType } from '../declarations/Cursors'
import { V2D } from '../helpers/V2D'
import { SVGViewBox } from '../helpers/ViewBox'
import { SVGManager } from '../Manager'
import { alternatively } from '../util/alternatively'
import { DOMDistanceToSVGDistance } from '../util/svg-coordinates/DOMToSVG'
import ManagerEventedUtil from './EventedUtil'
import { readViewBox } from './util'

export interface PanUtilSettings {
    cursor: CursorType
    activeCursor: CursorType
}

export const panning = (settings?: Partial<PanUtilSettings>): PanUtil =>
    new PanUtil(settings)

type PanUtilEventName = 'startPan' | 'endPan' | 'panning'

export default class PanUtil extends ManagerEventedUtil<
    PanUtilEventName,
    (manager: SVGManager, startPan: SVGViewBox, endPan: SVGViewBox) => void
> {
    private _isPanning: boolean
    private _panningStart: SVGViewBox

    public settings: PanUtilSettings

    constructor(settings?: Partial<PanUtilSettings>) {
        super()
        this._isPanning = false
        this._panningStart = new SVGViewBox(0, 0, 0, 0)

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            cursor: alternatively(givenSettings.cursor, 'grab'),
            activeCursor: alternatively(givenSettings.activeCursor, 'grabbing'),
        }
    }

    private mouseMove(): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            if (this._isPanning) {
                event.preventDefault()
                const oldViewBox = this.getViewBox()
                svgPan(this.manager, new V2D(event.movementX, event.movementY))
                const newViewBox = this.getViewBox()

                this.trigger('panning', oldViewBox, newViewBox)

                this.manager.updateUtils()
            }
        }
    }

    private getViewBox(): SVGViewBox {
        const viewBox = this.manager.get('viewBox')

        if (viewBox === undefined) return new SVGViewBox(0, 0, 0, 0)

        return SVGViewBox.parse(viewBox.toString())
    }

    private mouseDown(): void {
        const viewBox = this.getViewBox()

        this.trigger('startPan', this.manager, viewBox, viewBox)
        this._panningStart = viewBox
        this._isPanning = true
        this.manager.style('cursor', this.settings.activeCursor)
    }

    private mouseUp(): void {
        this.trigger(
            'startPan',
            this.manager,
            this._panningStart,
            this.getViewBox(),
        )

        this._isPanning = false
        this.manager.style('cursor', this.settings.cursor)
    }

    public useInit(): void {
        this.manager.on('mousemove', (e) => this.mouseMove()(e as MouseEvent))
        this.manager.on('mousedown', this.mouseDown.bind(this))
        this.manager.on('mouseup', this.mouseUp.bind(this))
        this.manager.style('cursor', this.settings.cursor)
    }

    public update(): void {
        return
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
