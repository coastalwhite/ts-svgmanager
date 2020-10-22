import { SVGNode } from '../nodes'
import { SVGTagName, SVGAttribute } from '../declarations'
import { SVGViewBox } from '.'

/** Parse html element into node */
function svgHTMLintoNode(elem: HTMLElement): SVGNode {
    const tag = elem.tagName as SVGTagName
    if (tag === undefined) throw new Error('Tag not recognized!')
    const node = new SVGNode(tag)

    Array.from(elem.attributes).forEach((attribute: Attr) => {
        const attr = attribute.name as SVGAttribute
        if (attr === undefined) throw new Error('Attribute not recognized!')
        node.set(attr, attribute.value)
    })

    Array.from(elem.children).forEach((child: Element) => {
        node.append(svgHTMLintoNode(child as HTMLElement))
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

    return svgHTMLintoNode(parsed.firstChild as HTMLElement)
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

/** Parse viewbox into ViewBox class */
function svgParseViewBox(str: string): SVGViewBox {
    const splitted = str.split(' ')

    if (splitted.length !== 4) throw new Error('Incorrect format')

    return new SVGViewBox(
        parseFloat(splitted[0]),
        parseFloat(splitted[1]),
        parseFloat(splitted[2]),
        parseFloat(splitted[3]),
    )
}

export {
    svgParseViewBox,
    svgParseNode,
    svgFetchNodeSync,
    svgFetchNode,
    svgHTMLintoNode,
}
