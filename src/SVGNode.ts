import { Md5 } from 'ts-md5/dist/md5'
import { SVGManager } from '.'
import {
    EventDefinition,
    EventFunc,
    SVGAttribute,
    SVGEvent,
    SVGTag,
} from './definitions'
import SVGAnimate from './helpers/Animate'
import { SVGManagerDefinition } from './SVGManager'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

export interface AttributeValue {
    toString(): string
}
export type AttributeMap = Map<SVGAttribute, AttributeValue>

/**
 * A JS Representation of a HTML-Node.
 * More specifically, all the SVG Types Nodes.
 */
export default class SVGNode {
    protected _tagName: SVGTag
    protected _attributes: AttributeMap
    protected _children: SVGNode[]
    protected _innerText: string

    protected _events: EventDefinition[]

    protected _names: string[]
    protected _tags: string[]

    /**
     * Construct a SVGNode respresenting the *tag* element
     * with no attributes, children or inner text.
     */
    public constructor(tagName: SVGTag) {
        this._tagName = tagName
        this._attributes = new Map()
        this._children = []
        this._innerText = ''

        this._events = []

        this._names = []
        this._tags = []
    }

    public get children(): SVGNode[] {
        return this._children
    }

    public get attributes(): AttributeMap {
        return this._attributes
    }

    public get tagName(): SVGTag {
        return this._tagName
    }

    public get innerText(): string {
        return this._innerText
    }

    public text(s: string): this {
        this._innerText = s
        return this
    }

    public get events(): EventDefinition[] {
        return this._events
    }

    public get names(): string[] {
        return this._names
    }

    public get tags(): string[] {
        return this._tags
    }

    public stroke(
        color: AttributeValue,
        width?: AttributeValue,
        opacity?: AttributeValue,
    ): this {
        this.set('stroke', color)

        if (width !== undefined) this.set('stroke-width', width)
        if (opacity !== undefined) this.set('stroke-opacity', opacity)

        return this
    }

    public strokeDef(
        definition: SVGManagerDefinition,
        width?: AttributeValue,
        opacity?: AttributeValue,
    ): this {
        return this.stroke('url(#' + definition + ')', width, opacity)
    }

    public fill(color: AttributeValue, opacity?: AttributeValue): this {
        this.set('fill', color)

        if (opacity !== undefined) this.set('fill-opacity', opacity)

        return this
    }

    public fillDef(
        definition: SVGManagerDefinition,
        opacity?: AttributeValue,
    ): this {
        return this.fill('url(#' + definition + ')', opacity)
    }

    public x(val: AttributeValue): this {
        return this.set('x', val)
    }

    public y(val: AttributeValue): this {
        return this.set('y', val)
    }

    public cx(val: AttributeValue): this {
        return this.set('cx', val)
    }

    public cy(val: AttributeValue): this {
        return this.set('cy', val)
    }

    public r(radius: AttributeValue): this {
        return this.set('r', radius)
    }

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * The id attribute is used within SVG Manager and will therefore most likely be overwritten.
     */
    public set(attr: SVGAttribute, value: AttributeValue): this {
        this._attributes.set(attr, value)

        return this
    }

    public get(attr: SVGAttribute): AttributeValue | undefined {
        return this._attributes.get(attr)
    }

    /**
     * Mutates the SVGNode to change an attribute *attr*
     * by putting its value through the function *f*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * If the attribute was not set, the call still succeeds but does nothing.
     */
    public map(
        attr: SVGAttribute,
        f: (_value: AttributeValue) => AttributeValue,
    ): SVGNode {
        const value = this.get(attr)
        if (value === undefined) return this

        this.set(attr, f(value))

        return this
    }

    /**
     * Mutates the SVGNode to append an child SVGNode *child*
     * to the children of the current SVGNode.
     * Then, it returns itself, for easy programming.
     */
    public append(child: SVGNode): this {
        this._children.push(child)

        return this
    }

    /**
     * Mutates the SVGNode to add an event.
     * Multiple functions can be set for the same event.
     * Then, it returns itself, for easy programming.
     */
    public on(eventType: SVGEvent, func: EventFunc): this {
        this._events.push({ eventType, func })

        return this
    }

    /**
     * Give name to the SVGNode to mention later
     * @param name Name given to SVGNode
     */
    public name(name: string): this {
        this._names.push(name)

        return this
    }

    /**
     * Give tag to the SVGNode to mention later
     * @param tag Tag given to SVGNode
     */
    public tag(tag: string): this {
        this._tags.push(tag)

        return this
    }

    public class(className: string): this {
        let currentClass = (this.get('class') || '').toString()
        if (currentClass.length > 0) currentClass += ' '

        this.set('class', currentClass + className)

        return this
    }

    public copy(): SVGNode {
        const node = new SVGNode(this.tagName)
        this.attributes.forEach((value, key) => node.set(key, value))
        this.children.forEach((child) => node.append(child.copy()))
        this.names.forEach((name) => node.name(name))
        this.tags.forEach((tag) => node.tag(tag))
        this.events.forEach((event) => node.on(event.eventType, event.func))
        node.text(this.innerText)

        return node
    }

    public equals(node: SVGNode): boolean {
        return (
            this.shallowEquals(node) &&
            this.areNamesEqual(node.names) &&
            this.areTagsEqual(node.tags)
        )
    }

    private areNamesEqual(names: string[]): boolean {
        if (this.names.length !== names.length) return false

        let sortedThisArray = this.names.sort((a, b) =>
            a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0,
        )
        let sortedNodeArray = names.sort((a, b) =>
            a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0,
        )

        while (sortedThisArray.length !== 0) {
            if (sortedThisArray[0] !== sortedNodeArray[0]) return false
            sortedThisArray = sortedThisArray.slice(1)
            sortedNodeArray = sortedNodeArray.slice(1)
        }

        return true
    }

    private areTagsEqual(tags: string[]): boolean {
        if (this.tags.length !== tags.length) return false

        let sortedThisArray = this.tags.sort((a, b) =>
            a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0,
        )
        let sortedNodeArray = tags.sort((a, b) =>
            a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0,
        )

        while (sortedThisArray.length !== 0) {
            if (sortedThisArray[0] !== sortedNodeArray[0]) return false
            sortedThisArray = sortedThisArray.slice(1)
            sortedNodeArray = sortedNodeArray.slice(1)
        }

        return true
    }

    private areAttributeMapsEqual(attrMap: AttributeMap): boolean {
        const thisArray = Array.from(this.attributes).map(([attr, value]) => [
            attr,
            value.toString(),
        ])
        const nodeArray = Array.from(attrMap).map(([attr, value]) => [
            attr,
            value.toString(),
        ])

        if (thisArray.length !== nodeArray.length) return false

        const sortedThisArray = thisArray.sort((a, b) =>
            a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0,
        )
        const sortedNodeArray = nodeArray.sort((a, b) =>
            a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0,
        )

        while (sortedThisArray.length !== 0) {
            const thisPop = sortedThisArray.pop()
            const nodePop = sortedNodeArray.pop()

            if (!(thisPop[0] === nodePop[0] && thisPop[1] === nodePop[1]))
                return false
        }

        return true
    }

    private areChildrenEqual(children: SVGNode[]): boolean {
        if (this.children.length !== children.length) return false

        return this.children.every((child, index) =>
            child.equals(children[index]),
        )
    }

    public shallowEquals(node: SVGNode): boolean {
        return (
            this.tagName === node.tagName &&
            this.innerText === node.innerText &&
            this.areAttributeMapsEqual(node.attributes) &&
            this.areChildrenEqual(node.children)
        )
    }

    public removeChild(index: number): this {
        if (index >= this.children.length || index < 0)
            throw 'removeChild: index out of range'

        this._children = [
            ...this._children.slice(0, index),
            ...this._children.slice(index + 1),
        ]

        return this
    }

    public removeChildren(): this {
        this._children = []

        return this
    }

    public clearEvents(eventType?: SVGEvent): this {
        if (eventType === undefined) this._events = []
        else
            this._events = this.events.filter(
                ({ eventType: eType }) => eType !== eventType,
            )

        return this
    }

    public animate(svganimate: SVGAnimate): this {
        this.append(svganimate)
        return this
    }

    /**
     * Returns the JS SVGElement equavalent of current SVGNode
     */
    public toHTML(): SVGElement {
        const element = document.createElementNS(SVG_NAMESPACE, this.tagName)

        this.attributes.forEach((value, attr) => {
            element.setAttribute(attr, value.toString())
        })

        element.innerHTML = this.innerText

        this.children.forEach((child) => element.appendChild(child.toHTML()))

        return element
    }

    /**
     * Returns the hashstring of SVGNode
     */
    public toHash(): string {
        const md5 = new Md5()

        md5.appendStr('tag' + this.tagName)
        md5.appendStr('innertext' + this.innerText)

        Array.from(this.attributes)
            .map(([value, key]) => `${key} - ${value}`)
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((attributeString) => {
                md5.appendStr('attribute' + attributeString)
            })

        this.children
            .map((child) => child.toHash())
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((childHash) => md5.appendStr('child' + childHash))

        this.names
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((name) => {
                md5.appendStr('name' + name)
            })

        this.tags
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((tag) => {
                md5.appendStr('tag' + tag)
            })

        return md5.end() as string
    }
}

export class SVGLinkedNode extends SVGNode {
    private _element: SVGElement
    private _manager: SVGManager

    public constructor(element: SVGElement, manager: SVGManager) {
        super(element.tagName as SVGTag)

        this._names = manager.getNamesFromElem(element)
        this._tags = manager.getTagsFromElem(element)

        this._element = element
        this._manager = manager
    }

    public get children() {
        return Array.from(this._element.children).map(
            (el) => new SVGLinkedNode(el as SVGElement, this._manager),
        )
    }

    public get attributes(): AttributeMap {
        return new Map(
            Array.from(this._element.attributes).map((attr: Attr) => [
                attr.name as SVGAttribute,
                attr.value as AttributeValue,
            ]),
        )
    }

    public get tagName(): SVGTag {
        return this._element.tagName as SVGTag
    }

    public get innerText(): string {
        return this._element.textContent
    }

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * The id attribute is used within SVG Manager and will therefore most likely be overwritten.
     */
    public set(attr: SVGAttribute, value: AttributeValue): this {
        this._element.setAttribute(attr, value.toString())

        return this
    }

    public get(attr: SVGAttribute): AttributeValue {
        return this._element.getAttribute(attr)
    }

    public append(child: SVGNode): this {
        this._element.appendChild(child.toHTML())

        return this
    }

    public text(s: string): this {
        this._element.textContent = s
        return this
    }

    public get element(): SVGElement {
        return this._element
    }

    public on(eventType: SVGEvent, func: EventFunc): this {
        this._element.addEventListener(eventType, func)
        this._events.push({ eventType, func })

        return this
    }

    public name(name: string): this {
        this._manager.addNamesToElem(this._element, [name])
        this._names.push(name)

        return this
    }

    public tag(tag: string): this {
        this._manager.addTagsToElem(this._element, [tag])
        this._tags.push(tag)

        return this
    }

    public removeChild(index: number): this {
        this._element.removeChild(this.element.children[index])

        return this
    }

    public removeChildren(): this {
        this.element.innerHTML = this.innerText

        return this
    }

    public clearEvents(eventType?: SVGEvent): this {
        if (eventType !== undefined)
            throw 'SVGLinkedNode: Unable remove elements from certain type in Linked Nodes'

        this._events = []

        const copy = this.copy()
        this.element.parentElement.replaceChild(copy.toHTML(), this.element)

        return this
    }
}
