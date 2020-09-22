import { Md5 } from 'ts-md5/dist/md5'
import { V2D } from '.'
import {
    EventDefinition,
    EventFunc,
    SVGAttr,
    SVGEvent,
    SVGTag,
} from './definitions'
import SVGAnimate from './helpers/Animate'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

type AttributeValue = string | number
export { AttributeValue }

/**
 * A JS Representation of a HTML-Node.
 * More specifically, all the SVG Types Nodes.
 */
export default class SVGNode {
    private _tag: SVGTag
    private _attributes: Map<SVGAttr, AttributeValue>
    private _children: SVGNode[]
    private _innerText: string
    private _events: EventDefinition[]
    private _names: string[]
    private _tags: string[]

    /**
     * Construct a SVGNode respresenting the *tag* element
     * with no attributes, children or inner text.
     */
    public constructor(tag: SVGTag) {
        this._tag = tag
        this._attributes = new Map()
        this._children = []
        this._innerText = ''
        this._events = []
        this._names = []
        this._tags = []
    }

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * The id attribute is used within SVG Manager and will therefore most likely be overwritten.
     */
    public set(attr: SVGAttr, value: AttributeValue): SVGNode {
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
        attr: SVGAttr,
        f: (_value: AttributeValue) => AttributeValue,
    ): SVGNode {
        const value = this._attributes.get(attr)
        if (value === undefined) return this

        this._attributes.set(attr, f(value))

        return this
    }

    /**
     * Mutates the SVGNode to append an child SVGNode *child*
     * to the children of the current SVGNode.
     * Then, it returns itself, for easy programming.
     */
    public append(child: SVGNode): SVGNode {
        this._children.push(child)

        return this
    }

    /**
     * Mutates the SVGNode to add an event.
     * Multiple functions can be set for the same event.
     * Then, it returns itself, for easy programming.
     */
    public addEvent(event: SVGEvent, func: EventFunc): SVGNode {
        this._events.push({ eventType: event, func })

        return this
    }

    /**
     * Mutates the SVGNode to set the inner text to *text*.
     * Then, it returns itself, for easy programming.
     */
    public setText(text: string): SVGNode {
        this._innerText = text

        return this
    }

    /**
     * Fetch events given to the node
     */
    public getEvents(): EventDefinition[] {
        return this._events
    }

    /**
     * Give name to the SVGNode to mention later
     * @param name Name given to SVGNode
     */
    public name(name: string): SVGNode {
        this._names.push(name)

        return this
    }

    /**
     * Give tag to the SVGNode to mention later
     * @param tag Tag given to SVGNode
     */
    public tag(tag: string): SVGNode {
        this._tags.push(tag)

        return this
    }

    /**
     * Return all names given to the SVGNode
     */
    public getNames(): string[] {
        return this._names
    }

    /**
     * Return all tags given to SVGNode
     */
    public getTags(): string[] {
        return this._tags
    }

    /**
     * Returns all children
     */
    public getChildren(): SVGNode[] {
        return this._children
    }

    public animate(svganimate: SVGAnimate): SVGNode {
        this.append(svganimate.toNode())
        return this
    }

    /**
     * Set the X and Y attributes of the node
     * @param pos Vector for the position
     */
    public setXY(pos: V2D): SVGNode {
        return this.set(SVGAttr.X, pos.x().toString()).set(
            SVGAttr.Y,
            pos.y().toString(),
        )
    }

    /**
     * Returns the JS SVGElement equavalent of current SVGNode
     */
    public toHTML(): SVGElement {
        const element = document.createElementNS(SVG_NAMESPACE, this._tag)

        this._attributes.forEach((value, attr) => {
            element.setAttribute(attr, value.toString())
        })

        element.innerHTML = this._innerText

        this._children.forEach((child) => element.appendChild(child.toHTML()))

        return element
    }

    /**
     * Returns the hashstring of SVGNode
     */
    public toHash(): string {
        const md5 = new Md5()

        md5.appendStr('tag' + this._tag)
        md5.appendStr('innertext' + this._innerText)

        const attributeArray: string[] = []
        this._attributes.forEach((value, key) => {
            attributeArray.push(`${key} - ${value}`)
        })

        attributeArray
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((attributeString) => {
                md5.appendStr('attribute' + attributeString)
            })

        this._children
            .map((child) => child.toHash())
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((childHash) => md5.appendStr('child' + childHash))

        return md5.end() as string
    }
}
