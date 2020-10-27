import { TAG_PREFIX } from '../constants'

/** @hidden */
export function getTagsFromClasses(classNames: string): string[] {
    return classNames
        .split(' ')
        .filter((className) => className.startsWith(TAG_PREFIX))
        .map((name) => name.substr(TAG_PREFIX.length))
}

/** @hidden */
export function toTagClass(tag: string): string {
    return TAG_PREFIX + tag
}
