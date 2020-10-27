import { V2D } from '../../helpers/V2D'
import { SVGManager } from '../../Manager'
import { SVGNode } from '../../nodes/Node'
import { svgCircle } from '../../shapes/Circle'
import { alternatively } from '../../util/alternatively'
import { componentUtilRequirement } from '../../util/requirements'
import { getTransform, setTransform } from '../../util/transform'
import { ComponentEventedUtil } from '../EventedUtil'
import { ComponentInstance } from '../Instance'
import { HightlightUtil } from './Hightlight'

export const rotating = (settings?: Partial<RotateUtilSettings>): RotateUtil =>
    new RotateUtil(settings)

export interface RotateUtilSettings {
    rotateAmount: number
    doRotateClockwise: boolean
    doRotateCounterClockwise: boolean
    showButtons: boolean
}

export type RotateUtilEventName =
    | 'rotateClockwise'
    | 'rotateCounterClockwise'
    | 'rotate'

export class RotateUtil extends ComponentEventedUtil<
    RotateUtilEventName,
    (
        instance: ComponentInstance,
        oldRotation: number,
        newRotation: number,
    ) => void
> {
    protected readonly UTIL_IDENTIFIER = 'component-rotate'
    protected readonly requirements = [
        componentUtilRequirement(() => new HightlightUtil()),
    ]

    public settings: RotateUtilSettings

    constructor(settings?: Partial<RotateUtilSettings>) {
        super()

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            rotateAmount: alternatively(givenSettings.rotateAmount, 90),
            doRotateClockwise: alternatively(
                givenSettings.doRotateClockwise,
                true,
            ),
            doRotateCounterClockwise: alternatively(
                givenSettings.doRotateCounterClockwise,
                true,
            ),
            showButtons: alternatively(givenSettings.showButtons, false),
        }
    }

    private getRotation(instance: ComponentInstance): number {
        return getTransform(instance.container, 'rotate')[0] || 0
    }

    private setRotation(instance: ComponentInstance, rotation: number): void {
        setTransform(instance.container, 'rotate', rotation)
    }

    private clickTurn(instance: ComponentInstance, clockwise: boolean): void {
        const oldRotation = this.getRotation(instance)
        const newRotation =
            this.getRotation(instance) +
            (clockwise ? 1 : -1) * this.settings.rotateAmount

        this.setRotation(instance, newRotation)

        this.trigger('rotate', instance, oldRotation, newRotation)

        this.trigger(
            clockwise ? 'rotateClockwise' : 'rotateCounterClockwise',
            instance,
            oldRotation,
            newRotation,
        )
    }

    public transformRelativePoints(
        instance: ComponentInstance,
        point: V2D,
    ): V2D {
        const rotation = this.getRotation(instance)
        return new V2D(
            Math.cos(rotation) * point.x,
            Math.sin(rotation) * point.y,
        )
    }

    public useInit(): void {
        return
    }

    public applyTo(_manager: SVGManager, instance: ComponentInstance): void {
        this.required('component-hightlight')
            .container(instance)
            ?.append(
                this.createContainer(
                    ...turnButtons(instance, this.clickTurn.bind(this)),
                ),
            )
    }

    public update(_manager: SVGManager, instance: ComponentInstance): void {
        instance.container
            .tagged(this.UTIL_IDENTIFIER)
            .forEach((c) => c.element.remove())

        this.required('component-hightlight')
            .container(instance)
            ?.append(
                this.createContainer(
                    ...turnButtons(instance, this.clickTurn.bind(this)),
                ),
            )
    }
}

/**
 * Create a resize-indicator SVGNode for a certain node towards a direction
 * @param node Node to create the indicator for
 * @param direction Direction for the indictor
 * @param editor A DiagramEditor in which the Node is rendered
 */
function turnButton(
    instance: ComponentInstance,
    xOffset: number,
    xSign: number,
    yOffset: number,
    ySign: number,
    click: (instance: ComponentInstance) => void,
): SVGNode {
    return svgCircle(
        3,
        instance.size
            .times(new V2D(xSign, ySign))
            .add(new V2D(xOffset, yOffset)),
    )
        .on('mouseup', () => {
            click(instance)
        })
        .on('mousedown', (e: Event) => {
            e.stopPropagation()
        })
        .fill('lightgreen')
        .set('pointer-events', 'all')
        .set('cursor', 'pointer')
}

function turnButtons(
    instance: ComponentInstance,
    clickIndictor: (instance: ComponentInstance, clockwise: boolean) => void,
): SVGNode[] {
    return [
        turnButton(instance, -2, -1, -5, -1, (instance) =>
            clickIndictor(instance, false),
        ),
        turnButton(instance, 2, 1, -5, -1, (instance) =>
            clickIndictor(instance, true),
        ),
    ]
}
