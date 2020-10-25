import { SVGManager } from '..'
import CursorType from '../declarations/Cursors'
import { V2D } from '../helpers'
import { alternatively } from '../util/alternatively'
import { ManagerUtil } from '../Utility'
import { DOMDistanceToSVGDistance } from '../util/svg-coordinates/DOMToSVG'
import { readViewBox } from './util'

export interface PanUtilSettings {
    cursor: CursorType
    activeCursor: CursorType
}

export default class PanUtil extends ManagerUtil {
    private _isPanning: boolean

    public settings: PanUtilSettings

    constructor(settings?: Partial<PanUtilSettings>) {
        super()
        this._isPanning = false

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
                svgPan(this.manager, new V2D(event.movementX, event.movementY))

                this.manager.updateUtils()
            }
        }
    }

    private mouseDown(): void {
        this._isPanning = true
        this.manager.styleSet('cursor', this.settings.activeCursor)
    }

    private mouseUp(): void {
        this._isPanning = false
        this.manager.styleSet('cursor', this.settings.cursor)
    }

    public useInit(): void {
        this.manager.on('mousemove', (e) => this.mouseMove()(e as MouseEvent))
        this.manager.on('mousedown', this.mouseDown.bind(this))
        this.manager.on('mouseup', this.mouseUp.bind(this))
        this.manager.styleSet('cursor', this.settings.cursor)
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
