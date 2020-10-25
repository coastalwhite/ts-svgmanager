import { SVGManager } from '../..'
import { V2D } from '../../helpers'
import { getViewBoxScale } from '../../manager-utils/util'

export function SVGVectorToDOMVector(SVGVector: V2D, manager: SVGManager): V2D {
    const adjustedPosition = SVGVector.sca(getViewBoxScale(manager))

    const boundingBox = manager.element.getBoundingClientRect()
    return adjustedPosition.add(new V2D(boundingBox.left, boundingBox.top))
}

export function SVGDistanceToDOMDistance(
    distance: number,
    manager: SVGManager,
): number {
    return distance * getViewBoxScale(manager)
}
