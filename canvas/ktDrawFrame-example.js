/**
 * Function that draws a single frame.
 *
 * @param canvas the canvas to draw to.
 * @param grid the size of the grid.
 * @param objects the objects to draw.
 **/
window.ktDrawFrame = (function() {
  return function(canvas, grid, objects) {
    var ctx = canvas.getContext('2d');
    ctx.scale(canvas.width / grid, canvas.height / grid);
    ctx.translate(1/2, 1/2);
    function draw(object) {
      var img = new Image();
      img.onload = function () {
        ctx.save();
        ctx.translate(object.x, grid - 1 - object.y);
        ctx.rotate(object.rotation);
        ctx.drawImage(img, -1/2, -1/2, 1, 1);
        ctx.restore();
      };
      img.src = 'images/' + object.role + '.png';
    }
    for (var name in objects) {
      if (objects.hasOwnProperty(name)) {
        draw(objects[name]);
      }
    }
  };
})();