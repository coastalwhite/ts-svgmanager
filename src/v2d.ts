// V2D
// 2 Dimensional Vector
export default class V2D {
	private _x: number;
	private _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	public x(): number {
		return this._x;
	}

	public y(): number {
		return this._y;
	}

	// Add with v
	public add(v: V2D): V2D {
		return new V2D(this.x() + v.x(), this.y() + v.y());
	}

	// Substract with v (this - v)
	public sub(v: V2D): V2D {
		return new V2D(this.x() - v.x(), this.y() - v.y());
	}

	// Scale with s
	public sca(s: number): V2D {
		return new V2D(this.x() * s, this.y() * s);
	}

	// Get dot-product
	public dot(v: V2D): number {
		return this.x() * v.x() + this.y() * v.y();
	}

	public toString(): string {
		return `V2D: {
            _x: ${this.x()},
            _y: ${this.y()}
        }`;
	}

	// (x,y) |-> (y,x)
	public invert(): V2D {
		return new V2D(this.y(), this.x());
	}

	// (x,y) |-> (|x|,|y|)
	public abs(): V2D {
		return new V2D(
			this.x() < 0 ? -this.x() : this.x(),
			this.y() < 0 ? -this.y() : this.y()
		);
	}

	// Round to nearest factor of 'sk'
	public round(sk: number): V2D {
		const lowX = this.x() - (this.x() % sk),
			lowY = this.y() - (this.y() % sk),
			highX = lowX + sk,
			highY = lowY + sk;

		const iX = this.x() - lowX < highX - this.x() ? lowX : highX,
			iY = this.y() - lowY < highY - this.y() ? lowY : highY;

		return new V2D(iX, iY);
	}

	// Get length of vector
	public length(): number {
		return Math.sqrt(this.dot(this));
	}

	// Angle between vectors
	public angle(v: V2D): number {
		return Math.acos(this.dot(v) / (v.length() * this.length()));
	}

	// this ?= v
	public equals(v: V2D): boolean {
		return this.x() === v.x() && this.y() === v.y();
	}

	public middle(v: V2D): V2D {
		return new V2D((this.x() + v.x()) / 2, (this.y() + v.y()) / 2);
	}

	public dydx(): number {
		return this.y() / this.x();
	}

	public xSign(): number {
		return this.x() < 0 ? -1 : this.x() > 0 ? 1 : 0;
	}
	public ySign(): number {
		return this.y() < 0 ? -1 : this.y() > 0 ? 1 : 0;
	}
}
