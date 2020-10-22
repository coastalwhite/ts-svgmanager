import { SVGManager, SVGManagerDefinition } from '../..'
import { SVGViewBox, V2D } from '../../helpers'
import { SVGNode } from '../../nodes'
import { svgRect } from '../../shapes'
import {
    BGPatternType,
    ManagerAction,
    ManagerActionSettings,
    ManagerActionSettingsProperty,
} from '../../types'
import { alternatively } from '../../util/alternatively'
import { DOMDistanceToSVGDistance } from '../svg-coordinates/DOMToSVG'

export class BGPatternAction extends ManagerAction {
    private _patternDefinition: SVGManagerDefinition

    constructor(settings: ManagerActionSettings, manager: SVGManager) {
        super('bg-pattern', settings)

        this._patternDefinition = manager.define(
            patternGenerator(
                this.getSetting('patternType') as BGPatternType,
                this.getSetting('patternColor'),
                this.getSetting('patternWidth'),
                this.getSetting('patternHeight'),
                this.getSetting('patternStrokeWidth'),
            ),
        )

        const bb = manager.element.getBoundingClientRect()

        const viewBox =
            manager.viewBox || new SVGViewBox(0, 0, bb.width, bb.height)
        const vbPos = viewBox.getPosition()

        manager.renderFirst(
            new SVGNode('rect')
                .styleSet('pointer-events', 'none')
                .fillDef(this._patternDefinition)
                .stroke('none')
                .tag('background'),
        )

        this.update(manager)
    }

    protected getSetting(setting: ManagerActionSettingsProperty): string {
        switch (setting) {
            case 'patternColor':
                return alternatively(this._settings[setting], '#ccc')
            case 'patternType':
                return alternatively(this._settings[setting], 'grid')
            case 'patternHeight':
                return alternatively(this._settings[setting], 5).toString()
            case 'patternWidth':
                return alternatively(this._settings[setting], 5).toString()
            case 'patternStrokeWidth':
                return alternatively(this._settings[setting], 1).toString()
        }

        return ''
    }

    public update(manager: SVGManager): void {
        const bb = manager.element.getBoundingClientRect()

        const viewBox =
            manager.viewBox || new SVGViewBox(0, 0, bb.width, bb.height)
        const vbPos = viewBox.getPosition()

        const svgWidth = DOMDistanceToSVGDistance(bb.width, manager)
        const svgHeight = DOMDistanceToSVGDistance(bb.height, manager)

        const width = parseFloat(this.getSetting('patternWidth'))
        const height = parseFloat(this.getSetting('patternHeight'))

        manager.tagged('background').forEach((bg) =>
            bg
                .set('width', svgWidth + width)
                .set('height', svgHeight + height)
                .x(Math.floor(vbPos.x / width) * width)
                .y(Math.floor(vbPos.y / height) * height),
        )
        manager
            .tagged('background-pattern')
            .forEach((bgPattern) =>
                bgPattern
                    .set('width', `${(width / (svgWidth + width)) * 100}%`)
                    .set('height', `${(height / (svgHeight + height)) * 100}%`),
            )
    }
}

function patternGenerator(
    type: BGPatternType,
    color: string,
    width: string,
    height: string,
    strokeWidth: string,
): SVGNode {
    let patternNode: SVGNode

    switch (type) {
        case 'dotted':
            patternNode = dottedPatternNode(color, strokeWidth)
            break
        case 'grid':
            patternNode = gridPatternNode(color, width, height, strokeWidth)
            break
        case 'rows':
            patternNode = rowsPatternNode(color, width, strokeWidth)
            break
        case 'columns':
            patternNode = columnsPatternNode(color, height, strokeWidth)
            break
    }

    return patternNode
        .set('viewBox', `0 0 ${width} ${height}`)
        .tag('background-pattern')
}

function dottedPatternNode(color: string, strokeWidth: string): SVGNode {
    const width = parseFloat(strokeWidth)

    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(width, width))
                .fill(color)
                .stroke('none'),
        )
        .set('patternTransform', `translate(-${width / 2},-${width / 2})`)
}

function gridPatternNode(
    color: string,
    width: string,
    height: string,
    strokeWidth: string,
): SVGNode {
    const strWidth = parseFloat(strokeWidth)

    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(strWidth, parseFloat(height)))
                .fill(color)
                .stroke('none'),
            svgRect(new V2D(0, 0), new V2D(parseFloat(width), strWidth))
                .fill(color)
                .stroke('none'),
        )
        .set('patternTransform', `translate(-${strWidth / 2},-${strWidth / 2})`)
}

function rowsPatternNode(
    color: string,
    width: string,
    strokeWidth: string,
): SVGNode {
    const strWidth = parseFloat(strokeWidth)

    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(parseFloat(width), strWidth))
                .fill(color)
                .stroke('none'),
        )
        .set('patternTransform', `translate(-${strWidth / 2},-${strWidth / 2})`)
}

function columnsPatternNode(
    color: string,
    height: string,
    strokeWidth: string,
): SVGNode {
    const strWidth = parseFloat(strokeWidth)

    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(strWidth, parseFloat(height)))
                .fill(color)
                .stroke('none'),
        )
        .set('patternTransform', `translate(-${strWidth / 2},-${strWidth / 2})`)
}
