import { assert } from 'chai'
import V2D from '../src/definitions/V2D'

describe('V2D', function () {
    describe('Basis tests', function () {
        it('Should return the same values as it is initiated with', function () {
            assert.equal(new V2D(3, 5).x, 3)
            assert.equal(new V2D(3, 5).y, 5)
            assert.equal(new V2D(-1, 5).x, -1)
            assert.equal(new V2D(3, -2).y, -2)
            assert.equal(new V2D(-20, -23).x, -20)
            assert.equal(new V2D(-20, -23).y, -23)
        })

        it('Should be able to tell if vectors are equal or not', function () {
            assert.isTrue(new V2D(3, 5).equals(new V2D(3, 5)))
            assert.isTrue(new V2D(-3, 5).equals(new V2D(-3, 5)))
            assert.isTrue(new V2D(3, -5).equals(new V2D(3, -5)))
            assert.isTrue(new V2D(-3, -5).equals(new V2D(-3, -5)))

            assert.isFalse(new V2D(3, 5).equals(new V2D(2, 5)))
            assert.isFalse(new V2D(3, 5).equals(new V2D(3, 2)))
            assert.isFalse(new V2D(3, 5).equals(new V2D(3, -5)))
            assert.isFalse(new V2D(-3, -5).equals(new V2D(3, 5)))
        })
    })

    describe('Arithmetic tests', function () {
        it('Should add', function () {
            assert.isTrue(
                new V2D(3, 5).add(new V2D(1, 3)).equals(new V2D(4, 8)),
            )
            assert.isTrue(
                new V2D(3, 5).add(new V2D(-1, -3)).equals(new V2D(2, 2)),
            )
            assert.isTrue(
                new V2D(1, 1).add(new V2D(3, 4)).equals(new V2D(4, 5)),
            )
            assert.isTrue(
                new V2D(-3, -5).add(new V2D(1, 3)).equals(new V2D(-2, -2)),
            )
            assert.isTrue(
                new V2D(3345, 5231)
                    .add(new V2D(1, 3))
                    .equals(new V2D(3346, 5234)),
            )
        })

        it('Should subtract', function () {
            assert.isTrue(
                new V2D(3, 5).sub(new V2D(1, 3)).equals(new V2D(2, 2)),
            )
            assert.isTrue(
                new V2D(3, 5).sub(new V2D(-1, -3)).equals(new V2D(4, 8)),
            )
            assert.isTrue(
                new V2D(1, 1).sub(new V2D(3, 4)).equals(new V2D(-2, -3)),
            )
            assert.isTrue(
                new V2D(-3, -5).sub(new V2D(1, 3)).equals(new V2D(-4, -8)),
            )
            assert.isTrue(
                new V2D(3345, 5231)
                    .sub(new V2D(1, 3))
                    .equals(new V2D(3344, 5228)),
            )
        })

        it('Should scale', function () {
            assert.isTrue(new V2D(3, 5).sca(1).equals(new V2D(3, 5)))
            assert.isTrue(new V2D(3, 5).sca(2).equals(new V2D(6, 10)))
            assert.isTrue(new V2D(1, 1).sca(4).equals(new V2D(4, 4)))
            assert.isTrue(new V2D(-3, -5).sca(-3).equals(new V2D(9, 15)))
            assert.isTrue(
                new V2D(1111, 3333).sca(3).equals(new V2D(3333, 9999)),
            )
        })

        it('Should dot', function () {
            assert.equal(new V2D(3, 5).dot(new V2D(5, -3)), 0)
            assert.equal(new V2D(3, 5).dot(new V2D(5, 3)), 30)
            assert.equal(new V2D(1, 2).dot(new V2D(1, 2)), 5)
            assert.equal(new V2D(2, 1).dot(new V2D(1, -2)), 0)
        })

        it('Should abs', function () {
            assert.isTrue(new V2D(3, 5).abs().equals(new V2D(3, 5)))
            assert.isTrue(new V2D(-3, 5).abs().equals(new V2D(3, 5)))
            assert.isTrue(new V2D(3, -5).abs().equals(new V2D(3, 5)))
            assert.isTrue(new V2D(-3, -5).abs().equals(new V2D(3, 5)))
        })
    })

    describe('Vector functions', function () {
        it('Should fetch length', function () {
            assert.equal(new V2D(3, 4).length(), 5)
            assert.equal(new V2D(1, 2).length(), Math.sqrt(5))
            assert.equal(new V2D(5, -12).length(), 13)
            assert.equal(new V2D(-5, 12).length(), 13)
            assert.equal(new V2D(-5, -12).length(), 13)
        })

        it('Should invert the vector', function () {
            assert.isTrue(new V2D(3, 5).invert().equals(new V2D(5, 3)))
            assert.isTrue(new V2D(1, 2).invert().equals(new V2D(2, 1)))
            assert.isTrue(new V2D(-3, 5).invert().equals(new V2D(5, -3)))
            assert.isTrue(new V2D(3, -5).invert().equals(new V2D(-5, 3)))
        })

        it('Should round', function () {
            assert.isTrue(new V2D(3, 5).round(2).equals(new V2D(4, 6)))
            assert.isTrue(new V2D(3, 5).round(3).equals(new V2D(3, 6)))
            assert.isTrue(new V2D(3, 5).round(5).equals(new V2D(5, 5)))
            assert.isTrue(new V2D(3, 5).round(10).equals(new V2D(0, 10)))
        })

        it('Should get middle', function () {
            assert.isTrue(
                new V2D(3, 5).middle(new V2D(5, 3)).equals(new V2D(4, 4)),
            )
            assert.isTrue(
                new V2D(1, 5).middle(new V2D(5, 1)).equals(new V2D(3, 3)),
            )
            assert.isTrue(
                new V2D(3, 5).middle(new V2D(3, 7)).equals(new V2D(3, 6)),
            )
            assert.isTrue(
                new V2D(1, 5).middle(new V2D(2, 5)).equals(new V2D(1.5, 5)),
            )
        })

        it('Should get tangent', function () {
            assert.equal(new V2D(1, 2).dydx(), 2)
            assert.equal(new V2D(2, 6).dydx(), 3)
            assert.equal(new V2D(2, 1).dydx(), 0.5)
            assert.equal(new V2D(2, 10).dydx(), 5)
            assert.equal(new V2D(8, 2).dydx(), 0.25)
            assert.equal(new V2D(-2, 10).dydx(), -5)
            assert.equal(new V2D(8, -2).dydx(), -0.25)
            assert.equal(new V2D(0, 1).dydx(), Infinity)
        })

        it('Should get x sign', function () {
            assert.equal(new V2D(1, 2).xSign(), 1)
            assert.equal(new V2D(0, -1).xSign(), 0)
            assert.equal(new V2D(-1, -123214).xSign(), -1)

            assert.equal(new V2D(102, 23123).xSign(), 1)
            assert.equal(new V2D(-1213123, 0).xSign(), -1)
        })

        it('Should get y sign', function () {
            assert.equal(new V2D(1, 2).ySign(), 1)
            assert.equal(new V2D(0, -1).ySign(), -1)
            assert.equal(new V2D(-1, -123214).ySign(), -1)

            assert.equal(new V2D(102, 23123).ySign(), 1)
            assert.equal(new V2D(-1213123, 0).ySign(), 0)
        })
    })
})
