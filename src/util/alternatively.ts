export function alternatively<T>(unsure: T | undefined, alternative: T): T {
    if (unsure === undefined) return alternative

    return unsure
}
