import { SVGAttribute } from '../declarations/Attributes'

/** @hidden type for value of attributes */
export interface AttributeValue {
    toString(): string
}

/** @hidden type for SVGNode.attributes */
export type AttributeMap = Map<SVGAttribute, AttributeValue>

/** @hidden type for value of attributes */
export interface StyleValue {
    toString(): string
}

export type StyleProperty = string

/** @hidden type for SVGNode.attributes */
export type StyleMap = Map<StyleProperty, StyleValue>
