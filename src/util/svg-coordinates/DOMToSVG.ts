import { SVGManager } from '@/Manager'
import { V2D } from '@/helpers/V2D'
import { getViewBoxRatio } from '@/manager-utils/util'

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
