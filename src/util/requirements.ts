import { ComponentUtil } from '@/components/Utility'
import { Id } from '@/util/Id'

export function componentUtilRequirement(
    construct: () => ComponentUtil,
): { id: Id<ComponentUtil>; construct: () => ComponentUtil } {
    return {
        id: construct().id,
        construct,
    }
}
