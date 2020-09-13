import { Md5 } from 'ts-md5/dist/md5'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

interface Hashable {
    [key: string]: string
}

/**
 * A JS Representation of a HTML-Node.
 * More specifically, all the SVG Types Nodes.
 */
export default class SVGNode {
    private _tag: string
    private _attributes: Map<string, string>
    private _children: SVGNode[]
    private _innerText: string

    /**
     * Construct a SVGNode respresenting the *tag* element
     * with no attributes, children or inner text.
     */
    public constructor(tag: string) {
        this._tag = tag
        this._attributes = new Map()
        this._children = []
        this._innerText = ''
    }

    /**
     * Mutates the SVGNode to add/change an attribute *attr* to *value*.
     * Then, it returns itself, for easy programming.
     *
     * # Note
     * The id attribute is used within SVG Manager and will therefore most likely be overwritten.
     */
    public set(attr: string, value: string): SVGNode {
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
    public map(attr: string, f: (value: string) => string): SVGNode {
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
     * Mutates the SVGNode to set the inner text to *text*.
     * Then, it returns itself, for easy programming.
     */
    public setText(text: string): SVGNode {
        this._innerText = text

        return this
    }

    /**
     * Returns the JS SVGElement equavalent of current SVGNode
     */
    public toHTML(): SVGElement {
        const element = document.createElementNS(SVG_NAMESPACE, this._tag)

        this._attributes.forEach((value, attr) => {
            element.setAttribute(attr, value)
        })

        element.innerHTML = this._innerText

        this._children.forEach((child) => element.appendChild(child.toHTML()))

        return element
    }

    /**
     * Returns the hashstring of SVGNode
     */
    public toHash(): string {
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

        return md5.end() as string
    }

    /**
     * Converts a HTML element into a SVGNode element
     * @param element HTML element
     */
    public static fromHTMLElement(element: HTMLElement): SVGNode {
        let node = new SVGNode(element.tagName)

        Array.from(element.attributes).forEach((attribute: Attr) => {
            node = node.set(attribute.name, attribute.value)
        })

        Array.from(element.children).forEach((child: HTMLElement) => {
            node = node.append(SVGNode.fromHTMLElement(child))
        })

        if (element.innerText != undefined)
            node = node.setText(element.innerText)

        return node
    }

    private static async fetchHTML(url: string): Promise<string> {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest()
            xhr.open('get', url, true)
            xhr.onload = function () {
                var status = xhr.status
                if (status == 200) {
                    resolve(xhr.responseText)
                } else {
                    reject(status)
                }
            }
            xhr.send()
        })
    }

    /**
     * Load a SVGNode from a file
     */
    public static async fromFile(filePath: string): Promise<SVGNode> {
        const svgString = await SVGNode.fetchHTML(filePath)

        const parser = new DOMParser()
        const head = parser.parseFromString(svgString, 'image/svg+xml')
            .firstChild as HTMLElement

        return SVGNode.fromHTMLElement(head)
    }
}
