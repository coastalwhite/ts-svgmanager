import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import { DOMVectorToSVGVector } from '../../util/svg-coordinates/DOMToSVG'
import { SVGNode } from '../../nodes'
import { svgRect } from '../../shapes'
import { alternatively } from '../../util/alternatively'
import limit from '../../util/limit'
import { ComponentInstance } from '../Instance'
import { ComponentUtil } from '../Utility'
import HightlightUtil from './Hightlight'
import { utilRequirement } from './util'

export interface ResizeUtilSettings {
    minWidth: number
    minHeight: number
    maxWidth: number | null
    maxHeight: number | null
}

export default class ResizeUtil extends ComponentUtil {
    protected readonly UTIL_IDENTIFIER = 'component-resize'
    protected readonly requirements = [
        utilRequirement(() => new HightlightUtil()),
    ]

    public settings: ResizeUtilSettings

    private _direction: ResizeDirection
    private _initialPosition: V2D

    constructor(settings?: Partial<ResizeUtilSettings>) {
        super()

        this._direction = 0
        this._initialPosition = new V2D(0, 0)

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            minWidth: alternatively(givenSettings.minWidth, 5),
            minHeight: alternatively(givenSettings.minHeight, 5),
            maxWidth: alternatively(givenSettings.maxWidth, null),
            maxHeight: alternatively(givenSettings.maxHeight, null),
        }
    }

    private clickIndictor(
        instance: ComponentInstance,
        direction: ResizeDirection,
        initial: V2D,
    ): void {
        this.startHandling(instance)
        this._initialPosition = initial
        this._direction = direction
    }

    private resize(event: MouseEvent, manager: SVGManager): void {
        this.currentlyHandling.forEach((instance) => {
            const eventPosition = DOMVectorToSVGVector(
                new V2D(event.clientX, event.clientY),
                manager,
            )

            resizeInstance(
                instance,
                eventPosition.sub(this._initialPosition),
                this._direction,
                this.settings.minWidth,
                this.settings.maxWidth || Infinity,
                this.settings.minHeight,
                this.settings.maxHeight || Infinity,
            )

            instance.update()

            this._initialPosition = eventPosition
        })
    }

    public useInit(manager: SVGManager): void {
        manager.on('mousemove', (e: Event) =>
            this.resize(e as MouseEvent, manager),
        )

        document.addEventListener('mouseup', this.stopHandlingAll.bind(this))
        document.addEventListener('mouseleave', this.stopHandlingAll.bind(this))
    }

    public applyTo(manager: SVGManager, instance: ComponentInstance): void {
        this.required('component-hightlight')
            .container(instance)
            ?.render(
                this.createContainer(
                    ...resizeIndicators(
                        manager,
                        instance,
                        this.clickIndictor.bind(this),
                    ),
                ),
            )
    }

    public update(manager: SVGManager, instance: ComponentInstance): void {
        instance.container
            .tagged(this.UTIL_IDENTIFIER)
            .forEach((c) => c.element.remove())

        this.required('component-hightlight')
            .container(instance)
            ?.render(
                this.createContainer(
                    ...resizeIndicators(
                        manager,
                        instance,
                        this.clickIndictor.bind(this),
                    ),
                ),
            )
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

export function resizeInstance(
    instance: ComponentInstance,
    by: V2D,
    direction: ResizeDirection,
    minWidth: number,
    maxWidth: number,
    minHeight: number,
    maxHeight: number,
): void {
    // Fetches which direction we should be moving into for both x and y
    const signs = directionToSigns(direction)

    // Calculate the new size of the node
    const calculatedSize = instance.size.add(
        new V2D(by.x * signs.x, by.y * signs.y),
    )

    // Adjust fo the Limits
    const adjustedSize = new V2D(
        limit(calculatedSize.x, minWidth, maxWidth),
        limit(calculatedSize.y, minHeight, maxHeight),
    )

    // Calculate the position delta
    const calculatedPositionDelta = adjustedSize.sub(instance.size).sca(1 / 2)

    // Adjust for signs of direction
    const adjustedPositionDelta = new V2D(
        calculatedPositionDelta.x * signs.x,
        calculatedPositionDelta.y * signs.y,
    )

    // Mutate the size
    instance.size = adjustedSize

    // Mutate the position
    instance.position = instance.position.add(adjustedPositionDelta)
}

/**
 * Create a resize-indicator SVGNode for a certain node towards a direction
 * @param node Node to create the indicator for
 * @param direction Direction for the indictor
 * @param editor A DiagramEditor in which the Node is rendered
 */
function resizeIndicator(
    manager: SVGManager,
    instance: ComponentInstance,
    direction: ResizeDirection,
    clickIndictor: (
        instance: ComponentInstance,
        direction: ResizeDirection,
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
            clickIndictor(instance, direction, initial)
        })
        .set('cursor', indicatorTypeToCursor(direction))
        .stroke('#000', '1px')
        .fill('white')
}

function resizeIndicators(
    manager: SVGManager,
    instance: ComponentInstance,
    clickIndictor: (
        instance: ComponentInstance,
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
                instance,
                direction,
                clickIndictor,
            )

            const offset = signs.times(instance.size).sca(1 / 2)
            return indicator
                .x(parseFloat((indicator.get('x') || 0).toString()) + offset.x)
                .y(parseFloat((indicator.get('y') || 0).toString()) + offset.y)
        })
}
