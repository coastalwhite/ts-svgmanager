# TS-SVGManager

A Typescript SVG Manager library

Provides classes used to manage interactive SVG's in the HTML DOM, minimize definitions
and make controlling the SVG elements from JS/TS as easy and reliable as possible.

# Why use SVGManager

SVGManager creates a resourceful way to handle interactive SVG containers. A example of resourcefulness is automatically detecting similar shapes and only doing rendering calculations once. Furthermore, SVGManager provides a easy way to deal with mentions of figures within a SVG container, so that you can come back and adjust them.

# Examples

## Simple Circle

Here we are going to draw a simple circle to the DOM using the manager.\
The HTML looks like this:

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

The JS/TS looks like this:

```typescript
import { V2D, SVGManager, circle }

// Initialize the SVGManager
const manager = new SVGManager();
manager.init('svg-root')

// Render a circle with a radius of 25 at (50, 50)
manager.render(circle(25), new V2D(50, 50))
```

## Drawing a Pentagon

Here we are going to draw a Pentagom to the DOM using the manager.\
The HTML looks like this:

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

The JS/TS looks like this:

```typescript
import { V2D, SVGManager, SVGNode, PathData }

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

const gradient = 'linear-gradient(0deg, rgb(72, 60, 102) 0%, rgb(136, 169, 197) 100%)'

// Render a pentagon with a gradient at (0,0)
manager.render(
    new SVGNode('path')
        .set('d',
            new PathData()
            .moveTo(new V2D(100, 100))
            .lineTo(new V2D(300, 100))
            .lineTo(new V2D(400, 300))
            .lineTo(new V2D(200, 400))
            .lineTo(new V2D(400, 300))
            .lineTo(new V2D(200, 400))
            .closePath()
        .set('stroke', '#ccc')
        .set('stroke-width', '1px')
        .set('fill', gradient)
, new V2D(0, 0))
```

## Drawing a Moving Pentagon

Here we are going to draw a Pentagom to the DOM using the manager.\
The HTML looks like this:

```html
<body>
    <!-- ... Rest of DOM ... -->
    <div id="svg-root"></div>
    <!-- ... Rest of DOM ... -->
</body>
```

The JS/TS looks like this:

```typescript
import { V2D, SVGManager, SVGNode, PathData }

// Initialize the SVGManager
const manager = new SVGManager()
manager.init('svg-root')

const gradient = 'linear-gradient(0deg, rgb(72, 60, 102) 0%, rgb(136, 169, 197) 100%)'

// Render a pentagon with a gradient at (0,0)
manager.renderNamed(
    'pentagon',
    new SVGNode('path')
        .set('d',
            new PathData()
            .moveTo(new V2D(100, 100))
            .lineTo(new V2D(300, 100))
            .lineTo(new V2D(400, 300))
            .lineTo(new V2D(200, 400))
            .lineTo(new V2D(400, 300))
            .lineTo(new V2D(200, 400))
            .closePath()
        .set('stroke', '#ccc')
        .set('stroke-width', '1px')
        .set('fill', gradient)
, new V2D(0, 0))

let time = 0
setInterval(() => {
    const x = Math.cos(time) * 30 - 15;
    const y = Math.sin(time) * 30 - 15;

    manager.moveNamed('pentagon', new V2D(x, y))

    time += (2 * Math.PI / 1000)
}, 1)
```
