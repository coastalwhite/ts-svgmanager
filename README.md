# TS-SVGManager

A Typescript SVG Manager library

Provides classes used to manage interactive SVG's in the HTML DOM, minimize definitions
and make controlling the SVG elements from JS/TS as easy and reliable as possible.

Look at the [Docs](https://coastalwhite.github.io/ts-svgmanager/) for detailed information

# Installation

Install the package using npm:

```
npm i ts-svgmanager
```

Install the typescript types:

```
npm i --save-dev @types/ts-svgmanager
```

# Why use SVGManager

SVGManager creates a resourceful way to handle interactive SVG containers. A example of resourcefulness is automatically detecting similar shapes and only doing rendering calculations once. Furthermore, SVGManager provides a easy way to deal with mentions of figures within a SVG container, so that you can come back and adjust them.

# Examples

## Simple Circle

Here we are going to draw a simple circle to the DOM using the manager.

### Code

#### HTML

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

#### JS/TS

```typescript
import { V2D, SVGManager, circle }

// Initialize the SVGManager
const manager = new SVGManager();
manager.init('svg-root')

// Render a circle with a radius of 25 at (50, 50)
manager.render(circle(25), new V2D(50, 50))
```

### Outcome

<img src="https://raw.githubusercontent.com/coastalwhite/ts-svgmanager/master/readme-content/figures/circle.png" alt="circle" width="200"/>

## Drawing a Pentagon

Here we are going to draw a Pentagom to the DOM using the manager.

### Code

#### HTML

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

#### JS/TS

```typescript
import { V2D, SVGAttr, SVGTag, SVGManager, SVGNode, PathData }

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(new V2D(500, 500))

const gradient = new SVGNode(SVGTag.LinearGradient)
    .set(SVGAttr.SpreadMethod, 'pad')
    .set(SVGAttr.X1, '0%')
    .set(SVGAttr.Y1, '0%')
    .set(SVGAttr.X2, '87%')
    .set(SVGAttr.Y2, '111%')
    .append(
        new SVGNode(SVGTag.Stop)
            .set(SVGAttr.Offset, '0%')
            .set(
                SVGAttr.Style,
                'stop-color:rgb(72, 60, 102);stop-opacity:1;',
            ),
    )
    .append(
        new SVGNode(SVGTag.Stop)
            .set(SVGAttr.Offset, '100%')
            .set(
                SVGAttr.Style,
                'stop-color:rgb(136, 169, 197);stop-opacity:1;',
            ),
    )

// Render a pentagon with a gradient at (0,0)
const gradientId = manager.ensureDefinition(gradient)
manager.renderNamed(
    'pentagon',
    new SVGNode(SVGTag.Path)
        .set(
            SVGAttr.D,
            new PathData()
                .moveTo(100, 100)
                .lineTo(300, 100)
                .lineTo(400, 300)
                .lineTo(200, 475)
                .lineTo(0, 300)
                .closePath()
                .toString(),
        )
        .set(SVGAttr.Stroke, '#ccc')
        .set(SVGAttr.StrokeWidth, '1px')
        .set(
            SVGAttr.Fill,
            `url(#${manager.mentionDefinition(gradientId)})`,
        ),
    new V2D(0, 0),
)
```

### Outcome

<img src="https://raw.githubusercontent.com/coastalwhite/ts-svgmanager/master/readme-content/figures/pentagon.png" alt="pentagon" width="200"/>

## Drawing a Moving Pentagon

Here we are going to draw a Pentagom to the DOM using the manager and make it move.

### Code

#### HTML

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

#### JS/TS

```typescript
import { V2D, SVGManager, SVGAttr, SVGTag, SVGNode, PathData }

// Initialize the SVGManager
const manager = new SVGManager()

manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(new V2D(500, 500))

const gradient = new SVGNode(SVGTag.LinearGradient)
    .set(SVGAttr.SpreadMethod, 'pad')
    .set(SVGAttr.X1, '0%')
    .set(SVGAttr.Y1, '0%')
    .set(SVGAttr.X2, '87%')
    .set(SVGAttr.Y2, '111%')
    .append(
        new SVGNode(SVGTag.Stop)
            .set(SVGAttr.Offset, '0%')
            .set(
                SVGAttr.Style,
                'stop-color:rgb(72, 60, 102);stop-opacity:1;',
            ),
    )
    .append(
        new SVGNode(SVGTag.Stop)
            .set(SVGAttr.Offset, '100%')
            .set(
                SVGAttr.Style,
                'stop-color:rgb(136, 169, 197);stop-opacity:1;',
            ),
    )

// Render a pentagon with a gradient at (0,0)
const gradientId = manager.ensureDefinition(gradient)
manager.renderNamed(
    'pentagon',
    new SVGNode(SVGTag.Path)
        .set(
            SVGAttr.D,
            new PathData()
                .moveTo(100, 100)
                .lineTo(300, 100)
                .lineTo(400, 300)
                .lineTo(200, 475)
                .lineTo(0, 300)
                .closePath()
                .toString(),
        )
        .set(SVGAttr.Stroke, '#ccc')
        .set(SVGAttr.StrokeWidth, '1px')
        .set(
            SVGAttr.Fill,
            `url(#${manager.mentionDefinition(gradientId)})`,
        ),
    new V2D(0, 0),
)

let time = 0
setInterval(() => {
    const x = Math.cos(time) * 30 - 15
    const y = Math.sin(time) * 30 - 15

    manager.moveNamed('pentagon', new V2D(x, y))

    time += (2 * Math.PI) / 1000
}, 1)
```

### Outcome

<img src="https://raw.githubusercontent.com/coastalwhite/ts-svgmanager/master/readme-content/figures/moving-pentagon.gif" alt="moving-pentagon" width="200"/>

## Loading from a file

Here we are going to load a linear gradient and apply it to a Pentagon to the DOM using the manager.

### Code

#### HTML

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

#### JS/TS

```typescript
import { V2D, SVGManager, SVGNode, PathData }

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(new V2D(500, 500))

fetchSVGNode('./svg/gradient.svg').then((gradient: SVGNode) => {
    // Render a pentagon with a gradient at (0,0)
    const gradientId = manager.ensureDefinition(gradient)
    manager.renderNamed(
        'pentagon',
        new SVGNode(SVGTag.Path)
            .set(
                SVGAttr.D,
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 475)
                    .lineTo(0, 300)
                    .closePath()
                    .toString(),
            )
            .set(SVGAttr.Stroke, '#ccc')
            .set(SVGAttr.StrokeWidth, '1px')
            .set(
                SVGAttr.Fill,
                `url(#${manager.mentionDefinition(gradientId)})`,
            ),
        new V2D(0, 0),
    )
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

### Outcome

<img src="https://raw.githubusercontent.com/coastalwhite/ts-svgmanager/master/readme-content/figures/pentagon.png" alt="pentagon" width="200"/>

## Adding events

Here we are going to draw a Pentagon to the DOM using the manager and adding events onto it.

### Code

#### HTML

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

#### JS/TS

```typescript
import { V2D, SVGManager, SVGNode, PathData }

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')
manager.viewBox = manager.viewBox.setDimensions(new V2D(500, 500))

Promise.all([
        fetchSVGNode('./svg/gradient.svg'),
        fetchSVGNode('./svg/gradient2.svg'),
    ]).then((gradients: SVGNode[]) => {
        const gradient1Id = manager.ensureDefinition(gradients[0]),
            gradient2Id = manager.ensureDefinition(gradients[1])

        const gradient1URL = `url(#${manager.mentionDefinition(gradient1Id)})`,
            gradient2URL = `url(#${manager.mentionDefinition(gradient2Id)})`

    manager.renderNamed(
        'pentagon',
        new SVGNode(SVGTag.Path)
            .set(
                SVGAttr.D,
                new PathData()
                    .moveTo(100, 100)
                    .lineTo(300, 100)
                    .lineTo(400, 300)
                    .lineTo(200, 475)
                    .lineTo(0, 300)
                    .closePath()
                    .toString(),
            )
            .set(SVGAttr.Stroke, '#ccc')
            .set(SVGAttr.StrokeWidth, '1px')
            .set(
                SVGAttr.Fill,
                gradient1URL,
            ).addEvent(SVGEvent.MouseEnter, (e) => {
                manager.adjustNamedAttr(
                    'pentagon',
                    SVGAttr.Fill,
                    gradient2URL,
                )
            })
            .addEvent(SVGEvent.MouseLeave, (e) => {
                manager.adjustNamedAttr(
                    'pentagon',
                    SVGAttr.Fill,
                    gradient1URL,
                )
            }),
        new V2D(0, 0),
    )
})
```

#### gradient1.svg

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

#### gradient2.svg

```html
<linearGradient spreadMethod="pad" x1="0%" y1="0%" x2="128%" y2="47%">
    <stop offset="0%" style="stop-color:rgb(255, 156, 96);stop-opacity:1;" />
    <stop offset="100%" style="stop-color:rgb(245, 125, 125);stop-opacity:1;" />
</linearGradient>
```

### Outcome

<img src="https://raw.githubusercontent.com/coastalwhite/ts-svgmanager/master/readme-content/figures/event-pentagon.gif" alt="pentagon" width="200"/>
