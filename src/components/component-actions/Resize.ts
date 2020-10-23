import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import { DOMVectorToSVGVector } from '../../manager-utils/svg-coordinates/DOMToSVG'
import { SVGLinkedNode, SVGNode } from '../../nodes'
import { svgGroup, svgRect } from '../../shapes'
import limit from '../../util/limit'
import Component from '../Component'
import ResizableComponent from '../Resizeable'
import {
    ComponentAction,
    ComponentActionSettings,
    ComponentInstanceId,
} from './types'

export class ResizeAction extends ComponentAction {
    private _direction: ResizeDirection
    private _initialPosition: V2D

    constructor(
        settings: ComponentActionSettings,
        component: ResizableComponent,
        manager: SVGManager,
    ) {
        super('move', settings)
        this._direction = 0
        this._initialPosition = new V2D(0, 0)

        manager.on('mousemove', (e: Event) =>
            this.resize(e as MouseEvent, manager, component),
        )

        document.addEventListener('mouseup', this.stopHandlingAll.bind(this))
        document.addEventListener('mouseleave', this.stopHandlingAll.bind(this))
    }

    protected getSetting(): string {
        return ''
    }

    private mouseDown(container: SVGNode): (event: Event) => void {
        return (event: Event): void => {
            event.stopPropagation()
            this.toggleResizeIndicatorsVisibility(container)
        }
    }

    private hideResizeIndicators(container: SVGNode): void {
        container
            .tagged('component-resize-indicators')
            .forEach((resizeIndicatorContainer) => {
                resizeIndicatorContainer.set('display', 'none')
            })
    }

    private toggleResizeIndicatorsVisibility(container: SVGNode): void {
        container
            .tagged('component-resize-indicators')
            .forEach((resizeIndicatorContainer) => {
                resizeIndicatorContainer.set(
                    'display',
                    resizeIndicatorContainer.get('display') === 'none'
                        ? 'auto'
                        : 'none',
                )
            })
    }

    private clickIndictor(
        id: ComponentInstanceId,
        direction: ResizeDirection,
        initial: V2D,
    ): void {
        this.startHandling(id)
        this._initialPosition = initial
        this._direction = direction
    }

    private resize(
        event: MouseEvent,
        manager: SVGManager,
        component: ResizableComponent,
    ): void {
        this.currentlyHandling.forEach((id) => {
            const eventPosition = DOMVectorToSVGVector(
                new V2D(event.clientX, event.clientY),
                manager,
            )

            resizeComponent(
                manager,
                component,
                manager.fetch(id),
                eventPosition.sub(this._initialPosition),
                this._direction,
                1,
                50,
                1,
                50,
            )

            manager.update(id)

            this._initialPosition = eventPosition
        })
    }

    public applyTo(
        id: ComponentInstanceId,
        container: SVGLinkedNode,
        component: ResizableComponent,
        manager: SVGManager,
    ): void {
        container.render(
            svgGroup(
                ...resizeIndicators(
                    manager,
                    component,
                    container,
                    id,
                    this.clickIndictor.bind(this),
                ),
            )
                .tag('component-resize-indicators')
                .set('display', 'none'),
        )

        container.on('mousedown', this.mouseDown(container).bind(this))
        document.addEventListener('mousedown', () =>
            this.hideResizeIndicators(container),
        )
    }

    public update(
        container: SVGLinkedNode,
        component: ResizableComponent,
        manager: SVGManager,
    ): void {
        const id = Component.getComponentId(container)

        if (id === null) throw 'Error!'

        container
            .tagged('component-resize-indicators')
            .forEach((resizeIndicatorContainer) => {
                resizeIndicatorContainer.removeChildren()
                resizeIndicatorContainer.append(
                    ...resizeIndicators(
                        manager,
                        component,
                        container,
                        id,
                        this.clickIndictor.bind(this),
                    ),
                )
            })
    }
}

export enum ResizeDirection {
    TopLeft = 0,
    Top = 1,
    TopRight = 2,
    Left = 3,
    Right = 5,
    BottomLeft = 6,
    Bottom = 7,
    BottomRight = 8,
}

function indicatorTypeToCursor(direction: ResizeDirection): string {
    switch (direction) {
        case ResizeDirection.Left:
        case ResizeDirection.Right:
            return 'ew-resize'
        case ResizeDirection.Top:
        case ResizeDirection.Bottom:
            return 'ns-resize'
        case ResizeDirection.TopLeft:
        case ResizeDirection.BottomRight:
            return 'nwse-resize'
        case ResizeDirection.TopRight:
        case ResizeDirection.BottomLeft:
            return 'nesw-resize'
    }
}

function directionToSigns(direction: ResizeDirection): V2D {
    return new V2D((direction % 3) - 1, Math.floor(direction / 3) - 1)
}

export function resizeComponent(
    manager: SVGManager,
    component: ResizableComponent,
    container: SVGLinkedNode,
    by: V2D,
    direction: ResizeDirection,
    minWidth: number,
    maxWidth: number,
    minHeight: number,
    maxHeight: number,
): void {
    // Fetches which direction we should be moving into for both x and y
    const signs = directionToSigns(direction)

    const instanceSize = component.size(container, manager)

    // Calculate the new size of the node
    const calculatedSize = instanceSize.add(
        new V2D(by.x * signs.x, by.y * signs.y),
    )

    // Adjust fo the Limits
    const adjustedSize = new V2D(
        limit(calculatedSize.x, minWidth, maxWidth),
        limit(calculatedSize.y, minHeight, maxHeight),
    )

    console.log('adjustedSize: ' + JSON.stringify(adjustedSize))
    console.log('size: ' + JSON.stringify(instanceSize))

    // Calculate the position delta
    const calculatedPositionDelta = adjustedSize.sub(instanceSize).sca(1 / 2)

    // Adjust for signs of direction
    const adjustedPositionDelta = new V2D(
        calculatedPositionDelta.x * signs.x,
        calculatedPositionDelta.y * signs.y,
    )

    // Mutate the size
    component.resize(container, adjustedSize)

    // Mutate the position
    component.moveBy(container, adjustedPositionDelta)
}

/**
 * Create a resize-indicator SVGNode for a certain node towards a direction
 * @param node Node to create the indicator for
 * @param direction Direction for the indictor
 * @param editor A DiagramEditor in which the Node is rendered
 */
function resizeIndicator(
    manager: SVGManager,
    id: ComponentInstanceId,
    direction: ResizeDirection,
    clickIndictor: (
        id: ComponentInstanceId,
        dir: ResizeDirection,
        initial: V2D,
    ) => void,
): SVGNode {
    return svgRect(new V2D(-1, -1), new V2D(2, 2))
        .on('mousedown', (event: Event) => {
            const mouseEvent = event as MouseEvent
            mouseEvent.stopPropagation()
            const initial = DOMVectorToSVGVector(
                new V2D(mouseEvent.clientX, mouseEvent.clientY),
                manager,
            )
            clickIndictor(id, direction, initial)
        })
        .set('cursor', indicatorTypeToCursor(direction))
        .stroke('#000', '1px')
        .fill('white')
}

function resizeIndicators(
    manager: SVGManager,
    component: ResizableComponent,
    container: SVGLinkedNode,
    id: ComponentInstanceId,
    clickIndictor: (
        id: ComponentInstanceId,
        dir: ResizeDirection,
        initial: V2D,
    ) => void,
): SVGNode[] {
    return [...Array(9).keys()]
        .filter((x) => x !== 4)
        .map((direction) => {
            const signs = directionToSigns(direction)

            const indicator = resizeIndicator(
                manager,
                id,
                direction,
                clickIndictor,
            )

            const offset = signs
                .times(component.size(container, manager))
                .sca(1 / 2)
            return indicator
                .x(parseFloat((indicator.get('x') || 0).toString()) + offset.x)
                .y(parseFloat((indicator.get('y') || 0).toString()) + offset.y)
        })
}
