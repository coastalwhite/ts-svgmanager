interface Stringable {
    toString(): string
}

export function sortedEquality(
    array1: Stringable[],
    array2: Stringable[],
): boolean {
    if (array1.length !== array2.length) return false

    const sortingFunction = (a: Stringable, b: Stringable): number => {
        if (a.toString() < b.toString()) return 1
        if (a.toString() > b.toString()) return -1
        return 0
    }

    const sorted1 = array1.sort(sortingFunction)
    const sorted2 = array2.sort(sortingFunction)

    return sorted1.every(
        (value, index) => value.toString() === sorted2[index].toString(),
    )
}

export function mapEquality(
    map1: Map<Stringable, Stringable>,
    map2: Map<Stringable, Stringable>,
): boolean {
    return sortedEquality(
        Array.from(map1).map(
            ([key, value]) =>
                `key: ${key.toString()} value: ${value.toString()}`,
        ),
        Array.from(map2).map(
            ([key, value]) =>
                `key: ${key.toString()} value: ${value.toString()}`,
        ),
    )
}
