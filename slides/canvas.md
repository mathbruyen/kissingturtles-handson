# Canvas slides

## HTML element

Canvas is a very simple HTML element, [well supported](http://caniuse.com/canvas) accross browsers except Internet Explorer (from version 9). It provides you with bitmap drawings, similarly to what you would do in Windows' Paint.

It has two required integer [attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas-element) (no unit): `width` and `height` which give the size of the place you will draw to. By default it matches the number of pixels used on the screen, but the actual size can be set in CSS for more responsive designs (not in pixels). Due to pixel density on retina display I set the size of the canvas to the double of the CSS pixels, but in the future there will be [canvasResolution](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#pixel-density) to be more robust.

Since it the canvas will be manipulated through javascript, we have to add a way to retrieve it, like an ID.