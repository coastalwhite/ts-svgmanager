import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import { DOMVectorToSVGVector } from '../../manager-utils/svg-coordinates/DOMToSVG'
import { SVGNode } from '../../nodes'
import Component from '../Component'
import {
    ComponentAction,
    ComponentActionSettings,
    ComponentInstanceId,
} from './types'

export class MovingAction extends ComponentAction {
    private _prevPosition: V2D

    constructor(
        settings: ComponentActionSettings,
        component: Component,
        manager: SVGManager,
    ) {
        super('move', settings)
        this._prevPosition = new V2D(0, 0)

        manager.on('mousemove', (e) =>
            this.mouseMove(component, manager)(e as MouseEvent),
        )

        document.addEventListener('mouseup', this.mouseUp())
    }

    protected getSetting(): string {
        return ''
    }

    private mouseMove(
        component: Component,
        manager: SVGManager,
    ): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            this.currentlyHandling.forEach((id) => {
                const eventPosition = DOMVectorToSVGVector(
                    new V2D(event.clientX, event.clientY),
                    manager,
                )

                const container = manager.fetch(id)

                component.moveBy(
                    container,
                    eventPosition.sub(this._prevPosition),
                )
                this._prevPosition = eventPosition

                component.update(container, manager)
            })
        }
    }

    private mouseDown(
        id: ComponentInstanceId,
        manager: SVGManager,
    ): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            event.stopPropagation()

            this._prevPosition = DOMVectorToSVGVector(
                new V2D(event.clientX, event.clientY),
                manager,
            )
            this.startHandling(id)
        }
    }

    private mouseUp(): () => void {
        return (): void => {
            this.stopHandlingAll()
        }
    }

    public update(): void {
        return
    }

    public applyTo(
        id: ComponentInstanceId,
        container: SVGNode,
        component: Component,
        manager: SVGManager,
    ): void {
        container.on('mousedown', (e) =>
            this.mouseDown(id, manager)(e as MouseEvent),
        )

        container.set('cursor', 'pointer')
    }
}
