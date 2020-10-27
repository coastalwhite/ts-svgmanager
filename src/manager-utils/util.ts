import { V2D } from '../helpers/V2D'
import { SVGViewBox } from '../helpers/ViewBox'
import { SVGManager } from '../Manager'

export function getClientSVGRect(manager: SVGManager): SVGViewBox {
    const domRect = manager.element.getBoundingClientRect()
    return new SVGViewBox(
        domRect.left,
        domRect.top,
        Math.abs(domRect.width),
        Math.abs(domRect.height),
    )
}

export function getPageSVGRect(manager: SVGManager): SVGViewBox {
    const rect = getClientSVGRect(manager).move(
        new V2D(window.scrollX, window.scrollY),
    )
    return rect
}

export function getViewBoxScale(manager: SVGManager): number {
    return (
        getClientSVGRect(manager).getDimension().x /
        readViewBox(manager).getDimension().x
    )
}

export function readViewBox(manager: SVGManager): SVGViewBox {
    const viewBox = manager.viewBox

    if (viewBox === undefined) return getPageSVGRect(manager)

    const svgRect = getClientSVGRect(manager)

    const vbWidth = viewBox.getDimension().x,
        vbHeight = viewBox.getDimension().y,
        svgWidth = svgRect.getDimension().x,
        svgHeight = svgRect.getDimension().y

    if (vbWidth / svgWidth < vbHeight / svgHeight) {
        const widthCorrection = (svgWidth / svgHeight) * vbHeight - vbWidth
        viewBox.resize(new V2D(widthCorrection, 0))
        viewBox.move(new V2D(widthCorrection / 2, 0).sca(-1))
    } else {
        const heightCorrection = (svgHeight / svgWidth) * vbWidth - vbHeight
        viewBox.resize(new V2D(0, heightCorrection))
        viewBox.move(new V2D(0, heightCorrection / 2).sca(-1))
    }

    return viewBox
}

export function getViewBoxRatio(manager: SVGManager): number {
    return 1 / getViewBoxScale(manager)
}
