import { SVGManager } from '../..'
import { SVGGroup, SVGNode } from '../../nodes'
import { svgRect } from '../../shapes'
import { alternatively } from '../../util/alternatively'
import { ComponentInstance } from '../Instance'
import { ComponentUtil } from '../Utility'

export interface HightlightUtilSettings {
    color: string
    strokeWidth: number
    strokeOpacity: number
}

export default class HightlightUtil extends ComponentUtil {
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
        this.container(instance)?.styleSet('visibility', 'hidden')
    }

    private show(instance: ComponentInstance): void {
        this.container(instance)?.styleSet('visibility', 'visible')
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
            this.currentlyHandling.forEach((i) => this.hide(i))
            this.startHandling(instance)
            this.show(instance)
        }
    }

    public useInit(manager: SVGManager): void {
        document.addEventListener('mousedown', () => {
            this.currentlyHandling.forEach((i) => this.hide(i))
            this.stopHandlingAll()
        })
    }

    public applyTo(manager: SVGManager, instance: ComponentInstance): void {
        instance.container.render(
            this.createContainer(this.shape(instance)).styleSet(
                'visibility',
                'hidden',
            ),
        )

        instance.container.on('mousedown', this.mouseDown(instance).bind(this))
    }

    public update(manager: SVGManager, instance: ComponentInstance): void {
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
