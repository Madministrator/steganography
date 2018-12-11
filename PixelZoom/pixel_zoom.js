var canvas_one = document.getElementById("image_one");
var context_one = canvas_one.getContext("2d");

var image_one = document.createElement('img');
image_one.src = "image_one.jpg";
image_one.onload = function () {
  draw(image_one, context_one);
}


var canvas_two = document.getElementById("image_two");
var context_two = canvas_two.getContext("2d");

var image_two = document.createElement('img');
image_two.src = "image_two.jpg";
image_two.onload = function () {
  draw(image_two, context_two);
}

var canvas_compare = document.getElementById("comparison");
var context_compare = canvas_compare.getContext("2d");

canvas_one.addEventListener('mousemove', showComparison);

function draw(img, context) {
  context.drawImage(img, 0, 0);
}

function showComparison(event)
{
  var widthToGrab = 1;
  var heightToGrab = 1;
  var widthToDisplay = 50;
  var heightToDisplay = 50;
  var x = event.layerX;
  var y = event.layerY;
  context_compare.drawImage(canvas_one,
                            Math.min(Math.max(0, x - 5), image_one.width - widthToGrab), // Don't go over the edge when clipping
                            Math.min(Math.max(0, y - 5), image_one.height - heightToGrab), // Ditto
                            widthToGrab, heightToGrab, // The actual size to grab *in example, one pixel*
                            0, 0, // Top corner
                            widthToDisplay, heightToDisplay);
  context_compare.drawImage(canvas_two, // The canvas to compare to
                              Math.min(Math.max(0, x - 5), image_two.width - widthToGrab),// Don't go over the edge when clipping
                              Math.min(Math.max(0, y - 5), image_two.height - heightToGrab), // Ditto
                              widthToGrab, heightToGrab, // The actual size to grab *in example, one pixel*
                              widthToDisplay, 0, // Right after the first one
                              widthToDisplay, heightToDisplay);
}