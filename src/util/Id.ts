export default class Id<Entity> {
    private readonly _value: string
    private readonly _!: Entity
    public constructor(value: string) {
        this._value = value
    }

    public get val(): string {
        return this._value
    }

    public equals(id: Id<Entity>): boolean {
        return this.val === id.val
    }
}
