import { V2D } from '../helpers/V2D'
import { SVGViewBox } from '../helpers/ViewBox'
import { SVGLinkedNode, SVGNode } from '../nodes/Node'
import { svgRect } from '../shapes/Rectangle'
import { alternatively } from '../util/alternatively'
import { DOMDistanceToSVGDistance } from '../util/svg-coordinates/DOMToSVG'
import { ManagerUtil } from '../Utility'

export const bgPattern = (
    settings?: Partial<BGPatternUtilSettings>,
): BGPatternUtil => new BGPatternUtil(settings)

type BGPatternType = 'dotted' | 'grid' | 'rows' | 'columns'

export interface BGPatternUtilSettings {
    patternType: BGPatternType
    patternColor: string
    patternWidth: number
    patternHeight: number
    patternStrokeWidth: number
}

export default class BGPatternUtil extends ManagerUtil {
    private _bgPatternLink: SVGLinkedNode | null
    private _bgLink: SVGLinkedNode | null

    public settings: BGPatternUtilSettings

    constructor(settings?: Partial<BGPatternUtilSettings>) {
        super()
        this._bgPatternLink = null
        this._bgLink = null

        const givenSettings = settings === undefined ? {} : settings

        this.settings = {
            patternType: alternatively(givenSettings.patternType, 'grid'),
            patternWidth: alternatively(givenSettings.patternWidth, 10),
            patternHeight: alternatively(givenSettings.patternHeight, 10),
            patternColor: alternatively(givenSettings.patternColor, '#ccc'),
            patternStrokeWidth: alternatively(
                givenSettings.patternStrokeWidth,
                1,
            ),
        }
    }

    public get bgLink(): SVGLinkedNode {
        if (this._bgLink === null) throw 'Not initiated'

        return this._bgLink
    }

    public get bgPatternLink(): SVGLinkedNode {
        if (this._bgPatternLink === null) throw 'Not initiated'

        return this._bgPatternLink
    }

    public useInit(): void {
        const patternDefinition = this.manager.define(
            patternGenerator(
                this.settings.patternType,
                this.settings.patternColor,
                this.settings.patternWidth,
                this.settings.patternWidth,
                this.settings.patternStrokeWidth,
            ),
        )

        this._bgPatternLink = patternDefinition.link

        this._bgLink = this.manager.renderBefore(
            new SVGNode('rect')
                .styleSet('pointer-events', 'none')
                .fillDef(patternDefinition.id)
                .stroke('none'),
        )

        this.update()
    }

    public update(): void {
        const bb = this.manager.element.getBoundingClientRect()

        const viewBox =
            this.manager.viewBox || new SVGViewBox(0, 0, bb.width, bb.height)
        const vbPos = viewBox.getPosition()

        const svgWidth = DOMDistanceToSVGDistance(bb.width, this.manager)
        const svgHeight = DOMDistanceToSVGDistance(bb.height, this.manager)

        const width = this.settings.patternWidth
        const height = this.settings.patternHeight

        this.bgLink
            .set('width', svgWidth + width)
            .set('height', svgHeight + height)
            .x(Math.floor(vbPos.x / width) * width)
            .y(Math.floor(vbPos.y / height) * height)

        this.bgPatternLink
            .set('width', `${(width / (svgWidth + width)) * 100}%`)
            .set('height', `${(height / (svgHeight + height)) * 100}%`)
    }
}

function patternGenerator(
    type: BGPatternType,
    color: string,
    width: number,
    height: number,
    strokeWidth: number,
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

    return patternNode.set('viewBox', `0 0 ${width} ${height}`)
}

function dottedPatternNode(color: string, strokeWidth: number): SVGNode {
    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(strokeWidth, strokeWidth))
                .fill(color)
                .stroke('none'),
        )
        .set(
            'patternTransform',
            `translate(-${strokeWidth / 2},-${strokeWidth / 2})`,
        )
}

function gridPatternNode(
    color: string,
    width: number,
    height: number,
    strokeWidth: number,
): SVGNode {
    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(strokeWidth, height))
                .fill(color)
                .stroke('none'),
            svgRect(new V2D(0, 0), new V2D(width, strokeWidth))
                .fill(color)
                .stroke('none'),
        )
        .set(
            'patternTransform',
            `translate(-${strokeWidth / 2},-${strokeWidth / 2})`,
        )
}

function rowsPatternNode(
    color: string,
    width: number,
    strokeWidth: number,
): SVGNode {
    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(width, strokeWidth))
                .fill(color)
                .stroke('none'),
        )
        .set(
            'patternTransform',
            `translate(-${strokeWidth / 2},-${strokeWidth / 2})`,
        )
}

function columnsPatternNode(
    color: string,
    height: number,
    strokeWidth: number,
): SVGNode {
    return new SVGNode('pattern')
        .append(
            svgRect(new V2D(0, 0), new V2D(strokeWidth, height))
                .fill(color)
                .stroke('none'),
        )
        .set(
            'patternTransform',
            `translate(-${strokeWidth / 2},-${strokeWidth / 2})`,
        )
}
