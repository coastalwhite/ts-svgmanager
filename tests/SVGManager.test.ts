import { assert } from 'chai'
import PathData from '../src/helpers/PathData'
import ViewBox from '../src/helpers/ViewBox'
import { circle } from '../src/Shapes'
import SVGManager from '../src/SVGManager'
import SVGNode, { TAG_PREFIX } from '../src/SVGNode'

document.body.innerHTML = '<div id="root"></div>'

const root = document.getElementById('root')
if (root === null) throw "Can't get root"

describe('SVG Manager', function () {
    const manager = new SVGManager().init('root')

    describe('Basic control functions - init/size/clean/remove/viewBox', function () {
        it('init', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('size', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.width('700px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="700px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.height('300px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="700px" height="300px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.width('500px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="300px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.height('500px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('clean', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.define(new SVGNode('g'))

            assert.notEqual(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('viewbox', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.viewBox(new ViewBox(10, 10, 100, 100))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="10 10 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.viewBox(new ViewBox(4, 6, 100, 100))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="4 6 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.viewBox(new ViewBox(-6, -4, 100, 100))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="-6 -4 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.viewBox(new ViewBox(0, 0, 100, 100))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('remove', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" id="${manager.id}" width="500px" height="500px">
                    <defs>
                    </defs>
                </svg>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.destruct()

            assert.equal(root.innerHTML, ``.replace('\t', '').replace('\n', ''))

            manager.init('root')
        })
    })

    describe('Rendering - render/renderId/ensureDefinition', function () {
        it('define', function () {
            manager.clean()

            const def = manager.define(new SVGNode('a'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a id="${def}">
                    </a>
                </defs>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('render - single item', function () {
            manager.clean()

            manager.render(new SVGNode('a').x(7).y(24))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    
                </defs>
                <a x="7" y="24">
                </a>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('render - multiple items', function () {
            manager.clean()

            manager.render(new SVGNode('a').x(5).y(6).text('test1'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a x="5" y="6">
                    test1
                </a>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.render(new SVGNode('g').x(2).y(10).text('test2'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `<defs>
                </defs>
                <a x="5" y="6">
                    test1
                </a>
                <g x="2" y="10">
                    test2
                </g>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('render - tagged', function () {
            manager.clean()

            manager.render(
                new SVGNode('a').x(5).y(6).tag('test_item').text('Hi!'),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a x="5" y="6" class="${TAG_PREFIX}test_item">
                    Hi!
                </a>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })

        it('renderId', function () {
            manager.clean()

            const def = manager.define(new SVGNode('a').x(3).y(7))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a x="3" y="7" id="${def}">
                    </a>
                </defs>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            manager.renderDef(def, {
                attributes: [
                    { attrName: 'x', attrValue: 23 },
                    { attrName: 'y', attrValue: 55 },
                ],
            })

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a x="3" y="7" id="${def}">
                    </a>
                </defs>
                <use href="#${manager.id}-figure-${def}" x="23" y="55"></use>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })
    })

    describe('Tags - tagged', function () {
        it('fetchTagged', function () {
            manager.clean()

            const vertex = circle(3).tag('vertex')

            manager.render(new SVGNode('g').append(vertex.cx(10).cy(10)))
            manager.render(new SVGNode('a').append(vertex.cx(5).cy(5)))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <g>
                    <circle cx="10" cy="10" stroke="#000" stroke-width="1px" fill="transparent" r="3" class="${TAG_PREFIX}vertex">
                    </circle>
                </g>
                <a>
                    <circle cx="5" cy="5" stroke="#000" stroke-width="1px" fill="transparent" r="3" class="${TAG_PREFIX}vertex">
                    </circle>
                </a>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )

            const items = manager.tagged('vertex')
            items.forEach((item) => item.r(2))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <g>
                    <circle cx="10" cy="10" stroke="#000" stroke-width="1px" fill="transparent" r="2" class="${TAG_PREFIX}vertex">
                    </circle>
                </g>
                <a>
                    <circle cx="5" cy="5" stroke="#000" stroke-width="1px" fill="transparent" r="2" class="${TAG_PREFIX}vertex">
                    </circle>
                </a>
                `
                    .replace(/[\t\n]+/g, '')
                    .replace(/\s{2,}/g, ''),
            )
        })
    })

    describe('Basic attribute methods - set/get/on', function () {
        it('set/get', function () {
            manager.clean()
            assert.equal(manager.set('x', 123).get('x'), '123')
            manager.clean()
            assert.equal(
                manager.set('d', new PathData().moveTo(10, 10)).get('d'),
                'M 10 10',
            )
            manager.clean()
            assert.equal(manager.set('width', 'test').get('width'), 'test')
        })

        it('on', function () {
            const f = (): string => 'hi'
            assert.equal(manager.on('click', f).events.length, 1)
            manager.clean()
            assert.equal(manager.on('click', f).events[0].eventName, 'click')
            manager.clean()
            assert.equal(manager.on('click', f).events[0].func, f)
            manager.clean()

            const g = (): string => 'bye'
            assert.equal(
                manager.on('click', f).on('mouseover', g).events.length,
                2,
            )

            manager.clean()

            assert.equal(
                manager.on('click', f).on('mouseover', g).events[0].eventName,
                'click',
            )

            manager.clean()

            assert.equal(
                manager.on('click', f).on('mouseover', g).events[0].func,
                f,
            )

            manager.clean()

            assert.equal(
                manager.on('click', f).on('mouseover', g).events[1].eventName,
                'mouseover',
            )

            manager.clean()

            assert.equal(
                manager.on('click', f).on('mouseover', g).events[1].func,
                g,
            )
        })
    })
})
