import { Md5 } from 'ts-md5/dist/md5'
import { V2D } from '.'
import {
    EventDefinition,
    EventFunc,
    SVGAttr,
    SVGEvent,
    SVGTag,
} from './definitions'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

/**
 * A JS Representation of a HTML-Node.
 * More specifically, all the SVG Types Nodes.
 */
export default class SVGNode {
    private _tag: SVGTag
    private _attributes: Map<SVGAttr, string>
    private _children: SVGNode[]
    private _innerText: string
    private _events: EventDefinition[]
    private _name: string

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
    }

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * The id attribute is used within SVG Manager and will therefore most likely be overwritten.
     */
    public set(attr: SVGAttr, value: string): SVGNode {
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
    public map(attr: SVGAttr, f: (value: string) => string): SVGNode {
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

    public getEvents(): EventDefinition[] {
        return this._events
    }

    public name(newName: string): SVGNode {
        this._name = newName

        return this
    }

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
            element.setAttribute(attr, value)
        })

        if (this._name !== undefined)
            element.setAttribute(SVGAttr.Id, this._name)

        element.innerHTML = this._innerText

        this._children.forEach((child) => element.appendChild(child.toHTML()))

        return element
    }

    /**
     * Returns the hashstring of SVGNode
     */
    public toHash(): string {
        const id = this._attributes.get(SVGAttr.Id)
        this.set(SVGAttr.Id, '')

        let md5 = new Md5()

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

        const childrenHashes = this._children
            .map((child) => child.toHash())
            .sort((a, b) => (a < b ? 1 : a === b ? 0 : -1))
            .forEach((childHash) => md5.appendStr('child' + childHash))

        if (id !== undefined) {
            this.set(SVGAttr.Id, id)
        }

        return md5.end() as string
    }
}
