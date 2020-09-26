# TS-SVGManager

A Typescript SVG Manager library

Provides classes used to manage interactive SVG's in the HTML DOM, minimize definitions
and make controlling the SVG elements from JS/TS as easy and reliable as possible.

Look at the [Docs](https://coastalwhite.github.io/ts-svgmanager/) for detailed information

# Installation

Install the package using npm:

```
npm install ts-svgmanager
```

# Why use SVGManager

SVGManager creates a resourceful and compact way to handle interactive SVG containers. SVGManager provides a easy way to deal with events and mentions of nodes within a SVG container, so that you can come back and adjust them.

# Getting started

## Drawing a simple Circle

Here we are going to draw a simple circle to the DOM using the manager. There are a some predeclared shapes, which can we very easily drawn using the standard functions. Here we are gonna use the standard circle.

### Code

#### HTML

In the HTML we define a container, which we can mention later within the typescript/javascript.

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

#### JS/TS

In the typescript/javascript files,
we can then initiate a manager and render a circle within that.

```typescript
import { SVGManager } from 'ts-svgmanager'
import { circle } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager to the container
const manager = new SVGManager().init('svg-root')

// Render a circle with a radius of 25 at (50, 50)
manager.render(circle(25, 50, 50))
```

This will look like:\
<svg viewBox="0 0 100 100" width="200px" height="200px"><defs></defs><circle cx="50" cy="50" stroke="#000" stroke-width="1px" fill="transparent" r="25"></circle></svg>

## Drawing a Pentagon

Now we going to draw a bit more difficult of a shape a pentagon.

#### JS/TS

```typescript
import { SVGManager } from 'ts-svgmanager'
import { polygon } from 'ts-svgmanager/Shapes'

// Again we initialize the SVGManager
const manager = new SVGManager().init('svg-root')

// Then we render a pentagon
manager.render(
    polygon([
        { x: 20, y: 10 },
        { x: 80, y: 10 },
        { x: 95, y: 60 },
        { x: 50, y: 95 },
        { x: 5, y: 60 },
    ]),
)
```

This will look like:

<svg viewBox="0 0 100 100" width="200px" height="200px"><defs></defs><polygon points="20,10 80,10 95,60 50,95 5,60" stroke="#000" stroke-width="1px" fill="none"></polygon></svg>

### Adding a gradient

If we want to add a gradient a background we use the `Gradient` Helper. This will turn the code into this:

```ts
import { SVGManager } from 'ts-svgmanager'
import { polygon } from 'ts-svgmanager/Shapes'
import { SVGLinGradient, SVGStops } from 'ts-svgmanager/helpers'

// Again we initialize the SVGManager
const manager = new SVGManager().init('svg-root')

// Define a gradient into the manager using the Gradient Helper
const blueGradient = manager.define(
    new SVGLinGradient(
        new SVGStops()
            .stop(0, 'rgb(72, 60, 102)')
            .stop(1, 'rgb(136, 169, 197)'),
    )
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(0.87)
        .y2(1.11),
)

// Render a pentagon with a custom fill
manager.render(
    polygon([
        { x: 20, y: 10 },
        { x: 80, y: 10 },
        { x: 95, y: 60 },
        { x: 50, y: 95 },
        { x: 5, y: 60 },
    ]),
    .fillDef(blueGradient),
)
```

This will look like:

<svg viewBox="0 0 100 100" width="200px" height="200px" id="da4e02e5-0d6e-4489-9588-2e2a1d817750"><defs><linearGradient spreadMethod="pad" x1="0" y1="0" x2="0.87" y2="1.11" id="da4e02e5-0d6e-4489-9588-2e2a1d817750-figure-d92127dd23da8bb191026709bdd7538c"><stop offset="0" stop-color="rgb(72, 60, 102)"></stop><stop offset="1" stop-color="rgb(136, 169, 197)"></stop></linearGradient></defs><polygon points="20,10 80,10 95,60 50,95 5,60" stroke="#000" stroke-width="1px" fill="url(#da4e02e5-0d6e-4489-9588-2e2a1d817750-figure-d92127dd23da8bb191026709bdd7538c)"></polygon></svg>

### Adding animations

Now we are gonna add animations to a shape. The `Animate` Helper will help a lot with this. We are gonna use the ellipse shape here.

#### JS/TS

```typescript
import { SVGManager } from 'ts-svgmanager'
import { SVGLinGradient, SVGStops, SVGAnimate } from 'ts-svgmanager/helpers'
import { ellipse } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager
const manager = new SVGManager().init('svg-root')

// We add a gradient for some color
const orangeGradient = manager.define(
    new SVGLinGradient(
        new SVGStops()
            .stop(0, 'rgb(255, 156, 96)')
            .stop(1, 'rgb(245, 125, 125)'),
    )
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(1.28)
        .y2(0.47),
)

// Render a ellipse at (50,50) and add the gradient and the animations
manager.render(
    ellipse(20, 40, 50, 50)
        .fillDef(orangeGradient)
        .animate(new SVGAnimate(2000, 'rx', [20, 40, 20]).repeatIndefinitely())
        .animate(new SVGAnimate(2000, 'ry', [40, 20, 40]).repeatIndefinitely()),
)
```

This will look like:

<svg viewBox="0 0 100 100" width="200px" height="200px">
<linearGradient spreadMethod="pad" x1="0" y1="0" x2="1.28" y2="0.47" id="e08f251a-2141-410a-b52f-4e676f4f64b9-figure-47cf6f238b093170fcb5318f004ac237"><stop offset="0" stop-color="rgb(255, 156, 96)"></stop><stop offset="1" stop-color="rgb(245, 125, 125)"></stop></linearGradient>
<ellipse cx="50" cy="50" rx="20" ry="40" stroke="#000" stroke-width="1px" fill="url(#e08f251a-2141-410a-b52f-4e676f4f64b9-figure-47cf6f238b093170fcb5318f004ac237)"><animate attributeName="rx" values="20;40;20" dur="2000ms" repeatCount="indefinite" repeatDur="indefinite"></animate><animate attributeName="ry" values="40;20;40" dur="2000ms" repeatCount="indefinite" repeatDur="indefinite"></animate></ellipse>
</svg>

## Loading from files

Now we are going to show how you could load a svg element from a file. We are going to do this using the `Parser` Helper.

#### JS/TS

```ts
import { SVGManager, SVGNode } from 'ts-svgmanager'
import { fetchSVGNode } from 'ts-svgmanager/helpers'
import { rect } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

// Fetch the SVG node from the file
fetchSVGNode('./gradient.svg').then((node: SVGNode) => {
    const blueGradient = manager.define(node)

    // Render a rect with the blue gradient
    manager.render(rect(10, 10, 80, 80).fillDef(blueGradient))
})
```

#### gradient.svg

```html
<linearGradient
    spreadMethod="pad"
    id="gradient"
    x1="0%"
    y1="0%"
    x2="87%"
    y2="111%"
>
    <stop offset="0%" style="stop-color:rgb(72, 60, 102);stop-opacity:1;" />
    <stop offset="100%" style="stop-color:rgb(136, 169, 197);stop-opacity:1;" />
</linearGradient>
```

This will look like:

<svg viewBox="0 0 100 100" id="856fb297-3d0a-49d1-882e-28d4ac43e783" width="200px" height="200px"><defs><linearGradient spreadMethod="pad" id="856fb297-3d0a-49d1-882e-28d4ac43e783-figure-14bb3f863671c3c60a7df275865f9eff" x1="0%" y1="0%" x2="87%" y2="111%"><stop offset="0%" style="stop-color:rgb(72, 60, 102);stop-opacity:1;"></stop><stop offset="100%" style="stop-color:rgb(136, 169, 197);stop-opacity:1;"></stop></linearGradient></defs><rect x="10" y="10" width="80" height="80" stroke="#000" stroke-width="1px" fill="url(#856fb297-3d0a-49d1-882e-28d4ac43e783-figure-14bb3f863671c3c60a7df275865f9eff)"></rect></svg>

### Adding events

Now we are going to add some events to this rectangle. We are going to create a mouseover event.

#### JS/TS

```typescript
import { SVGManager } from 'ts-svgmanager'
import { SVGLinGradient, SVGStops } from 'ts-svgmanager/helpers'
import { rect } from 'ts-svgmanager/Shapes'

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

const blueGradient = manager.define(
    new SVGLinGradient(
        new SVGStops()
            .stop(0, 'rgb(72, 60, 102)')
            .stop(1, 'rgb(136, 169, 197)'),
    )
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(0.87)
        .y2(1.11),
)
const orangeGradient = manager.define(
    new SVGLinGradient(
        new SVGStops()
            .stop(0, 'rgb(255, 156, 96)')
            .stop(1, 'rgb(245, 125, 125)'),
    )
        .spreadMethod('pad')
        .x1(0)
        .y1(0)
        .x2(1.28)
        .y2(0.47),
)

manager.render(
    rect(10, 10, 80, 80)
        .fillDef(blueGradient)
        .on('mouseenter', (_e, node) => node.fillDef(orangeGradient))
        .on('mouseleave', (_e, node) => node.fillDef(blueGradient)),
)
```

## Declaring custom shapes

```ts
import { SVGManager, SVGNode } from 'ts-svgmanager'
import { PathData } from 'ts-svgmanager/helpers'

// Initialize a circle with args
const pill = new SVGNode('path')
    .set(
        'd',
        new PathData()
            .moveTo(10, 40)
            .lineTo(10, 60)
            .curveTo(30, 60, 10, 70, 30, 70)
            .lineTo(30, 40)
            .curveTo(10, 40, 30, 30, 10, 30)
            .closePath(),
    )
    .stroke('#000', '1px')
    .fill('none')

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

// Render this
manager.render(pill)
```

This will look like:

<svg viewBox="5 20 50 80" 
width="200px" height="200px" id="b2361f5a-f87e-45f0-ad98-c7b8385d881b"><defs></defs><path d="M 10 40 L 10 60 C 10 70, 30 70, 30 60 L 30 40 C 30 30, 10 30, 10 40 Z" stroke="#000" stroke-width="1px" fill="none"></path></svg>

## Putting it together

We are gonna create a custom cursor for our SVG.

Here is how we do it:

```ts
import { SVGManager } from 'ts-svgmanager'
import ViewBox from 'ts-svgmanager/helpers/ViewBox'
import { circle } from 'ts-svgmanager/Shapes'

// Initializing the SVGManager with a viewBox of '-30 -30 60 60'
const manager = new SVGManager()
    .init('svg-root')
    .viewBox(new ViewBox(0, 0, 200, 200))
    .width(200)
    .height(200)
    .set('cursor', 'none')

// Rendering a circle with a radius of 5 at (0,0)
manager.render(circle(5).tag('custom-cursor').cx(-20).cy(-20))

// Adding the onmousemove listener
manager.on('mousemove', (ev: MouseEvent, svgNode) => {
    // Get the position of the SVG element
    const svgX = svgNode.element.getBoundingClientRect().x,
        svgY = svgNode.element.getBoundingClientRect().y

    // Get the x and y of the mouse relative to the SVG
    const x = ev.clientX - svgX,
        y = ev.clientY - svgY

    // Move the cursor to this location
    manager.tagged('custom-cursor').forEach((cursor) => cursor.cx(x).cy(y))
})
```

[View on CodeSandbox](https://codesandbox.io/s/ts-svgmanager-getting-started-6-77qef?file=/src/index.ts)

## Thank you for reading! Go have fun!
