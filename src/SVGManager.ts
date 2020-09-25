import SVGNode, { AttributeValue, SVGLinkedNode } from './SVGNode'

import { v4 as uuidv4 } from 'uuid'
import { SVGAttribute } from './definitions'
import {
    SVGEventName,
    SVGManagerEventDefinition,
    SVGManagerEventHandler,
} from './Events'

const DEFINITION_PREFIX = 'figure-'
export const TAG_PREFIX = 'tag-'

const DEFAULT_SVG_WIDTH = '500px'
const DEFAULT_SVG_HEIGHT = '500px'
const DEFAULT_VIEWBOX = '0 0 100 100'

export type SVGManagerDefinition = string & { isSvgManagerDef: true }
export type SVGManagerName = string & { isSvgManagerName: true }
export type SVGManagerTag = string & { isSvgManagerTag: true }

/**
 * A class used to manage SVG's in order to minimize definitions
 * and make controlling it from JS/TS as easy and reliable as possible.
 */
export default class SVGManager {
    private _managerid: string
    private _definitions: string[]

    private _node: SVGLinkedNode | null

    private get parentElement(): HTMLElement {
        const parentElement = this.node.element.parentElement

        if (parentElement === null) throw 'SVGManager: Node has no parent'

        return parentElement
    }

    private get node(): SVGLinkedNode {
        if (this._node === null)
            throw 'SVGManager: A SVGManager needs to be initialized (using SVGManager.init(rootId) before usage'

        return this._node
    }

    private defsElement(): SVGLinkedNode {
        const defs = this.node.children.find(
            (child) => child.tagName === 'defs',
        )

        if (defs === undefined) throw 'SVGManager: Definition not found in svg'

        return defs
    }

    private toDefId(elementId: string): SVGManagerDefinition {
        return (this._managerid +
            '-' +
            DEFINITION_PREFIX +
            elementId) as SVGManagerDefinition
    }

    public static toTagClass(tag: string): SVGManagerTag {
        return (TAG_PREFIX + tag) as SVGManagerTag
    }

    public static getTagsFromClasses(classNames: string): string[] {
        return classNames
            .split(' ')
            .filter((className) => className.startsWith(TAG_PREFIX))
            .map((name) => name.substr(TAG_PREFIX.length))
    }

    public static addTagsToNode(node: SVGNode): SVGNode {
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

    private doesDefExist(elementId: string): boolean {
        return this._definitions.includes(elementId)
    }

    private addDefintion(element: SVGNode): SVGManagerDefinition {
        const definitionId = this.toDefId(element.toHash())

        this._definitions.push(definitionId)
        this.defsElement().append(
            SVGManager.addTagsToNode(element.set('id', definitionId)),
        )

        return definitionId
    }

    private addUse(
        elementId: string,
        args?: {
            tags?: string[]
            attributes?: { attrName: SVGAttribute; attrValue: AttributeValue }[]
            events?: SVGManagerEventDefinition[]
        },
    ): void {
        const node = new SVGNode('use').set('href', '#' + elementId)
        if (args !== undefined) {
            if (args.attributes !== undefined)
                args.attributes.forEach((attribute) =>
                    node.set(attribute.attrName, attribute.attrValue),
                )
            if (args.events !== undefined)
                args.events.forEach((event) =>
                    node.on(event.eventName, event.func),
                )
            if (args.tags !== undefined)
                args.tags.forEach((tag) => node.tag(tag))
        }

        this.node.append(node)
    }

    private addFigure(element: SVGNode): void {
        this.node.append(SVGManager.addTagsToNode(element))
    }

    /**
     * Constructs a empty SVGManager object
     */
    public constructor() {
        this._managerid = uuidv4()

        this._node = null
        this._definitions = []
    }

    /**
     * Initializes the SVGManager to DOM within the container with id *rootId*\
     * It returns itself, for easy programming
     *
     * # Note
     * This svg has some default styling:
     * - viewBox of '0 0 100 100'
     * - width of 500px
     * - height of 500px
     * @param rootId The parent id
     */
    public init(rootId: string): this {
        const rootElement = document.getElementById(rootId)

        if (rootElement === null)
            throw 'SVGManager: rootId of "' + rootId + '" not found!'

        this._definitions = []

        const svgElement = new SVGNode('svg')
            .set('viewBox', DEFAULT_VIEWBOX)
            .set('width', DEFAULT_SVG_WIDTH)
            .set('height', DEFAULT_SVG_HEIGHT)
            .set('id', this._managerid)
            .append(new SVGNode('defs'))
            .toHTML()

        this._node = new SVGLinkedNode(rootElement.appendChild(svgElement))

        return this
    }

    /**
     * Adds the definition of element to list of definitions,
     * So that next time, when it is used, the element can rendered using the definition.
     */
    public ensureDefinition(element: SVGNode): SVGManagerDefinition {
        const elementId = element.toHash()

        if (!this.doesDefExist(elementId)) {
            this.addDefintion(element)
        }

        return this.toDefId(elementId)
    }

    /**
     * Renders a figure to the SVG using a figure ID/Hash.
     *
     * # Note
     * Requires a definition to present for the figure ID
     * otherwise it throws a Error
     *
     * @param elementId Definition id string
     * @param args Optional arguments from the rendering, including the names, tags, attributes and events
     */
    public renderId(
        definition: SVGManagerDefinition,
        args?: {
            names?: string[]
            tags?: string[]
            attributes?: { attrName: SVGAttribute; attrValue: AttributeValue }[]
            events?: SVGManagerEventDefinition[]
        },
    ): this {
        if (!this.doesDefExist(definition))
            throw "SVGManager: Tried to render an Id that doesn't exist"

        this.addUse(this.toDefId(definition), args)

        return this
    }

    /**
     * Renders a figure to the SVG using a SVGNode
     *
     * # Note
     * Will add the figure to definitions if not already there.
     */
    public render(element: SVGNode): this {
        this.addFigure(element)

        return this
    }

    /**
     * Mutates the SVGManager to add an event.
     * Multiple functions can be set for the same event.
     * Then, it returns itself, for easy programming.
     */
    public on(event: SVGEventName, func: SVGManagerEventHandler): this {
        this.node.on(event, func)
        return this
    }

    /**
     * Fetches all DOM elements in the SVG tagged with tag
     */
    public tagged(tag: string): SVGLinkedNode[] {
        return Array.from(
            this.node.element.getElementsByClassName(
                SVGManager.toTagClass(tag),
            ),
        ).map((el) => new SVGLinkedNode(el as SVGElement))
    }

    /**
     * Removes the SVG from the DOM
     */
    public destruct(): void {
        this.node.element.remove()
        this._node = null
    }

    /**
     * Removes all the content from the SVG in the DOM including the definitions
     */
    public clean(): void {
        // Remove event listeners
        const node = new SVGNode('svg')
        Array.from(this.node.attributes).forEach(([attr, value]) =>
            node.set(attr, value),
        )

        const newChild = this.parentElement.appendChild(node.toHTML())
        this.node.element.remove()
        const svgNode = new SVGLinkedNode(newChild)

        svgNode.text('')
        this._definitions = []

        svgNode.append(new SVGNode('defs'))

        this._node = svgNode
    }

    /**
     * Fetch an attribute value from root SVG element
     * @param attr Attribute name
     */
    public get(attr: SVGAttribute): AttributeValue | undefined {
        return this.node.get(attr)
    }

    /**
     * Set/change an attribute value from root SVG element
     * @param attr Attribute name
     * @param value Set value
     */
    public set(attr: SVGAttribute, value: AttributeValue): this {
        this.node.set(attr, value)

        return this
    }

    public viewBox(vb: AttributeValue): SVGManager {
        this.node.set('viewBox', vb)
        return this
    }

    public width(length: AttributeValue): SVGManager {
        this.node.set('width', length)
        return this
    }

    public height(length: AttributeValue): SVGManager {
        this.node.set('height', length)
        return this
    }

    /**
     * Returns the unique identifier connected to this SVGManager
     */
    public get id(): string {
        return this._managerid
    }

    public get events(): SVGManagerEventDefinition[] {
        return this.node.events
    }
}
