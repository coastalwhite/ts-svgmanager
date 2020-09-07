import hash from 'object-hash'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

interface Hashable {
    [key: string]: string
}

export default class SVGNode {
    private _tag: string
    private _attributes: Map<string, string>
    private _children: SVGNode[]
    private _innerText: string

    public constructor(tag: string) {
        this._tag = tag
        this._attributes = new Map()
        this._children = []
        this._innerText = ''
    }

    public set(attr: string, value: string): SVGNode {
        this._attributes.set(attr, value)

        return this
    }

    public map(attr: string, f: (value: string) => string): SVGNode {
        const value = this._attributes.get(attr)
        if (value === undefined) return this

        this._attributes.set(attr, f(value))

        return this
    }

    public append(child: SVGNode): SVGNode {
        this._children.push(child)

        return this
    }

    public setText(text: string): SVGNode {
        this._innerText = text

        return this
    }

    public toHTML(): SVGElement {
        const element = document.createElementNS(SVG_NAMESPACE, this._tag)

        this._attributes.forEach((value, attr) => {
            element.setAttribute(attr, value)
        })

        element.innerHTML = this._innerText

        this._children.forEach(child => element.appendChild(child.toHTML()))

        return element
    }

    public toHash(): string {
        const object: Hashable = {
            tag: this._tag,
            innerText: this._innerText,
        }

        const tupleArray: string[][] = []
        this._attributes.forEach((value, key) => {
            tupleArray.push([key, value])
        })
        tupleArray.sort((a, b) => (a[0] < b[0] ? 1 : a[0] === b[0] ? 0 : -1))
        tupleArray.forEach(tuple => {
            object[tuple[0]] = tuple[1]
        })

        const childrenHashes = this._children
            .map(child => child.toHash())
            .sort((a, b) => (a[0] < b[0] ? 1 : a[0] === b[0] ? 0 : -1))

        childrenHashes.forEach((value, index) => {
            object['htmlChild' + index] = value
        })

        return hash(object)
    }
}
