import { SVG_NAMESPACE, TAG_PREFIX } from '../constants'
import { SVGAttribute } from '../declarations/Attributes'
import { SVGEventName } from '../declarations/Events'
import { SVGTagName } from '../declarations/TagNames'
import { SVGAnimate } from '../helpers/Animate'
import {
    SVGManagerEventDefinition,
    SVGManagerEventHandler,
} from '../types/EventHandlers'
import { Id } from '../util/Id'
import {
    AttributeMap,
    StyleMap,
    AttributeValue,
    StyleProperty,
    StyleValue,
    SVGManagerTag,
} from './types'

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
export class SVGNode {
    /** @hidden */
    protected _tagName: SVGTagName
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

    /** @hidden */
    protected _styles: StyleMap

    /**
     * Construct a SVGNode respresenting the *tagName* element
     * with no attributes, children or inner text.
     *
     * @param tagName created node tagName
     */
    public constructor(tagName: SVGTagName) {
        this._tagName = tagName
        this._attributes = new Map()
        this._children = []
        this._innerText = ''

        this._events = []

        this._tags = []

        this._styles = new Map()
    }

    // ---- Getters ----

    /** Fetch the tagName of the node */
    public get tagName(): SVGTagName {
        return this._tagName
    }

    /** Fetch the current attributes */
    public get attributes(): AttributeMap {
        return this._attributes
    }

    /** Fetch the current children */
    public get children(): SVGNode[] {
        return this._children
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

    public get styles(): StyleMap {
        return this._styles
    }

    // ---- InnerText Mutation ----

    /** Sets the innerText of the node */
    public text(s: string): this {
        this._innerText = s
        return this
    }

    // ---- Attribute mutation ----

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     */
    public set(attr: SVGAttribute, value: AttributeValue): this {
        this._attributes.set(attr, value)

        return this
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

    /** Fetch a specific attribute's value */
    public get(attr: SVGAttribute): AttributeValue | undefined {
        return this._attributes.get(attr)
    }

    // ---- Children mutation ----

    /**
     * Mutates the SVGNode to append an child SVGNode *child*
     * to the children of the current SVGNode.
     * Then, it returns itself, for easy programming.
     */
    public append(...children: SVGNode[]): this {
        this._children.push(...children)

        return this
    }

    public prepend(...children: SVGNode[]): this {
        this._children.unshift(...children)

        return this
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

    /** Animates the node using an SVGAnimate object */
    public animate(svgAnimate: SVGAnimate): this {
        this.append(svgAnimate)
        return this
    }

    // ---- Event Mutation ----

    /**
     * Mutates the SVGNode to add an event.
     * Multiple functions can be set for the same event.
     * Then, it returns itself, for easy programming.
     */
    public on(eventName: SVGEventName, func: SVGManagerEventHandler): this {
        this._events.push({ eventName, func })

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

    // ---- Tags Mutation ----

    /**
     * Give tag to the SVGNode to mention later
     * @param tag Tag given to SVGNode
     */
    public tag(tag: string): this {
        this._tags.push(tag)

        return this
    }

    /** Removes tag from node, if it does not exist it does nothing. */
    public untag(tag: string): this {
        this._tags = this._tags.filter((t) => t !== tag)
        return this
    }

    // ---- Styles Mutation ----

    public styleSet(property: StyleProperty, value: StyleValue): this {
        this._styles.set(property, value)
        return this
    }

    public styleGet(property: StyleProperty): StyleValue | undefined {
        return this._styles.get(property)
    }

    // ---- Extra attribute setters ----

    /** Adds a class to a SVGNode */
    public class(className: string): this {
        let currentClass = (this.get('class') || '').toString()
        if (currentClass.length > 0) currentClass += ' '

        this.set('class', currentClass + className)

        return this
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
        definition: Id<SVGNode>,
        width?: AttributeValue,
        opacity?: AttributeValue,
    ): this {
        return this.stroke('url(#' + definition.val + ')', width, opacity)
    }

    /** Shortcut for setting fill attributes */
    public fill(color: AttributeValue, opacity?: AttributeValue): this {
        this.set('fill', color)

        if (opacity !== undefined) this.set('fill-opacity', opacity)

        return this
    }

    /** Shortcut for setting fill attributes to a definition (See more at [[SVGManager.define]]) */
    public fillDef(definition: Id<SVGNode>, opacity?: AttributeValue): this {
        return this.fill('url(#' + definition.val + ')', opacity)
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

    // ---- Control Methods ----

    /** Creates a deepcopy from current SVGNode */
    public copy(): SVGNode {
        const node = new SVGNode(this.tagName)

        this.attributes.forEach((value, key) => node.set(key, value))
        this.children.forEach((child) => node.append(child.copy()))
        this.tags.forEach((tag) => node.tag(tag))
        this.events.forEach((event) => node.on(event.eventName, event.func))
        this.styles.forEach((value, key) => node.styleSet(key, value))
        node.text(this.innerText)

        return node
    }

    /** Checks deeply whether two nodes are equal */
    public deepEquals(node: SVGNode): boolean {
        return (
            this.equals(node) &&
            this.areTagsEqual(node.tags) &&
            this.areChildrenEqual(node.children)
        )
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

    public tagged(tag: string): SVGNode[] {
        const taggedItems = ([] as SVGNode[]).concat(
            ...this.children.map((child) => child.tagged(tag)),
        )

        if (this.tags.includes(tag)) taggedItems.push(this)

        return taggedItems
    }

    /** Checks shallowly whether two nodes are equal */
    public equals(node: SVGNode): boolean {
        return (
            this.tagName === node.tagName &&
            this.innerText === node.innerText &&
            this.areAttributeMapsEqual(node.attributes)
        )
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

        this.styles.forEach((value, property) =>
            element.style.setProperty(property, value.toString()),
        )

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
}

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
        super(element.tagName as SVGTagName)

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

    public get tagName(): SVGTagName {
        return this.element.tagName as SVGTagName
    }

    public get innerText(): string {
        if (this.element.firstChild === null) return ''

        if (this.element.firstChild.nodeValue === null) return ''

        return this.element.firstChild.nodeValue
    }

    public get styles(): StyleMap {
        const styleMap = new Map()

        const styleDeclaration = this.element.style

        for (let i = 0; i < styleDeclaration.length; i++) {
            const property = styleDeclaration.item(i)
            styleMap.set(property, styleDeclaration.getPropertyValue(property))
        }

        return styleMap
    }

    public set(attr: SVGAttribute, value: AttributeValue): this {
        this.element.setAttribute(attr, value.toString())

        return this
    }

    public get(attr: SVGAttribute): AttributeValue | undefined {
        return this.element.getAttribute(attr) || undefined
    }

    public append(...children: SVGNode[]): this {
        children.forEach((child) => this.element.appendChild(child.toHTML()))

        return this
    }

    public prepend(...children: SVGNode[]): this {
        this.element.prepend(...children.map((child) => child.toHTML()))

        return this
    }

    // ---- Styles Mutation ----

    public styleSet(property: StyleProperty, value: StyleValue): this {
        this.element.style.setProperty(property, value.toString())
        return this
    }

    public styleGet(property: StyleProperty): StyleValue | undefined {
        return this.element.style.getPropertyValue(property)
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

    /** Removes tag from node, if it does not exist it does nothing. */
    public untag(tag: string): this {
        this._tags = this._tags.filter((t) => t !== tag)
        this.element.classList.remove(SVGLinkedNode.toTagClass(tag))

        return this
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     */
    public render(node: SVGNode): SVGLinkedNode {
        this.append(SVGLinkedNode.addTagsToNode(node.copy()))

        const lastChild = this.element.lastChild

        if (lastChild === null) throw 'appending failed'

        return new SVGLinkedNode(lastChild as SVGElement)
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     */
    public renderBefore(node: SVGNode): SVGLinkedNode {
        this.prepend(SVGLinkedNode.addTagsToNode(node.copy()))

        const firstChild = this.element.firstChild

        if (firstChild === null) throw 'prepending failed'

        return new SVGLinkedNode(firstChild as SVGElement)
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
