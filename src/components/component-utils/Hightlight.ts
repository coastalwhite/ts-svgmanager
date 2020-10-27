import { V2D } from '../../helpers/V2D'
import { SVGManager } from '../../Manager'
import { SVGGroup } from '../../nodes/Group'
import { SVGNode } from '../../nodes/Node'
import { svgRect } from '../../shapes/Rectangle'
import { alternatively } from '../../util/alternatively'
import { ComponentEventedUtil } from '../EventedUtil'
import { ComponentInstance } from '../Instance'

export const hightlighting = (
    settings?: Partial<HightlightUtilSettings>,
): HightlightUtil => new HightlightUtil(settings)

export interface HightlightUtilSettings {
    color: string
    strokeWidth: number
    strokeOpacity: number
}

export type HightlightUtilEventName =
    | 'startHightlight'
    | 'stopHightlight'
    | 'toggleHightlight'

export class HightlightUtil extends ComponentEventedUtil<
    HightlightUtilEventName,
    (instance: ComponentInstance, wasHighlighting: boolean) => void
> {
    protected readonly UTIL_IDENTIFIER = 'component-hightlight'
    protected readonly requirements = []

    public settings: HightlightUtilSettings

    constructor(settings?: Partial<HightlightUtilSettings>) {
        super()

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            color: alternatively(givenSettings.color, '#53A2BE'),
            strokeWidth: alternatively(givenSettings.strokeWidth, 0.5),
            strokeOpacity: alternatively(givenSettings.strokeOpacity, 0.5),
        }
    }

    private hide(instance: ComponentInstance): void {
        this.container(instance)?.style('visibility', 'hidden')
    }

    private show(instance: ComponentInstance): void {
        this.container(instance)?.style('visibility', 'visible')
    }

    private shape(instance: ComponentInstance): SVGNode {
        return hightlightShape(
            instance,
            this.settings.color,
            this.settings.strokeWidth,
            this.settings.strokeOpacity,
        )
    }

    private mouseDown(instance: ComponentInstance): (event: Event) => void {
        return (event: Event): void => {
            event.stopPropagation()
            if (!this.isHandling(instance))
                this.trigger('startHightlight', instance, false)

            this.currentlyHandling.forEach((i) => {
                this.hide(i)
                this.trigger('stopHightlight', i, true)
            })
            this.startHandling(instance)
            this.show(instance)
        }
    }

    public transformRelativePoints(
        _instance: ComponentInstance,
        point: V2D,
    ): V2D {
        return point
    }

    public useInit(): void {
        document.addEventListener('mousedown', () => {
            this.currentlyHandling.forEach((instance) => {
                this.hide(instance)
                this.trigger('stopHightlight', instance, true)
            })
            this.stopHandlingAll()
        })
    }

    public applyTo(_manager: SVGManager, instance: ComponentInstance): void {
        instance.container.append(
            this.createContainer(this.shape(instance)).style(
                'visibility',
                'hidden',
            ),
        )

        instance.container.on('mousedown', this.mouseDown(instance).bind(this))
    }

    public update(_manager: SVGManager, instance: ComponentInstance): void {
        const container = this.container(instance)

        container?.removeChildren()
        container?.append(this.shape(instance))
    }
}

function hightlightShape(
    instance: ComponentInstance,
    color: string,
    strokeWidth: number,
    strokeOpacity: number,
): SVGGroup {
    return svgRect(instance.size.sca(-1 / 2), instance.size)
        .fill('transparent')
        .stroke(color, strokeWidth, strokeOpacity)
}
