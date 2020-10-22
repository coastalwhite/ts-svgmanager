import { AttributeMap, AttributeValue, SVGManagerTag, SVGNode } from '.'
import { TAG_PREFIX } from '../constants'
import {
    SVGAttribute,
    SVGEventName,
    SVGManagerEventHandler,
    SVGTagName,
} from '../definitions'

/**
 * A SVGNode linked/attached to a DOM element,
 * which will therefore instantly apply any changes to the DOM,
 * and fetch up to date properties of the SVGNode
 */
export default class SVGLinkedNode extends SVGNode {
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
    public render(...nodes: SVGNode[]): this {
        nodes.forEach((node) =>
            this.append(SVGLinkedNode.addTagsToNode(node.copy())),
        )

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
