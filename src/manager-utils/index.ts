import PanUtil, { PanUtilSettings } from './Pan'
import ZoomUtil, { ZoomUtilSettings } from './Zoom'
import BGPatternUtil, { BGPatternUtilSettings } from './BGPattern'

export const panning = (settings?: Partial<PanUtilSettings>): PanUtil =>
    new PanUtil(settings)
export const zooming = (settings?: Partial<ZoomUtilSettings>): ZoomUtil =>
    new ZoomUtil(settings)
export const bgPattern = (
    settings?: Partial<BGPatternUtilSettings>,
): BGPatternUtil => new BGPatternUtil(settings)
