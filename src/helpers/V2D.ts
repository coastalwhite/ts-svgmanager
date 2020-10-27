/**
 * # V2D
 * A 2 Dimensional Vector
 */
export class V2D {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    /**
     * Gets the x value
     */
    public get x(): number {
        return this._x
    }

    /**
     * Gets the y value
     */
    public get y(): number {
        return this._y
    }

    /**
     * Checks whether a vector is equal to this vector
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.equals(new V2D(2,3)); // Will equal true!
     * x.equals(new V2D(1,2)); // Will equal false!
     * ```
     */
    public equals(v: V2D): boolean {
        return this.x === v.x && this.y === v.y
    }

    /**
     * Returns a vector is the vector *v* added from current vector\
     * V2D(x,y).add(V2D(p,q)) maps to V2D(x+p,y+q)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.add(new V2D(2,3)); // Will equal V2D(4,6)!
     * x.add(new V2D(-1,-2)); // Will equal V2D(1,1)!
     * ```
     */
    public add(v: V2D): V2D {
        return new V2D(this.x + v.x, this.y + v.y)
    }

    /**
     * Returns a vector is the vector *v* subtracted from current vector\
     * V2D(x,y).sub(V2D(p,q)) maps to V2D(x-p,y-q)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.sub(new V2D(2,3)); // Will equal V2D(0,0)!
     * x.sub(new V2D(-1,-2)); // Will equal V2D(3,5)!
     * ```
     */
    public sub(v: V2D): V2D {
        return new V2D(this.x - v.x, this.y - v.y)
    }

    /**
     * Returns a scaled current vector with factor *s*\
     * V2D(x,y).sca(s) maps to V2D(s*x,s*y)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.sca(2); // Will equal V2D(4,6)!
     * x.sca(0.5); // Will equal V2D(1,1.5)!
     * ```
     */
    public sca(s: number): V2D {
        return new V2D(this.x * s, this.y * s)
    }

    /**
     * Calcualtes the point wise multiplication of with `v`
     * V2D(x,y).times(V2D(p,q)) maps to V2D(x*p,y*q)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.times(new V2D(3,4)); // Will equal V2D(9,16)!
     * x.times(new V2D(4,-3)); // Will equal V2D(12,-12)!
     * ```
     */
    public times(v: V2D): V2D {
        return new V2D(this.x * v.x, this.y * v.y)
    }

    public apply(f: (a: number) => number): V2D {
        return new V2D(f(this.x), f(this.y))
    }

    /**
     * Calculates the dot-product between current vector and vector *v* and returns the result\
     * V2D(x,y).dot(V2D(p,q)) maps to x*p+y*q
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.dot(new V2D(3,4)); // Will equal 25!
     * x.dot(new V2D(4,-3)); // Will equal 0!
     * ```
     */
    public dot(v: V2D): number {
        return this.x * v.x + this.y * v.y
    }

    /**
     * Returns a invert version of current vector\
     * V2D(x,y).invert() maps to V2D(y,x)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,3);
     *
     * x.invert(); // Will equal V2D(3,2)!
     * ```
     */
    public invert(): V2D {
        return new V2D(this.y, this.x)
    }

    /**
     * Returns a absoluted version of current vector\
     * V2D(x,y).abs() maps to V2D(|x|,|y|)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(-2,3);
     *
     * x.abs(); // Will equal V2D(2,3)!
     * ```
     */
    public abs(): V2D {
        return new V2D(
            this.x < 0 ? -this.x : this.x,
            this.y < 0 ? -this.y : this.y,
        )
    }

    /**
     * Returns a rounded version of current vector to the closest *sk*\
     * V2D(x,y).round(sk) maps to V2D(round(x, sk),round(y, sk))
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,6);
     *
     * x.round(10); // Will equal V2D(0,10)!
     * ```
     */
    public round(sk: number): V2D {
        const lowX = this.x - (this.x % sk),
            lowY = this.y - (this.y % sk),
            highX = lowX + sk,
            highY = lowY + sk

        const iX = this.x - lowX < highX - this.x ? lowX : highX,
            iY = this.y - lowY < highY - this.y ? lowY : highY

        return new V2D(iX, iY)
    }

    /**
     * Returns the length of the vector\
     * V2D(x,y).length() maps to |V2D(x,y)|
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.length(); // Will equal 5!
     * ```
     */
    public length(): number {
        return Math.sqrt(this.dot(this))
    }

    /**
     * Returns the angle between vector *v* and current vector\
     * V2D(x,y).angle(V2D(p,q)) maps to angle(V2D(x,y),V2D(p,q))
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.angle(x); // Will equal 0!
     * ```
     */
    public angle(v: V2D): number {
        return Math.acos(this.dot(v) / (v.length() * this.length()))
    }

    /**
     * Returns the middle between vector *v* and current vector\
     * V2D(x,y).middle(V2D(p,q)) maps to V2D(x,y).add(V2D(p,q)).sca(0.5)
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(3,4);
     *
     * x.middle(new V2D(5,8)); // Will equal V2D(4,6)!
     * ```
     */
    public middle(v: V2D): V2D {
        return this.add(v).sca(0.5)
    }

    /**
     * Returns the tangent of current vector\
     * V2D(x,y).dydx() maps to y/x
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * let x = new V2D(2,4);
     *
     * x.dydx(); // Will equal 2!
     * ```
     */
    public dydx(): number {
        return this.y / this.x
    }

    /**
     * Returns the sign of current vector's x
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * new V2D(-13,0).xSign(); // Will equal -1!
     * new V2D(-5,2).xSign(); // Will equal -1!
     * new V2D(-5,0).xSign(); // Will equal -1!
     * new V2D(0,2).xSign(); // Will equal 0!
     * new V2D(3,0).xSign(); // Will equal 1!
     * new V2D(33,0).xSign(); // Will equal 1!
     * ```
     */
    public xSign(): number {
        return this.x < 0 ? -1 : this.x > 0 ? 1 : 0
    }

    /**
     * Returns the sign of current vector's y
     *
     * # Note
     * Does not mutate *this* vector
     *
     * ```typescript
     * new V2D(0,-13).ySign(); // Will equal -1!
     * new V2D(2,-5).ySign(); // Will equal -1!
     * new V2D(0,-5).ySign(); // Will equal -1!
     * new V2D(2,0).ySign(); // Will equal 0!
     * new V2D(0,3).ySign(); // Will equal 1!
     * new V2D(0,33).ySign(); // Will equal 1!
     * ```
     */
    public ySign(): number {
        return this.y < 0 ? -1 : this.y > 0 ? 1 : 0
    }

    public clone(): V2D {
        return new V2D(this.x, this.y)
    }
}
