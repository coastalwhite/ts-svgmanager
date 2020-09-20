import { assert } from 'chai'
import { SVGAttr, SVGTag } from '../src/definitions'
import SVGManager from '../src/SVGManager'
import SVGNode from '../src/SVGNode'
import V2D from '../src/V2D'

document.body.innerHTML = '<div id="root"></div>'

let root = document.getElementById('root')

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

            manager.set(SVGAttr.Width, '700px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="700px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set(SVGAttr.Height, '300px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="700px" height="300px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set(SVGAttr.Width, '500px')

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="0 0 100 100" width="500px" height="300px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.set(SVGAttr.Height, '500px')

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

            manager.viewBox = manager.viewBox.move(new V2D(10, 10))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="10 10 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(new V2D(-6, -4))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="4 6 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(new V2D(-10, -10))

            assert.equal(
                root.innerHTML,
                `
                <svg viewBox="-6 -4 100 100" width="500px" height="500px" id="${manager_id}">
                    <defs>
                    </defs>
                </svg>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.viewBox = manager.viewBox.move(new V2D(6, 4))

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

            manager.ensureDefinition(new SVGNode(SVGTag.G))

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
                new SVGNode(SVGTag.A)
                    .set(SVGAttr.AttributeName, 'test_value')
                    .setText('Testing text!')
                    .name('test_render'),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" id="${manager_id}-named-test_render">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.clean()

            manager.render(
                new SVGNode(SVGTag.A)
                    .set(SVGAttr.AttributeName, 'test_value 1')
                    .name('test_render')
                    .setXY(new V2D(7, 24))
                    .setText('Testing text!'),
            )

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value 1" x="7" y="24" id="${manager_id}-named-test_render">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to ensure definitions', function () {
            manager.clean()

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.ensureDefinition(test_node)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attributeName="test_value" id="${manager.id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render items', function () {
            manager.clean()

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.render(test_node.setXY(new V2D(7, 24)))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    
                </defs>
                <a attributeName="test_value" x="7" y="24">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render multiple items', function () {
            manager.clean()

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let test_node_2 = new SVGNode(SVGTag.G)
                .set(SVGAttr.AttributeName, 'value')
                .setText('text value')

            let hash = test_node.toHash()
            let hash_2 = test_node_2.toHash()

            manager.render(test_node.setXY(new V2D(5, 6)))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" x="5" y="6">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            manager.render(test_node_2.setXY(new V2D(2, 10)))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `<defs>
                </defs>
                <a attributeName="test_value" x="5" y="6">
                    Testing text!
                </a>
                <g attributeName="value" x="2" y="10">
                    text value
                </g>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render a named item', function () {
            manager.clean()

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.render(test_node.setXY(new V2D(5, 6)).name('test_item'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" id="${manager_id}-named-test_item" x="5" y="6">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to remove a named item', function () {
            manager.clean()

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.render(test_node.setXY(new V2D(5, 6)).name('test_item'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" id="${manager_id}-named-test_item" x="5" y="6">
                    Testing text!
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

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.render(test_node.setXY(new V2D(5, 6)).name('test_item'))

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" id="${manager_id}-named-test_item" x="5" y="6">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )

            const item = manager.fetchNamed('test_item')
            if (item === null) return
            item.setAttribute(SVGAttr.X, '10')
            item.setAttribute(SVGAttr.Y, '30')

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                </defs>
                <a attributeName="test_value" id="${manager_id}-named-test_item" x="10" y="30">
                    Testing text!
                </a>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })

        it('Should be able to render from id', function () {
            manager.clean()

            let test_node = new SVGNode(SVGTag.A)
                .set(SVGAttr.AttributeName, 'test_value')
                .setText('Testing text!')

            let hash = test_node.toHash()

            manager.ensureDefinition(test_node)

            assert.equal(
                (root.firstChild as SVGElement).innerHTML,
                `
                <defs>
                    <a attributeName="test_value" id="${manager_id}-figure-${hash}">
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
                    <a attributeName="test_value" id="${manager_id}-figure-${hash}">
                        Testing text!
                    </a>
                </defs>
                <use href="#${manager_id}-figure-${hash}" x="23" y="55"></use>
                `.replace(/  |\r\n|\n|\r/gm, ''),
            )
        })
    })
})
