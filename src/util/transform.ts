import { SVGNode } from '@/nodes/Node'

export function getTransform(node: SVGNode, functionType: string): number[] {
    const transform = node.get('transform')

    if (transform === undefined || !transform.toString().includes(functionType))
        return []

    const functionLocation = transform.toString().indexOf(functionType)

    if (functionLocation === -1) return []

    const endLocation = transform
        .toString()
        .substr(functionLocation)
        .indexOf(')')

    if (endLocation === -1) return []

    const values = transform
        .toString()
        .substr(
            functionLocation + functionType.length + 1,
            endLocation - (functionType.length + 1),
        )
        .split(' ')
        .map((str) => parseFloat(str))

    return values
}

export function setTransform(
    node: SVGNode,
    functionType: string,
    ...values: number[]
): void {
    const transform = node.get('transform')

    const functionString =
        functionType + '(' + values.map((v) => v.toString()).join(' ') + ')'

    if (transform === undefined) {
        node.set('transform', functionString)
        return
    }

    if (!transform.toString().includes(functionType)) {
        node.set('transform', transform.toString() + ' ' + functionString)
    }

    const functionLocation = transform.toString().indexOf(functionType)

    if (functionLocation === -1) return

    const endLocation = transform
        .toString()
        .substr(functionLocation)
        .indexOf(')')

    if (endLocation === -1) return

    node.set(
        'transform',
        transform.toString().substr(0, functionLocation) +
            functionString +
            transform.toString().substr(functionLocation + endLocation + 1),
    )
}
