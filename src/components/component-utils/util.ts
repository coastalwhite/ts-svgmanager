import Id from '../../util/Id'
import { ComponentUtil } from '../Utility'

export function utilRequirement(
    construct: () => ComponentUtil,
): { id: Id<ComponentUtil>; construct: () => ComponentUtil } {
    return {
        id: construct().id,
        construct,
    }
}
