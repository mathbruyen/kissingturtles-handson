/**
 * Function that draws a single frame.
 *
 * Help:
 *
 * canvas.getContext('2d')
 * ctx.beginPath()
 * ctx.fillStyle/strokeStyle = 'red' | 'rgb(250, 30, 120)' | 'rgba(250, 30, 120, 0.5)'
 * ctx.lineWidth = 3
 * ctx.moveTo(x, y)
 * ctx.lineTo(x, y)
 * ctx.closePath()
 * ctx.fill()
 * ctx.stroke()
 * ctx.rect(x, y, w, h)
 * ctx.arc(x, y, r, startangle, endangle)
 *
 * ctx.save()
 * ctx.restore()
 * ctx.translate(x, y)
 * ctx.scale(xs, ys)
 * ctx.rotate(a)
 * ctx.drawImage(img, x, y, w, h)
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 * @param preloaded preloaded content.
 * @param objects the objects to draw.
 **/
window.ktDrawFrame = (function() {
  return function(canvas, grid, preloaded, objects) {
    //TODO
  };
})();
