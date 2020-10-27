import { SVGAttribute } from '../declarations/Attributes'
import { SVGTagName } from '../declarations/TagNames'
import { SVGNode } from '../nodes/Node'

/** Parse html element into node */
function svgXMLtoNode(elem: HTMLElement): SVGNode {
    const tag = elem.tagName as SVGTagName
    if (tag === undefined) throw new Error('Tag not recognized!')
    const node = new SVGNode(tag)

    Array.from(elem.attributes).forEach((attribute: Attr) => {
        const attr = attribute.name as SVGAttribute
        if (attr === undefined) throw new Error('Attribute not recognized!')
        node.set(attr, attribute.value)
    })

    Array.from(elem.children).forEach((child: Element) => {
        node.append(svgXMLtoNode(child as HTMLElement))
    })

    if (elem.firstChild !== null && elem.firstChild.nodeValue !== null)
        node.text(elem.firstChild.nodeValue)

    return node
}

/**
 * Parse a string into a SVGNode object,
 * importing all SVG tags and attributes.
 * Also imports innerText.
 *
 * Counts on a single head element.
 *
 * If a unrecognized tag or attributes appears will throw error.
 * If parse fails will also throw an error.
 * @param str A string to parse
 */
function svgParseNode(str: string): SVGNode {
    const parser = new DOMParser()
    const parsed = parser.parseFromString(str, 'image/svg+xml')

    if (parsed.children.length === 0) throw new Error('Parsed is empty')
    if (parsed.children.length > 1) throw new Error('Too many heads')

    return svgXMLtoNode(parsed.firstChild as HTMLElement)
}

/**
 * Asynchroniously fetch a SVGNode from a file
 *
 * Will reject if file cannot be fetched
 * @param fileUrl A path to a svg file from the generated JS file
 */
async function svgFetchNode(fileUrl: string): Promise<SVGNode> {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('get', fileUrl, true)
        xhr.onload = function (): void {
            const status = xhr.status
            if (status === 200) {
                resolve(svgParseNode(xhr.responseText))
            } else {
                reject(status)
            }
        }
        xhr.send()
    })
}

/**
 * Synchroniously fetch a SVGNode from a file
 *
 * Will throw an error if file cannot be fetched
 * @param fileUrl A path to a svg file from the generated JS file
 */
function svgFetchNodeSync(fileUrl: string): SVGNode {
    const xhr = new XMLHttpRequest()
    xhr.open('get', fileUrl, false)
    xhr.send(null)

    if (xhr.status !== 200)
        throw new Error('Unable to fetch file as sync (' + xhr.status + ')')

    return svgParseNode(xhr.responseText)
}

export { svgParseNode, svgFetchNodeSync, svgFetchNode, svgXMLtoNode }
