import MoveUtil, { MoveUtilSettings } from './Move'
import ResizeUtil, { ResizeUtilSettings } from './Resize'
import HightlightUtil, { HightlightUtilSettings } from './Hightlight'

export const moving = (settings?: Partial<MoveUtilSettings>): MoveUtil =>
    new MoveUtil(settings)
export const resizing = (settings?: Partial<ResizeUtilSettings>): ResizeUtil =>
    new ResizeUtil(settings)
export const hightlighting = (
    settings?: Partial<HightlightUtilSettings>,
): HightlightUtil => new HightlightUtil(settings)
