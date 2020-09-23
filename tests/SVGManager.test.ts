import { assert } from 'chai'
import SVGManager from '../src/SVGManager'
import SVGNode from '../src/SVGNode'

document.body.innerHTML = '<div id="root"></div>'

const root = document.getElementById('root')

describe('SVG Manager', function () {
    const manager = new SVGManager()
    const manager_id = manager.id
    manager.init('root')

    describe('Basic Setup and Settings', function () {
        it('Should be that initialization adds a def tag', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to change dimensions of the svg root', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set('width', '700px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="700px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set('height', '300px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="700px" height="300px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set('width', '500px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="300px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set('height', '500px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to move the viewbox', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(10, 10)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="10 10 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(-6, -4)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="4 6 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(-10, -10)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="-6 -4 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(6, 4)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to clean', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.ensureDefinition(new SVGNode('g'))

            assert.notEqual(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to remove', function () {
            manager.clean()

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.remove()

            assert.equal(root.innerHTML, ``.replace(/  |\r\n|\n|\r/gm, ''))

            manager.init('root')
        })
    })

    describe('Rendering', function () {
        it('Should be able to seperate render', function () {
            manager.clean()

            manager.render(
                new SVGNode('a')
                    .set('attributeName', 'test_value')
                    .name('test_render'),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" class="${manager_id}-named-test_render">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.clean()

            manager.render(
                new SVGNode('a')
                    .set('attributeName', 'test_value 1')
                    .name('test_render')
                    .x(7)
                    .y(24),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value 1" x="7" y="24" class="${manager_id}-named-test_render">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to ensure definitions', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            const hash = test_node.toHash()

            manager.ensureDefinition(test_node)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attributeName="test_value" id="${manager.id}-figure-${hash}">
                    </a>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render items', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            manager.render(test_node.x(7).y(24))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    
                </defs>
                <a attributeName="test_value" x="7" y="24">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render multiple items', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            const test_node_2 = new SVGNode('g').set('attributeName', 'value')

            manager.render(test_node.x(5).y(6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" x="5" y="6">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.render(test_node_2.x(2).y(10))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `<defs>
                </defs>
                <a attributeName="test_value" x="5" y="6">
                </a>
                <g attributeName="value" x="2" y="10">
                </g>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render a named item', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            manager.render(test_node.x(5).y(6).name('test_item'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" x="5" y="6" class="${manager_id}-named-test_item">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to remove a named item', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            manager.render(test_node.x(5).y(6).name('test_item'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" x="5" y="6" class="${manager_id}-named-test_item">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.removeNamed('test_item')

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to move a named item', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            manager.render(test_node.x(5).y(6).name('test_item'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" x="5" y="6" class="${manager_id}-named-test_item">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            const item = manager.fetchNamed('test_item')
            item.x(10).y(30)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" x="10" y="30" class="${manager_id}-named-test_item">
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render from id', function () {
            manager.clean()

            const test_node = new SVGNode('a').set(
                'attributeName',
                'test_value',
            )

            const hash = manager.ensureDefinition(test_node)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attributeName="test_value" id="${hash}">
                    </a>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.renderId(hash, {
                attributes: [
                    { attrName: 'x', attrValue: 23 },
                    { attrName: 'y', attrValue: 55 },
                ],
            })

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attributeName="test_value" id="${hash}">
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="23" y="55"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })
    })
})
