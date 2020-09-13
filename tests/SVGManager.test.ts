import { assert } from 'chai'
import SVGManager from '../src/SVGManager'
import SVGNode from '../src/SVGNode'
import V2D from '../src/V2D'

document.body.innerHTML = '<div id="root"></div>'

let root = document.getElementById('root')

describe('SVG Manager', function () {
    const manager = new SVGManager()
    const manager_id = manager.id()
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

            manager.setWidth(700)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="700px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.setHeight(300)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="700px" height="300px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.setWidth(500)

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="300px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.setHeight(500)

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

            manager.moveViewBox(new V2D(10, 10))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="10 10 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.moveViewBox(new V2D(-6, -4))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="4 6 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.moveViewBox(new V2D(-10, -10))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="-6 -4 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.moveViewBox(new V2D(6, 4))

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

            manager.ensureDefinition(new SVGNode('hi'))

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

            manager.seperateRenderNamed(
                'test_render',
                new SVGNode('a')
                    .set('attribute', 'test_value')
                    .setText('Testing text!'),
                new V2D(0, 0),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attribute="test_value" id="${manager_id}-named-test_render" x="0" y="0">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.clean()

            manager.seperateRenderNamed(
                'test_render',
                new SVGNode('a')
                    .set('attribute', 'test_value 1')
                    .setText('Testing text!'),
                new V2D(7, 24),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attribute="test_value 1" id="${manager_id}-named-test_render" x="7" y="24">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to ensure definitions', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.ensureDefinition(test_node)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render items', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.render(test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render multiple items', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let test_node_2 = new SVGNode('b')
                .set('test', 'value')
                .setText('text value')

            let hash = test_node.toHash()
            let hash_2 = test_node_2.toHash()

            manager.render(test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.render(test_node_2, new V2D(2, 10))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `<defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                    <b test="value" id="${manager_id}-figure-${hash_2}">
                        text value
                    </b>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6"></use>
                <use href="#${manager_id}-figure-${hash_2}" x="2" y="10"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to detect rendering the same item', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let test_node_2 = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            assert.equal(hash, test_node_2.toHash())

            manager.render(test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.render(test_node_2, new V2D(2, 10))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `<defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6"></use>
                <use href="#${manager_id}-figure-${hash}" x="2" y="10"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render a named item', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.renderNamed('test_item', test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6" id="${manager_id}-named-test_item"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to remove a named item', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.renderNamed('test_item', test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6" id="${manager_id}-named-test_item"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.removeNamed('test_item')

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to move a named item', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.renderNamed('test_item', test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6" id="${manager_id}-named-test_item"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.moveNamed('test_item', new V2D(10, 30))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="10" y="30" id="${manager_id}-named-test_item"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it("Should be able to fetch a named item's position", function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.renderNamed('test_item', test_node, new V2D(5, 6))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="5" y="6" id="${manager_id}-named-test_item"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            assert.isTrue(
                manager.fetchNamedLocation('test_item').equals(new V2D(5, 6)),
            )

            manager.moveNamed('test_item', new V2D(10, 30))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="10" y="30" id="${manager_id}-named-test_item"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            assert.isTrue(
                manager.fetchNamedLocation('test_item').equals(new V2D(10, 30)),
            )
        })

        it('Should be able to render from id', function () {
            manager.clean()

            let test_node = new SVGNode('a')
                .set('attribute', 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.ensureDefinition(test_node)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.renderId(hash, new V2D(23, 55))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attribute="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="23" y="55"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })
    })
})
