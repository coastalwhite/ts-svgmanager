import { SVGNode } from '..'
import ViewBox from './ViewBox'
import { SVGTag, SVGAttribute } from '../definitions'

function htmlToSVGNode(elem: HTMLElement): SVGNode {
    const tag = elem.tagName as SVGTag
    if (tag === undefined) throw new Error('Tag not recognized!')
    let node = new SVGNode(tag)

    Array.from(elem.attributes).forEach((attribute: Attr) => {
        const attr = attribute.name as SVGAttribute
        if (attr === undefined) throw new Error('Attribute not recognized!')
        node = node.set(attr, attribute.value)
    })

    Array.from(elem.children).forEach((child: HTMLElement) => {
        node = node.append(htmlToSVGNode(child))
    })

    if (elem.innerText !== undefined) node.innerText = elem.innerText

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
function stringToSVGNode(str: string): SVGNode {
    const parser = new DOMParser()
    const parsed = parser.parseFromString(str, 'image/svg+xml')

    if (parsed.children.length === 0) throw new Error('Parsed is empty')
    if (parsed.children.length > 1) throw new Error('Too many heads')

    return htmlToSVGNode(parsed.firstChild as HTMLElement)
}

/**
 * Asynchroniously fetch a SVGNode from a file
 *
 * Will reject if file cannot be fetched
 * @param fileUrl A path to a svg file from the generated JS file
 */
async function asyncLoadSVGNode(fileUrl: string): Promise<SVGNode> {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('get', fileUrl, true)
        xhr.onload = function () {
            var status = xhr.status
            if (status === 200) {
                resolve(stringToSVGNode(xhr.responseText))
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
function syncLoadSVGNode(fileUrl: string): SVGNode {
    const xhr = new XMLHttpRequest()
    xhr.open('get', fileUrl, false)
    xhr.send(null)

    if (xhr.status !== 200)
        throw new Error('Unable to fetch file as sync (' + xhr.status + ')')

    return stringToSVGNode(xhr.responseText)
}

function stringToSVGViewBox(str: string): ViewBox {
    const splitted = str.split(' ')

    if (splitted.length !== 4) throw new Error('Incorrect format')

    return new ViewBox(
        parseFloat(splitted[0]),
        parseFloat(splitted[1]),
        parseFloat(splitted[2]),
        parseFloat(splitted[3]),
    )
}

export {
    stringToSVGViewBox as parseSVGViewBox,
    stringToSVGNode as parseSVGNode,
    syncLoadSVGNode as fetchSVGNodeSync,
    asyncLoadSVGNode as fetchSVGNode,
    htmlToSVGNode as htmlParseSVGNode,
}
