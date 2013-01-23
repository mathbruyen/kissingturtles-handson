# Canvas slides

## HTML element

Canvas is a very simple HTML element, [well supported](http://caniuse.com/canvas) accross browsers except Internet Explorer (from version 9). It provides you with bitmap drawings, similarly to what you would do in Windows' Paint.

It has two required integer [attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas-element) (no unit): `width` and `height` which give the size of the place you will draw to. By default it matches the number of pixels used on the screen, but the actual size can be set in CSS for more responsive designs (not in pixels). Allways keep at least as many canvas pixels as CSS pixels. Too many pixels means also lower performances. Due to pixel density on retina display I set the size of the canvas to the double of the CSS pixels, but in the future there will be [canvasResolution](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#pixel-density) to be more robust.

Since it the canvas will be manipulated through javascript, we have to add a way to retrieve it, like an ID.

## Interracting with javascript

To interract with javascript we first get the HTML element.

Then we get a drawing canvas, here we use the `'2d'` context. There exists other contexts like `'webgl'` to draw more 3D-oriented [webgl](https://www.khronos.org/registry/webgl/specs/1.0/#2.1).

There are two options to deal with canvas size versus CSS size. Either retrieve the value set by the integrator and scale content to that, or overwrite attributes written in the HTML with desired values. Notice than in the latter it is good to reset these values on resize, and to redraw the content as changing attributes clears canvas.

## Basic: drawing paths

The basic of canvas is drawing paths. Canvas behaves here like a pen you move on a paper from point to point following given paths. Unit is canvas pixel.

A very important aspect is that path drawing must occur within after a `ctx.beginPath()`. This tells canvas no trying to join the previous items. Then there are a lot of possible solutions to move your pen, the main ones being `ctx.lineTo(x, y)` to move straight and `ctx.bezierCurveTo(x1, y1, x2, y2, xend, yend)` for simple Bezier curves, but there also exists `moveTo(x, y)` to go somewhere without drawing anything.

Paths can be styled with properties `strokeStyle` (color, similar to CSS color, includes alpha transparency and [gradients](http://www.w3.org/TR/2dcontext/#fill-and-stroke-styles)), `lineWidth` (thickness in pixels) and `lineCap` (extermity). By default the path is not drawn, it will only be so by calling at any moment `ctx.stroke()` method.

## Filling paths

Paths can be filled to make surfaces by choosing the color in `fillStyle` and calling the `ctx.fill()` method. The path can, but may not, be styled at the same time the surface is filled.

The `ctx.closePath()` method helps closing the path.

## Shortcut - drawing shapes

Admitedly it is tedious to draw simple shapes that way, so there exists shortcuts. But they are only shortcuts: they internally resort to path drawing with surface so calling `ctx.beginPath()` before usually helps. And they are styled with the exact same properties of paths.

The rectangle is pretty obvious with `ctx.rect(topleftx, toplefty, width, height)`.

Circle actually comes from the ability to draw an arc other a whole turn.

## Playing with origin

The second canvas primitive is changing the referential. Instead of doing complex calculation in javascript, it is sometimes easier to move the origin, rotate axes, or scale them (scaling with negative number works too).

Restoring the origin to its expected place is then tricky. Except that it is done automatically. The practice is to save the context on a stack with `ctx.save()` method, do the changes and draw the path, and then calling `ctx.restore()` method so that the canvas is restored to the previous state from the stack. Doing a referential change modifies the current state, allowing to compose transformations if every one properly restores to the context it got in entry.

Context saving also includes fill and stroke styles, so it is actually a good practice to save before modifying a style and restore after having drawn the path.

## Include an image

Including an image is as simple as creating an `Image` object with the correct source and painting it to the canvas.

Well, images are loaded asynchronously, and one must wait for it to properly load before actually drawing it. If the image is not loaded nothing is drawn on the canvas. Asynchronously also means that variables may have different values once the code is executed, that the canvas context may have been restored, and that the image may appear on top of other paths that appear to be drawn after it when looking at the code.

In practice we usually reuse a lot images and reloading it every time is costly, so the best is to keep a reference to the image (given that it is not a memory leak).

An image can only be drawn horizontally, so referential transformations comes to help for rotating it.

## How to animate

The animation algorithm is very simple: the keep the origin and destination coordinates and draw all items as if they partially moved to the end using a linear transition. There are other transitions like the ones specified for [CSS transitions](http://dev.w3.org/csswg/css3-transitions/#transition-timing-function-property).

For each frame we compute the progress ranging from 0 at the beginning to 1 at the end, and we compute the weighed average of origin and destination coordinates.

## RequestAnimationFrame

Canvas has to be drawn at each frame, the most basic way is to use `setInterval(f, 1000 / 60)` to be called 60 times per second.

However that is a bit missing respect to the user. What if the browser cannot display 60 frames per second? What if the tab is in the background and those frames will not be seen by anyone? The proper answer to this question is to ask the browser "tell me when I should redraw". And this is exactly what `requestAnimationFrame` does.

Small note on the parameter passed to the callback: [its specification changed](http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision) to allow submillisecond precision, so using it to compute durations is harder. A simple workaround is to use `Date.now()` instead of the parameter for computations. The harder way is to use a proper [shim](http://paulirish.com/2011/requestanimationframe-for-smart-animating/) for that.
