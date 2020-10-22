import { assert, expect } from 'chai'
import { SVGManagerDefinition, SVGNode } from '../../src/'
import { SVGAnimate, svgXMLtoNode, SVGPathData, V2D } from '../../src/helpers'
import { svgCircle, svgLine } from '../../src/shapes'
import rect from '../../src/shapes/Rectangle'

describe('SVG Node', function () {
    describe('Basic settings - Constructor/get/set/append/equals/shallowEquals', function () {
        describe('Constructor', function () {
            it('TagName', function () {
                assert.equal(new SVGNode('a').tagName, 'a')
                assert.equal(new SVGNode('path').tagName, 'path')
                assert.equal(new SVGNode('svg').tagName, 'svg')
            })

            it('children', function () {
                assert.equal(new SVGNode('a').children.length, 0)
            })

            it('attributes', function () {
                assert.equal(new SVGNode('a').attributes.entries.length, 0)
            })

            it('innerText', function () {
                assert.equal(new SVGNode('a').innerText, '')
            })

            it('tags', function () {
                assert.equal(new SVGNode('a').tags.length, 0)
            })

            it('events', function () {
                assert.equal(new SVGNode('a').events.length, 0)
            })
        })

        describe('Set & get', function () {
            it('Basic setting and getting', function () {
                assert.equal(new SVGNode('a').set('x', 123).get('x'), '123')
                assert.equal(
                    new SVGNode('path')
                        .set('d', new SVGPathData().moveTo(10, 10))
                        .get('d'),
                    'M 10 10',
                )
                assert.equal(
                    new SVGNode('svg').set('width', 'test').get('width'),
                    'test',
                )
            })

            it('No more added than neccesary', function () {
                assert.equal(
                    Array.from(new SVGNode('a').set('x', 123).attributes)
                        .length,
                    1,
                )
                assert.equal(
                    Array.from(
                        new SVGNode('path').set(
                            'd',
                            new SVGPathData().moveTo(10, 10),
                        ).attributes,
                    ).length,
                    1,
                )
                assert.equal(
                    Array.from(new SVGNode('svg').set('d', 'test').attributes)
                        .length,
                    1,
                )
            })

            it('Multiple attributes', function () {
                const el = new SVGNode('a').set('x', 123).set('y', 567)

                assert.equal(Array.from(el.attributes).length, 2)
                assert.equal(el.get('x'), '123')
                assert.equal(el.get('y'), '567')
            })

            it('Other properties are not affected', function () {
                assert.equal(new SVGNode('a').set('x', 123).children.length, 0)
                assert.equal(new SVGNode('a').set('x', 123).tags.length, 0)
                assert.equal(new SVGNode('a').set('x', 123).events.length, 0)
                assert.equal(new SVGNode('a').set('x', 123).tagName, 'a')
                assert.equal(new SVGNode('a').set('x', 123).innerText, '')
            })
        })

        describe('append', function () {
            it('Append one element', function () {
                const el1 = svgCircle(5)

                assert.isTrue(
                    new SVGNode('a').append(el1).children[0].equals(el1),
                )
                assert.isTrue(
                    new SVGNode('path').append(el1).children[0].equals(el1),
                )
                assert.isTrue(
                    new SVGNode('svg').append(el1).children[0].equals(el1),
                )

                const el2 = svgCircle(100)

                assert.isTrue(
                    new SVGNode('a').append(el2).children[0].equals(el2),
                )
                assert.isTrue(
                    new SVGNode('path').append(el2).children[0].equals(el2),
                )
                assert.isTrue(
                    new SVGNode('svg').append(el2).children[0].equals(el2),
                )

                assert.isFalse(
                    new SVGNode('a').append(el2).children[0].equals(el1),
                )
                assert.isFalse(
                    new SVGNode('path').append(el2).children[0].equals(el1),
                )
                assert.isFalse(
                    new SVGNode('svg').append(el2).children[0].equals(el1),
                )
            })

            it('Append multiple elements', function () {
                const el1 = svgCircle(5)
                const el2 = rect(new V2D(5, 5), new V2D(10, 10))
                const el3 = svgCircle(100)

                assert.equal(new SVGNode('a').append(el1).children.length, 1)
                assert.equal(
                    new SVGNode('a').append(el1).append(el2).children.length,
                    2,
                )
                assert.equal(
                    new SVGNode('a').append(el1).append(el2).append(el3)
                        .children.length,
                    3,
                )

                assert.isTrue(
                    new SVGNode('a')
                        .append(el1)
                        .append(el2)
                        .append(el3)
                        .children[0].equals(el1),
                )

                assert.isTrue(
                    new SVGNode('a')
                        .append(el1)
                        .append(el2)
                        .append(el3)
                        .children[1].equals(el2),
                )
                assert.isTrue(
                    new SVGNode('a')
                        .append(el1)
                        .append(el2)
                        .append(el3)
                        .children[2].equals(el3),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .append(el1)
                        .append(el2)
                        .append(el3)
                        .children[1].equals(el1),
                )
            })

            it('Other properties are not affected', function () {
                assert.equal(
                    new SVGNode('a').append(svgCircle(5)).attributes.entries
                        .length,
                    0,
                )
                assert.equal(
                    new SVGNode('a').append(svgCircle(5)).tags.length,
                    0,
                )
                assert.equal(
                    new SVGNode('a').append(svgCircle(5)).events.length,
                    0,
                )
                assert.equal(new SVGNode('a').append(svgCircle(5)).tagName, 'a')
                assert.equal(
                    new SVGNode('a').append(svgCircle(5)).innerText,
                    '',
                )
            })
        })

        describe('equals', function () {
            it('differentiate tagNames', function () {
                assert.isTrue(new SVGNode('a').equals(new SVGNode('a')))

                assert.isFalse(new SVGNode('a').equals(new SVGNode('g')))

                assert.isFalse(new SVGNode('g').equals(new SVGNode('a')))

                assert.isFalse(new SVGNode('a').equals(new SVGNode('path')))

                assert.isTrue(new SVGNode('path').equals(new SVGNode('path')))

                assert.isFalse(new SVGNode('svg').equals(new SVGNode('path')))
            })

            it('differentiate attributes', function () {
                assert.isTrue(
                    new SVGNode('a')
                        .set('x', 1)
                        .equals(new SVGNode('a').set('x', 1)),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .set('x', 1)
                        .equals(new SVGNode('a').set('x', 2)),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .set('x', 2)
                        .equals(new SVGNode('a').set('x', 1)),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .set('y', 1)
                        .equals(new SVGNode('a').set('x', 1)),
                )
                assert.isTrue(
                    new SVGNode('a')
                        .set('y', 2)
                        .equals(new SVGNode('a').set('y', 2)),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .set('path', 1)
                        .equals(new SVGNode('a').set('width', 1)),
                )
            })

            it('differentiate children', function () {
                assert.isTrue(
                    new SVGNode('a')
                        .append(svgCircle(5))
                        .equals(new SVGNode('a').append(svgCircle(5))),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .append(svgCircle(5))
                        .equals(new SVGNode('a').append(svgCircle(8))),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .append(svgCircle(5))
                        .equals(
                            new SVGNode('a').append(
                                rect(new V2D(5, 5), new V2D(7, 8)),
                            ),
                        ),
                )
                assert.isTrue(
                    new SVGNode('a')
                        .append(svgLine(new V2D(5, 6), new V2D(7, 8)))
                        .equals(
                            new SVGNode('a').append(
                                svgLine(new V2D(5, 6), new V2D(7, 8)),
                            ),
                        ),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .append(svgCircle(5))
                        .equals(
                            new SVGNode('a')
                                .append(svgCircle(5))
                                .append(svgCircle(2)),
                        ),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .append(svgCircle(5))
                        .equals(
                            new SVGNode('a')
                                .append(svgCircle(2))
                                .append(svgCircle(5)),
                        ),
                )
                assert.isTrue(
                    new SVGNode('a')
                        .append(svgCircle(5))
                        .append(svgCircle(2))
                        .equals(
                            new SVGNode('a')
                                .append(svgCircle(5))
                                .append(svgCircle(2)),
                        ),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .append(svgCircle(2))
                        .append(svgCircle(5))
                        .equals(new SVGNode('a').append(svgCircle(2))),
                )
            })

            it('differentiate innerText', function () {
                assert.isTrue(
                    new SVGNode('a')
                        .text('x')
                        .equals(new SVGNode('a').text('x')),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .text('xyz')
                        .equals(new SVGNode('a').text('x')),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .text('xyz')
                        .equals(new SVGNode('a').text('xyza')),
                )
            })

            it('differentiate tags', function () {
                assert.isTrue(
                    new SVGNode('a').tag('x').equals(new SVGNode('a').tag('x')),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .tag('xyz')
                        .equals(new SVGNode('a').tag('x')),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .tag('xyz')
                        .equals(new SVGNode('a').tag('xyza')),
                )

                assert.isTrue(
                    new SVGNode('a')
                        .tag('xyz')
                        .tag('zyx')
                        .equals(new SVGNode('a').tag('zyx').tag('xyz')),
                )
            })
        })

        describe('shallowEquals', function () {
            it('differentiate tagNames', function () {
                assert.isTrue(new SVGNode('a').shallowEquals(new SVGNode('a')))

                assert.isFalse(new SVGNode('a').shallowEquals(new SVGNode('g')))

                assert.isFalse(new SVGNode('g').shallowEquals(new SVGNode('a')))

                assert.isFalse(
                    new SVGNode('a').shallowEquals(new SVGNode('path')),
                )

                assert.isTrue(
                    new SVGNode('path').shallowEquals(new SVGNode('path')),
                )

                assert.isFalse(
                    new SVGNode('svg').shallowEquals(new SVGNode('path')),
                )
            })

            it('differentiate attributes', function () {
                assert.isTrue(
                    new SVGNode('a')
                        .set('x', 1)
                        .shallowEquals(new SVGNode('a').set('x', 1)),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .set('x', 1)
                        .shallowEquals(new SVGNode('a').set('x', 2)),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .set('x', 2)
                        .shallowEquals(new SVGNode('a').set('x', 1)),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .set('y', 1)
                        .shallowEquals(new SVGNode('a').set('x', 1)),
                )
                assert.isTrue(
                    new SVGNode('a')
                        .set('y', 2)
                        .shallowEquals(new SVGNode('a').set('y', 2)),
                )
                assert.isFalse(
                    new SVGNode('a')
                        .set('path', 1)
                        .shallowEquals(new SVGNode('a').set('width', 1)),
                )
            })

            it('differentiate innerText', function () {
                assert.isTrue(
                    new SVGNode('a')
                        .text('x')
                        .shallowEquals(new SVGNode('a').text('x')),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .text('xyz')
                        .shallowEquals(new SVGNode('a').text('x')),
                )

                assert.isFalse(
                    new SVGNode('a')
                        .text('xyz')
                        .shallowEquals(new SVGNode('a').text('xyza')),
                )
            })

            it('not differentiate tags', function () {
                assert.isTrue(
                    new SVGNode('a')
                        .tag('x')
                        .shallowEquals(new SVGNode('a').tag('x')),
                )

                assert.isTrue(
                    new SVGNode('a')
                        .tag('xyz')
                        .shallowEquals(new SVGNode('a').tag('x')),
                )

                assert.isTrue(
                    new SVGNode('a')
                        .tag('xyz')
                        .shallowEquals(new SVGNode('a').tag('xyza')),
                )

                assert.isTrue(
                    new SVGNode('a')
                        .tag('xyz')
                        .tag('zyx')
                        .shallowEquals(new SVGNode('a').tag('zyx').tag('xyz')),
                )
            })
        })
    })

    describe('Children manipulation', function () {
        describe('removeChild', function () {
            it('Removing one element', function () {
                assert.equal(
                    svgCircle(1).append(svgCircle(2)).removeChild(0).children
                        .length,
                    0,
                )

                assert.equal(
                    svgCircle(1)
                        .append(svgCircle(2))
                        .append(svgCircle(6))
                        .removeChild(0).children.length,
                    1,
                )

                assert.equal(
                    svgCircle(1)
                        .append(svgCircle(2))
                        .append(svgCircle(6))
                        .append(svgCircle(7))
                        .removeChild(0).children.length,
                    2,
                )

                assert.equal(
                    svgCircle(1)
                        .append(svgCircle(2))
                        .append(svgCircle(6))
                        .append(svgCircle(7))
                        .removeChild(1).children.length,
                    2,
                )

                assert.equal(
                    svgCircle(1)
                        .append(svgCircle(2))
                        .append(svgCircle(6))
                        .append(svgCircle(7))
                        .removeChild(2).children.length,
                    2,
                )
            })

            it('Removing with no children', function () {
                expect(function () {
                    svgCircle(1).removeChild(0)
                }).to.throw('removeChild: index out of range')
            })

            it('Removing with not enough children', function () {
                expect(function () {
                    svgCircle(1).append(svgCircle(0)).removeChild(1)
                }).to.throw('removeChild: index out of range')

                expect(function () {
                    svgCircle(1).append(svgCircle(0)).removeChild(6)
                }).to.throw('removeChild: index out of range')

                expect(function () {
                    svgCircle(1).removeChild(-1)
                }).to.throw('removeChild: index out of range')
            })
        })

        describe('removeChildren', function () {
            it('Removing one element', function () {
                assert.equal(
                    svgCircle(1).append(svgCircle(2)).removeChildren().children
                        .length,
                    0,
                )
            })

            it('Removing with multiple children', function () {
                assert.equal(
                    svgCircle(1)
                        .append(svgCircle(2))
                        .append(svgCircle(6))
                        .append(svgCircle(4))
                        .removeChildren().children.length,
                    0,
                )
            })
        })
    })

    describe('Other setters - on/text/animate/class/name/tag', function () {
        it('on', function () {
            const f = (): string => 'hi'
            assert.equal(svgCircle(0).on('click', f).events.length, 1)
            assert.equal(
                svgCircle(0).on('click', f).events[0].eventName,
                'click',
            )
            assert.equal(svgCircle(0).on('click', f).events[0].func, f)

            const g = (): string => 'bye'
            assert.equal(
                svgCircle(0).on('click', f).on('mouseover', g).events.length,
                2,
            )
            assert.equal(
                svgCircle(0).on('click', f).on('mouseover', g).events[0]
                    .eventName,
                'click',
            )
            assert.equal(
                svgCircle(0).on('click', f).on('mouseover', g).events[0].func,
                f,
            )
            assert.equal(
                svgCircle(0).on('click', f).on('mouseover', g).events[1]
                    .eventName,
                'mouseover',
            )
            assert.equal(
                svgCircle(0).on('click', f).on('mouseover', g).events[1].func,
                g,
            )
        })

        it('text', function () {
            assert.equal(svgCircle(0).text('hi!').innerText, 'hi!')
            assert.notEqual(svgCircle(0).text('bye!').innerText, 'hi!')
        })

        it('animate', function () {
            const animate = new SVGAnimate(3000, 'r', [3, 4, 5])
            assert.equal(svgCircle(0).animate(animate).children.length, 1)
            assert.isTrue(
                svgCircle(0).animate(animate).children[0].equals(animate),
            )
        })

        it('class', function () {
            assert.equal(svgCircle(0).class('class1').get('class'), 'class1')
            assert.equal(
                svgCircle(0).class('class1').class('class2').get('class'),
                'class1 class2',
            )
        })

        it('tag', function () {
            assert.equal(svgCircle(0).tag('tag1').tags.length, 1)
            assert.equal(svgCircle(0).tag('tag1').tags[0], 'tag1')
            assert.equal(svgCircle(0).tag('tag1').tag('tag2').tags.length, 2)
            assert.equal(svgCircle(0).tag('tag1').tag('tag2').tags[0], 'tag1')
            assert.equal(svgCircle(0).tag('tag1').tag('tag2').tags[1], 'tag2')

            assert.equal(
                Array.from(new SVGNode('a').tag('test').attributes).length,
                0,
            )
        })
    })

    describe('attribute methods', function () {
        it('x', function () {
            assert.isTrue(
                svgCircle(1).x(543).equals(svgCircle(1).set('x', 543)),
            )
            assert.isFalse(
                svgCircle(1).x(543).equals(svgCircle(1).set('x', 456)),
            )
        })

        it('y', function () {
            assert.isTrue(
                svgCircle(1).y(543).equals(svgCircle(1).set('y', 543)),
            )
            assert.isFalse(
                svgCircle(1).y(543).equals(svgCircle(1).set('y', 456)),
            )
        })

        it('cx', function () {
            assert.isTrue(
                svgCircle(1).cx(543).equals(svgCircle(1).set('cx', 543)),
            )
            assert.isFalse(
                svgCircle(1).cx(543).equals(svgCircle(1).set('cx', 456)),
            )
        })

        it('cy', function () {
            assert.isTrue(
                svgCircle(1).cy(543).equals(svgCircle(1).set('cy', 543)),
            )
            assert.isFalse(
                svgCircle(1).cy(543).equals(svgCircle(1).set('cy', 456)),
            )
        })

        it('r', function () {
            assert.isTrue(
                svgCircle(1).r(543).equals(svgCircle(1).set('r', 543)),
            )
            assert.isFalse(
                svgCircle(1).r(543).equals(svgCircle(1).set('r', 456)),
            )
        })

        it('fill', function () {
            assert.isTrue(
                svgCircle(1).fill(543).equals(svgCircle(1).set('fill', 543)),
            )
            assert.isFalse(
                svgCircle(1).fill(543).equals(svgCircle(1).set('fill', 456)),
            )

            assert.isTrue(
                svgCircle(1)
                    .fill(543, 123)
                    .equals(
                        svgCircle(1).set('fill', 543).set('fill-opacity', 123),
                    ),
            )
            assert.isFalse(
                svgCircle(1)
                    .fill(543, 123)
                    .equals(
                        svgCircle(1).set('fill', 543).set('fill-opacity', 321),
                    ),
            )
        })

        it('stroke', function () {
            assert.isTrue(
                svgCircle(1)
                    .stroke(543)
                    .equals(svgCircle(1).set('stroke', 543)),
            )
            assert.isFalse(
                svgCircle(1)
                    .stroke(543)
                    .equals(svgCircle(1).set('stroke', 456)),
            )

            assert.isTrue(
                svgCircle(1)
                    .stroke(543, 123)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 543)
                            .set('stroke-width', 123),
                    ),
            )
            assert.isFalse(
                svgCircle(1)
                    .stroke(543, 123)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 543)
                            .set('stroke-width', 321),
                    ),
            )

            assert.isTrue(
                svgCircle(1)
                    .stroke(543, 123, 789)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 543)
                            .set('stroke-width', 123)
                            .set('stroke-opacity', 789),
                    ),
            )
            assert.isFalse(
                svgCircle(1)
                    .stroke(543, 123, 789)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 543)
                            .set('stroke-width', 321)
                            .set('stroke-opacity', 987),
                    ),
            )
        })

        it('fillDef', function () {
            assert.isTrue(
                svgCircle(1)
                    .fillDef('abcdef' as SVGManagerDefinition)
                    .equals(svgCircle(1).set('fill', 'url(#abcdef)')),
            )
            assert.isFalse(
                svgCircle(1)
                    .fillDef('fedcba' as SVGManagerDefinition)
                    .equals(svgCircle(1).set('fill', 'url(#abcdef)')),
            )

            assert.isTrue(
                svgCircle(1)
                    .fillDef('abcdef' as SVGManagerDefinition, 123)
                    .equals(
                        svgCircle(1)
                            .set('fill', 'url(#abcdef)')
                            .set('fill-opacity', 123),
                    ),
            )
            assert.isFalse(
                svgCircle(1)
                    .fillDef('fedcba' as SVGManagerDefinition, 123)
                    .equals(
                        svgCircle(1)
                            .set('fill', 'url(#abcdef)')
                            .set('fill-opacity', 321),
                    ),
            )
        })

        it('stroke', function () {
            assert.isTrue(
                svgCircle(1)
                    .strokeDef('abcdef' as SVGManagerDefinition)
                    .equals(svgCircle(1).set('stroke', 'url(#abcdef)')),
            )
            assert.isFalse(
                svgCircle(1)
                    .strokeDef('fedcba' as SVGManagerDefinition)
                    .equals(svgCircle(1).set('stroke', 'url(#abcdef)')),
            )

            assert.isTrue(
                svgCircle(1)
                    .strokeDef('abcdef' as SVGManagerDefinition, 123)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 'url(#abcdef)')
                            .set('stroke-width', 123),
                    ),
            )
            assert.isFalse(
                svgCircle(1)
                    .strokeDef('fedcba' as SVGManagerDefinition, 123)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 'url(#abcdef)')
                            .set('stroke-width', 321),
                    ),
            )

            assert.isTrue(
                svgCircle(1)
                    .strokeDef('abcdef' as SVGManagerDefinition, 123, 789)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 'url(#abcdef)')
                            .set('stroke-width', 123)
                            .set('stroke-opacity', 789),
                    ),
            )
            assert.isFalse(
                svgCircle(1)
                    .strokeDef('fedcba' as SVGManagerDefinition, 123, 789)
                    .equals(
                        svgCircle(1)
                            .set('stroke', 'url(#abcdef)')
                            .set('stroke-width', 321)
                            .set('stroke-opacity', 987),
                    ),
            )
        })
    })

    describe('advanced functions - copy/toHash/toHTML', function () {
        describe('copy', function () {
            it('attributes', function () {
                const el1 = svgCircle(0)
                const el2 = el1
                const el1Copy = el1.copy()
                assert.isTrue(el1.x(1).equals(el2))
                assert.isFalse(el1.x(2).equals(el1Copy))
            })

            it('children', function () {
                const el1 = svgCircle(0).append(svgCircle(1))
                const el2 = el1
                const el1Copy = el1.copy()
                assert.isTrue(el1.children[0].x(1).equals(el2.children[0]))
                assert.isFalse(el1.children[0].x(2).equals(el1Copy.children[0]))
            })

            it('events', function () {
                const el1 = svgCircle(0)
                const el2 = el1
                const el1Copy = el1.copy()
                assert.isTrue(
                    el1
                        .on('click', () => 'test')
                        .events.every(
                            (event, index) =>
                                el2.events[index].eventName ===
                                    event.eventName &&
                                el2.events[index].func === event.func,
                        ),
                )
                assert.notEqual(
                    el1.on('click', () => 'test2').events.length,
                    el1Copy.events.length,
                )
            })

            it('tags', function () {
                const el1 = svgCircle(0)
                const el2 = el1
                const el1Copy = el1.copy()

                el1.tag('hi!')
                assert.isTrue(el1.equals(el2))
                assert.isFalse(el1.equals(el1Copy))
            })

            it('innerText', function () {
                const el1 = svgCircle(0)
                const el2 = el1
                const el1Copy = el1.copy()
                assert.isTrue(el1.text('hi!').equals(el2))
                assert.isFalse(el1.text('bye!').equals(el1Copy))
            })
        })

        it('toHash', function () {
            const el1 = svgCircle(5)
            assert.equal(el1.toHash(), el1.toHash())
            assert.equal(el1.toHash(), el1.copy().toHash())
            assert.notEqual(el1.toHash(), el1.copy().x(10).toHash())
            assert.notEqual(
                el1.toHash(),
                el1.copy().append(svgCircle(2)).toHash(),
            )
            assert.notEqual(el1.toHash(), el1.copy().tag('tag1').toHash())
            assert.notEqual(
                new SVGNode('a').toHash(),
                new SVGNode('path').toHash(),
            )
        })

        it('toHTML', function () {
            const el1 = svgCircle(5)
            assert.isTrue(
                el1.equals(
                    svgXMLtoNode((el1.toHTML() as unknown) as HTMLElement),
                ),
            )
            assert.isFalse(
                el1.equals(
                    svgXMLtoNode(
                        (el1.copy().x(2).toHTML() as unknown) as HTMLElement,
                    ),
                ),
            )
            assert.isFalse(
                el1.equals(
                    svgXMLtoNode(
                        (el1
                            .copy()
                            .append(svgCircle(4))
                            .toHTML() as unknown) as HTMLElement,
                    ),
                ),
            )
        })
    })
})
