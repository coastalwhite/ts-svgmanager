import SVGAttribute from '../definitions/Attributes'

/** @hidden type for value of attributes */
export interface AttributeValue {
    toString(): string
}

/** @hidden type for SVGNode.attributes */
export type AttributeMap = Map<SVGAttribute, AttributeValue>

/**
 * @hidden
 */
export type SVGManagerTag = string & { isSvgManagerTag: true }
