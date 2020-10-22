import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import { getViewBoxRatio } from '../viewbox-interaction/util'

export function DOMVectorToSVGVector(DOMVector: V2D, manager: SVGManager): V2D {
    const boundingBox = manager.element.getBoundingClientRect()
    const adjustedPosition = DOMVector.sub(
        new V2D(boundingBox.left, boundingBox.top),
    )

    return adjustedPosition.sca(getViewBoxRatio(manager))
}

export function DOMDistanceToSVGDistance(
    distance: number,
    manager: SVGManager,
): number {
    return distance * getViewBoxRatio(manager)
}
