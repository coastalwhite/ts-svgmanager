import { Md5 } from 'ts-md5/dist/md5'
import { SVGManagerDefinition } from '.'
import { SVGAttribute, SVGTag } from './definitions'
import {
    SVGManagerEventHandler,
    SVGEventName,
    SVGManagerEventDefinition,
} from './Events'
import SVGAnimate from './helpers/Animate'

/** @hidden Namespace used to create SVG elements */
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

/** @hidden type for value of attributes */
export interface AttributeValue {
    toString(): string
}

/** @hidden type for SVGNode.attributes */
export type AttributeMap = Map<SVGAttribute, AttributeValue>

/**
 * A JS Representation of a HTML-Node.
 * More specifically, all the SVG Types Nodes.
 *
 * ## Usage
 * ```ts
 * import { SVGNode } from 'ts-svgmanager'
 *
 * // Initialize a circle with args
 * const circle = new SVGNode('circle').r(5).cx(10).cy(20)
 * ```
 *
 * ## Important methods
 * ### [[SVGNode.set]] and [[SVGNode.get]]
 * Lets you set and get attributes, respectively
 *
 * ### [[SVGNode.append]]
 * Will let you append a childnode
 *
 * ### [[SVGNode.tag]]
 * Allows you to add a tag for later reference from the [[SVGManager]]
 *
 * ### [[SVGNode.on]]
 * Creates a event listener on the node
 *
 * ### [[SVGNode.text]]
 * Which allows you to set the innerText
 */
export default class SVGNode {
    /** @hidden */
    protected _tagName: SVGTag
    /** @hidden */
    protected _attributes: AttributeMap
    /** @hidden */
    protected _children: SVGNode[]
    /** @hidden */
    protected _innerText: string

    /** @hidden */
    protected _events: SVGManagerEventDefinition[]

    /** @hidden */
    protected _tags: string[]

    /**
     * Construct a SVGNode respresenting the *tagName* element
     * with no attributes, children or inner text.
     *
     * @param tagName created node tagName
     */
    public constructor(tagName: SVGTag) {
        this._tagName = tagName
        this._attributes = new Map()
        this._children = []
        this._innerText = ''

        this._events = []

        this._tags = []
    }

    /** Fetch the current children */
    public get children(): SVGNode[] {
        return this._children
    }

    /** Fetch the current attributes */
    public get attributes(): AttributeMap {
        return this._attributes
    }

    /** Fetch the tagName of the node */
    public get tagName(): SVGTag {
        return this._tagName
    }

    /** Fetch the innerText of the node */
    public get innerText(): string {
        return this._innerText
    }

    /** Fetch the events defined on the node */
    public get events(): SVGManagerEventDefinition[] {
        return this._events
    }

    /** Fetch the tags set on the node */
    public get tags(): string[] {
        return this._tags
    }

    /** Sets the innerText of the node */
    public text(s: string): this {
        this._innerText = s
        return this
    }

    /** Shortcut for setting stroke attributes */
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

    /** Shortcut for setting stroke attributes to a definition (See more at [[SVGManager.define]]) */
    public strokeDef(
        definition: SVGManagerDefinition,
        width?: AttributeValue,
        opacity?: AttributeValue,
    ): this {
        return this.stroke('url(#' + definition + ')', width, opacity)
    }

    /** Shortcut for setting fill attributes */
    public fill(color: AttributeValue, opacity?: AttributeValue): this {
        this.set('fill', color)

        if (opacity !== undefined) this.set('fill-opacity', opacity)

        return this
    }

    /** Shortcut for setting fill attributes to a definition (See more at [[SVGManager.define]]) */
    public fillDef(
        definition: SVGManagerDefinition,
        opacity?: AttributeValue,
    ): this {
        return this.fill('url(#' + definition + ')', opacity)
    }

    /** Setter for the x attribute */
    public x(val: AttributeValue): this {
        return this.set('x', val)
    }

    /** Setter for the y attribute */
    public y(val: AttributeValue): this {
        return this.set('y', val)
    }

    /** Setter for the cx attribute */
    public cx(val: AttributeValue): this {
        return this.set('cx', val)
    }

    /** Setter for the cy attribute */
    public cy(val: AttributeValue): this {
        return this.set('cy', val)
    }

    /** Setter for the r attribute */
    public r(radius: AttributeValue): this {
        return this.set('r', radius)
    }

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     */
    public set(attr: SVGAttribute, value: AttributeValue): this {
        this._attributes.set(attr, value)

        return this
    }

    /** Fetch a specific attribute's value */
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
    public on(eventName: SVGEventName, func: SVGManagerEventHandler): this {
        this._events.push({ eventName, func })

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

    /** Adds a class to a SVGNode */
    public class(className: string): this {
        let currentClass = (this.get('class') || '').toString()
        if (currentClass.length > 0) currentClass += ' '

        this.set('class', currentClass + className)

        return this
    }

    /** Creates a deepcopy from current SVGNode */
    public copy(): SVGNode {
        const node = new SVGNode(this.tagName)
        this.attributes.forEach((value, key) => node.set(key, value))
        this.children.forEach((child) => node.append(child.copy()))
        this.tags.forEach((tag) => node.tag(tag))
        this.events.forEach((event) => node.on(event.eventName, event.func))
        node.text(this.innerText)

        return node
    }

    /** Checks deeply whether two nodes are equal */
    public equals(node: SVGNode): boolean {
        return (
            this.shallowEquals(node) &&
            this.areTagsEqual(node.tags) &&
            this.areChildrenEqual(node.children)
        )
    }

    /** @hidden */
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

    /** @hidden */
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

            if (thisPop === undefined || nodePop === undefined) return false

            if (!(thisPop[0] === nodePop[0] && thisPop[1] === nodePop[1]))
                return false
        }

        return true
    }

    /** @hidden */
    private areChildrenEqual(children: SVGNode[]): boolean {
        if (this.children.length !== children.length) return false

        return this.children.every((child, index) =>
            child.equals(children[index]),
        )
    }

    /** Checks shallowly whether two nodes are equal */
    public shallowEquals(node: SVGNode): boolean {
        return (
            this.tagName === node.tagName &&
            this.innerText === node.innerText &&
            this.areAttributeMapsEqual(node.attributes)
        )
    }

    /** Remove child at certain index */
    public removeChild(index: number): this {
        if (index >= this.children.length || index < 0)
            throw 'removeChild: index out of range'

        this._children = [
            ...this._children.slice(0, index),
            ...this._children.slice(index + 1),
        ]

        return this
    }

    /** Remove all children */
    public removeChildren(): this {
        this._children = []

        return this
    }

    /** Remove either all events from 1 SVGEventName, or all if not given a name */
    public clearEvents(eventName?: SVGEventName): this {
        if (eventName === undefined) this._events = []
        else
            this._events = this.events.filter(
                ({ eventName: evName }) => evName !== eventName,
            )

        return this
    }

    /** Animates the node using an SVGAnimate object */
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

        // Group all events together by type
        const groupedEvents = this.events.reduce((r, a) => {
            r[a.eventName] = r[a.eventName] || []
            r[a.eventName].push(a)
            return r
        }, Object.create(null))

        // Add all event listeners to the HTML elements
        Object.keys(groupedEvents).forEach((svgEvent) =>
            element.addEventListener(svgEvent, (e) => {
                groupedEvents[svgEvent].forEach(
                    (eventCall: SVGManagerEventDefinition) => {
                        eventCall.func(e, new SVGLinkedNode(element))
                    },
                )
            }),
        )

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

        this.tags
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((tag) => {
                md5.appendStr('tag' + tag)
            })

        return md5.end() as string
    }
}

/** Shortcut for creating a `use` SVGNode for a certain SVGManagerDefinition */
export class SVGUse extends SVGNode {
    public constructor(definition: SVGManagerDefinition) {
        super('use')
        this.set('href', '#' + definition)
    }
}

/** @hidden */
export const TAG_PREFIX = 'tag-'

/**
 * @hidden
 */
type SVGManagerTag = string & { isSvgManagerTag: true }

/**
 * A SVGNode linked/attached to a DOM element,
 * which will therefore instantly apply any changes to the DOM,
 * and fetch up to date properties of the SVGNode
 */
export class SVGLinkedNode extends SVGNode {
    /** @hidden */
    protected _element: SVGElement | null

    /** @hidden */
    protected static getTagsFromClasses(classNames: string): string[] {
        return classNames
            .split(' ')
            .filter((className) => className.startsWith(TAG_PREFIX))
            .map((name) => name.substr(TAG_PREFIX.length))
    }

    /** @hidden */
    protected static addTagsToNode(node: SVGNode): SVGNode {
        node.children.forEach((child) => this.addTagsToNode(child))

        if (node.tags.length === 0) return node

        const classNames = (node.get('class') || '').toString()
        const nodeTags = this.getTagsFromClasses(classNames)
        const classNamesMinusTags = classNames
            .split(' ')
            .filter((className) => nodeTags.includes(className))

        node.tags.forEach((tag) => {
            classNamesMinusTags.push(this.toTagClass(tag))
        })

        if (classNamesMinusTags.length !== 0)
            node.set('class', classNamesMinusTags.join(' '))

        return node
    }

    /** @hidden */
    protected static toTagClass(tag: string): SVGManagerTag {
        return (TAG_PREFIX + tag) as SVGManagerTag
    }

    /** Construct a SVGLinkedNode using a DOM element */
    public constructor(element: SVGElement) {
        super(element.tagName as SVGTag)

        this._tags = SVGLinkedNode.getTagsFromClasses(
            element.getAttribute('class') || '',
        )

        this._element = element
    }

    public get children(): SVGLinkedNode[] {
        return Array.from(this.element.children).map(
            (el) => new SVGLinkedNode(el as SVGElement),
        )
    }

    public get attributes(): AttributeMap {
        return new Map(
            Array.from(this.element.attributes).map((attr: Attr) => [
                attr.name as SVGAttribute,
                attr.value as AttributeValue,
            ]),
        )
    }

    public get tagName(): SVGTag {
        return this.element.tagName as SVGTag
    }

    public get innerText(): string {
        return this.element.textContent || ''
    }

    public set(attr: SVGAttribute, value: AttributeValue): this {
        this.element.setAttribute(attr, value.toString())

        return this
    }

    public get(attr: SVGAttribute): AttributeValue | undefined {
        return this.element.getAttribute(attr) || undefined
    }

    public append(child: SVGNode): this {
        this.element.appendChild(child.toHTML())

        return this
    }

    public text(s: string): this {
        this.element.textContent = s
        return this
    }

    public on(eventName: SVGEventName, func: SVGManagerEventHandler): this {
        this.element.addEventListener(eventName, (ev) => {
            func(ev, new SVGLinkedNode(this.element))
        })
        this._events.push({ eventName, func })

        return this
    }

    public tag(tag: string): this {
        this._tags.push(tag)
        SVGLinkedNode.addTagsToNode(this)

        return this
    }

    public removeChild(index: number): this {
        this.element.removeChild(this.element.children[index])

        return this
    }

    public removeChildren(): this {
        this.element.innerHTML = this.innerText

        return this
    }

    public tagged(tag: string): SVGLinkedNode[] {
        return Array.from(
            this.element.getElementsByClassName(SVGLinkedNode.toTagClass(tag)),
        ).map((el) => new SVGLinkedNode(el as SVGElement))
    }

    public clearEvents(eventName?: SVGEventName): this {
        if (eventName !== undefined)
            throw 'SVGLinkedNode: Unable remove elements from certain type in Linked Nodes'

        this._events = []

        this.element.replaceWith(this.element.cloneNode(true))

        return this
    }

    /** Fetch the raw element on the DOM */
    public get element(): SVGElement {
        if (this._element === null) throw 'SVGLinkedNode: Element is destructed'

        return this._element
    }

    /** Will remove the element from the DOM and deactivate this variable */
    public destruct(): void {
        this.element.remove()
        this._element = null
    }
}
