var canvas_one, context_one, canvas_two, context_two, canvas_compare, context_compare;

function initializeMouseMove()
{
  canvas_one = document.getElementById("original");
  context_one = canvas_one.getContext("2d");
  
  canvas_two = document.getElementById("changed");
  context_two = canvas_two.getContext("2d");
  
  canvas_compare = document.getElementById("comparison");
  context_compare = canvas_compare.getContext("2d");
  
  canvas_one.addEventListener('mousemove', showComparison);
}

function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function showComparison(event)
{
  var height = canvas_one.height;
  var width = canvas_two.width;
  var widthToGrab = 1;
  var heightToGrab = 1;
  var widthToDisplay = 50;
  var heightToDisplay = 50;
  var x = event.layerX;
  var y = event.layerY;

  // Display the pixels
  context_compare.drawImage(canvas_one,
                            Math.min(Math.max(0, x - 5), width - widthToGrab), // Don't go over the edge when clipping
                            Math.min(Math.max(0, y - 5), height - heightToGrab), // Ditto
                            widthToGrab, heightToGrab, // The actual size to grab *in example, one pixel*
                            0, 0, // Top corner
                            widthToDisplay, heightToDisplay);
  context_compare.drawImage(canvas_two, // The canvas to compare to
                              Math.min(Math.max(0, x - 5), width - widthToGrab),// Don't go over the edge when clipping
                              Math.min(Math.max(0, y - 5), height - heightToGrab), // Ditto
                              widthToGrab, heightToGrab, // The actual size to grab *in example, one pixel*
                              widthToDisplay, 0, // Right after the first one
                              widthToDisplay, heightToDisplay);

  // Display RGB Data
  let data_original = context_one.getImageData(0, 0, width, height);
  let data_changed = context_two.getImageData(0, 0, width, height);
  let colorIndices = getColorIndicesForCoord(x, y, width);
  let redIndex = colorIndices[0];
  let greenIndex = colorIndices[1];
  let blueIndex = colorIndices[2];
  let alphaIndex = colorIndices[3];

  document.getElementById('original-rgb').innerHTML = 'Red: ' + data_original.data[redIndex] + 
                                                      ' Green: ' + data_original.data[greenIndex] +
                                                      ' Blue: ' + data_original.data[blueIndex] +
                                                      ' Alpha: ' + data_original.data[alphaIndex];
  document.getElementById('changed-rgb').innerHTML = 'Red: ' + data_changed.data[redIndex] + 
                                                      ' Green: ' + data_changed.data[greenIndex] +
                                                      ' Blue: ' + data_changed.data[blueIndex] +
                                                      ' Alpha: ' + data_changed.data[alphaIndex];
  // Add Coordinate Data    
  document.getElementById('x-coordinate').innerHTML = 'X: ' + x;
  document.getElementById('y-coordinate').innerHTML = 'Y: ' + y;

  
}