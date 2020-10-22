import { Md5 } from 'ts-md5/dist/md5'
import { AttributeMap, AttributeValue, SVGLinkedNode } from '.'
import { SVGManagerDefinition } from '..'
import { SVG_NAMESPACE } from '../constants'
import {
    SVGTagName,
    SVGManagerEventDefinition,
    SVGAttribute,
    SVGEventName,
    SVGManagerEventHandler,
} from '../declarations'
import SVGAnimate from '../helpers/Animate'

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
    public get tagName(): SVGTagName {
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

    /** Removes tag from node, if it does not exist it does nothing. */
    public untag(tag: string): this {
        this._tags = this._tags.filter((t) => t !== tag)
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
