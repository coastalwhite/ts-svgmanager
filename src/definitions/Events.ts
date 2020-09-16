enum Events {
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimationElement/onbegin)
     */
    Begin = 'onbegin',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimationElement/onend)
     */
    End = 'onend',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimationElement/onrepeat)
     */
    Repeat = 'onrepeat',

    Abort = 'onabort',
    Error = 'onerror',
    Resize = 'onresize',
    Scroll = 'onscroll',
    Unload = 'onunload',

    Copy = 'oncopy',
    Cut = 'oncut',
    Paste = 'onpaste',

    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//oncancel)
     */
    Cancel = 'oncancel',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//oncanplay)
     */
    CanPlay = 'oncanplay',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//oncanplaythrough)
     */
    CanPlaythrough = 'oncanplaythrough',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onchange)
     */
    Change = 'onchange',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onclick)
     */
    Click = 'onclick',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onclose)
     */
    Close = 'onclose',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//oncuechange)
     */
    CueChange = 'oncuechange',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondblclick)
     */
    DBLClick = 'ondblclick',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondrag)
     */
    Drag = 'ondrag',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondragend)
     */
    DragEnd = 'ondragend',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondragenter)
     */
    DragEnter = 'ondragenter',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondragexit)
     */
    DragExit = 'ondragexit',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondragleave)
     */
    DragLeave = 'ondragleave',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondragover)
     */
    DragOver = 'ondragover',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondragstart)
     */
    DragStart = 'ondragstart',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondrop)
     */
    Drop = 'ondrop',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ondurationchange)
     */
    DurationChange = 'ondurationchange',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onemptied)
     */
    Emptied = 'onemptied',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onended)
     */
    Ended = 'onended',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onfocus)
     */
    Focus = 'onfocus',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//oninput)
     */
    Input = 'oninput',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//oninvalid)
     */
    Invalid = 'oninvalid',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onkeydown)
     */
    KeyDown = 'onkeydown',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onkeypress)
     */
    KeyPress = 'onkeypress',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onkeyup)
     */
    KeyUp = 'onkeyup',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onload)
     */
    Load = 'onload',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onloadeddata)
     */
    LoadedData = 'onloadeddata',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onloadedmetadata)
     */
    LoadedMetaData = 'onloadedmetadata',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onloadstart)
     */
    LoadStart = 'onloadstart',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmousedown)
     */
    MouseDown = 'onmousedown',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmouseenter)
     */
    MouseEnter = 'onmouseenter',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmouseleave)
     */
    MouseLeave = 'onmouseleave',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmousemove)
     */
    MouseMove = 'onmousemove',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmouseout)
     */
    MouseOut = 'onmouseout',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmouseover)
     */
    MouseOver = 'onmouseover',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmouseup)
     */
    MouseUp = 'onmouseup',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onmousewheel)
     */
    MouseWheel = 'onmousewheel',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onpause)
     */
    Pause = 'onpause',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onplay)
     */
    Play = 'onplay',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onplaying)
     */
    Playing = 'onplaying',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onprogress)
     */
    Progress = 'onprogress',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onratechange)
     */
    RateChange = 'onratechange',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onreset)
     */
    Reset = 'onreset',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onseeked)
     */
    Seeked = 'onseeked',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onseeking)
     */
    Seeking = 'onseeking',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onselect)
     */
    Select = 'onselect',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onshow)
     */
    Show = 'onshow',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onstalled)
     */
    Stalled = 'onstalled',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onsubmit)
     */
    Submit = 'onsubmit',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onsuspend)
     */
    Suspend = 'onsuspend',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ontimeupdate)
     */
    TimeUpdate = 'ontimeupdate',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//ontoggle)
     */
    Toggle = 'ontoggle',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onvolumechange)
     */
    VolumeChange = 'onvolumechange',
    /**
     * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers//onwaiting)
     */
    Waiting = 'onwaiting',

    Activate = 'onactivate',
    FocusIn = 'onfocusin',
    FocusOut = 'onfocusout',
}

export default Events
