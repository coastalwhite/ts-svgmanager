import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import { DOMVectorToSVGVector } from '../../util/svg-coordinates/DOMToSVG'
import { alternatively } from '../../util/alternatively'
import { ComponentInstance } from '../Instance'
import { ComponentUtil } from '../Utility'

export interface MoveUtilSettings {
    hoverCursor: string
    activeCursor: string
}

export default class MovingUtil extends ComponentUtil {
    protected readonly UTIL_IDENTIFIER = 'component-move'
    protected readonly requirements = []

    private _prevPosition: V2D

    public readonly settings: MoveUtilSettings

    constructor(settings?: Partial<MoveUtilSettings>) {
        super()
        this._prevPosition = new V2D(0, 0)

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            hoverCursor: alternatively(givenSettings.hoverCursor, 'pointer'),
            activeCursor: alternatively(givenSettings.activeCursor, 'grabbing'),
        }
    }

    private mouseMove(manager: SVGManager): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            this.currentlyHandling.forEach((instance) => {
                const eventPosition = DOMVectorToSVGVector(
                    new V2D(event.clientX, event.clientY),
                    manager,
                )

                instance.position = instance.position.add(
                    eventPosition.sub(this._prevPosition),
                )
                this._prevPosition = eventPosition

                instance.update()
            })
        }
    }

    private mouseDown(
        manager: SVGManager,
        instance: ComponentInstance,
    ): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            event.stopPropagation()

            this._prevPosition = DOMVectorToSVGVector(
                new V2D(event.clientX, event.clientY),
                manager,
            )

            instance.container.set('cursor', this.settings.activeCursor)
            this.startHandling(instance)
        }
    }

    private mouseUp(): () => void {
        return (): void => {
            this.currentlyHandling.forEach((instance) =>
                instance.container.set('cursor', this.settings.hoverCursor),
            )

            this.stopHandlingAll()
        }
    }

    public useInit(manager: SVGManager): void {
        manager.on('mousemove', (e) => this.mouseMove(manager)(e as MouseEvent))

        document.addEventListener('mouseup', this.mouseUp())
    }

    public applyTo(manager: SVGManager, instance: ComponentInstance): void {
        instance.container.on('mousedown', (e) =>
            this.mouseDown(manager, instance)(e as MouseEvent),
        )

        instance.container.set('cursor', this.settings.hoverCursor)
    }

    public update(): void {
        return
    }
}
