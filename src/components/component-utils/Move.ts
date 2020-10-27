import { V2D } from '../../helpers/V2D'
import { SVGManager } from '../../Manager'
import { alternatively } from '../../util/alternatively'
import { DOMVectorToSVGVector } from '../../util/svg-coordinates/DOMToSVG'
import { ComponentEventedUtil } from '../EventedUtil'
import { ComponentInstance } from '../Instance'

export const moving = (settings?: Partial<MoveUtilSettings>): MoveUtil =>
    new MoveUtil(settings)

export interface MoveUtilSettings {
    hoverCursor: string
    activeCursor: string
}

export type MoveUtilEventName = 'moveStart' | 'moveEnd' | 'moving'

export class MoveUtil extends ComponentEventedUtil<
    MoveUtilEventName,
    (instance: ComponentInstance, oldPosition: V2D, newPosition: V2D) => void
> {
    protected readonly UTIL_IDENTIFIER = 'component-move'
    protected readonly requirements = []

    private _prevPosition: V2D

    public readonly settings: MoveUtilSettings

    private startPositions: {
        instance: ComponentInstance
        startPosition: V2D
    }[]

    constructor(settings?: Partial<MoveUtilSettings>) {
        super()
        this._prevPosition = new V2D(0, 0)

        this.startPositions = []

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

                const oldPosition = instance.position.clone()
                const newPosition = instance.position.add(
                    eventPosition.sub(this._prevPosition),
                )

                instance.position = newPosition
                this._prevPosition = eventPosition

                this.startPositions.forEach((startPosition) =>
                    this.trigger(
                        'moving',
                        startPosition.instance,
                        oldPosition,
                        newPosition,
                    ),
                )

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

            this.trigger(
                'moveStart',
                instance,
                instance.position.clone(),
                instance.position.clone(),
            )

            this.startPositions.push({
                instance,
                startPosition: instance.position.clone(),
            })
        }
    }

    private mouseUp(): () => void {
        return (): void => {
            this.currentlyHandling.forEach((instance) =>
                instance.container.set('cursor', this.settings.hoverCursor),
            )

            this.startPositions.forEach((startPosition) =>
                this.trigger(
                    'moveEnd',
                    startPosition.instance,
                    startPosition.startPosition,
                    startPosition.instance.position,
                ),
            )
            this.stopHandlingAll()
        }
    }

    public transformRelativePoints(
        _instance: ComponentInstance,
        point: V2D,
    ): V2D {
        return point
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
