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

function convertDecToHexString(dec) {
    let string = Number(dec).toString(16);
    if (string.length < 2) {
        string = "0" + string;
    }
    return string;
}

function padNumberString(num, width) {
    let numString = Number(num).toString(10);
    let spaces = width - numString.length;
    for (let i = 0; i < spaces; i++) {
        numString = " " + numString;
    }
    return numString;
}

function convertRGBtoHexString(r, g, b) {
    return "#" + convertDecToHexString(r) + convertDecToHexString(g) + convertDecToHexString(b);
}

function showComparison(event)
{
  var height = canvas_one.height;
  var width = canvas_two.width;
  var widthToGrab = 1;
  var heightToGrab = 1;
  var widthToDisplay = 50;
  var heightToDisplay = 50;

  let rect = canvas_one.getBoundingClientRect();
  var x = Math.floor(event.clientX - rect.left);
  x = Math.max(0, x);
  x = Math.min(width, x);
  var y = Math.floor(event.clientY - rect.top);
  y = Math.max(0, y);
  y = Math.min(height, y);

  /*
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
  */

  // Display RGB Data
  let data_original = context_one.getImageData(0, 0, width, height);
  let data_changed = context_two.getImageData(0, 0, width, height);
  let colorIndices = getColorIndicesForCoord(x, y, width);


  let redIndex = colorIndices[0];
  let redOriginal = data_original.data[redIndex];
  let redChanged = data_changed.data[redIndex];

  let greenIndex = colorIndices[1];
  let greenOriginal = data_original.data[greenIndex];
  let greenChanged = data_changed.data[greenIndex];

  let blueIndex = colorIndices[2];
  let blueOriginal = data_original.data[blueIndex];
  let blueChanged = data_changed.data[blueIndex];

  let alphaIndex = colorIndices[3];
  let alphaOriginal = data_original.data[alphaIndex];
  let alphaChanged = data_changed.data[alphaIndex];

  context_compare.fillStyle = convertRGBtoHexString(redOriginal, greenOriginal, blueOriginal);
  context_compare.fillRect(0, 0, widthToDisplay, heightToDisplay);

  context_compare.fillStyle = convertRGBtoHexString(redChanged, greenChanged, blueChanged);
  context_compare.fillRect(widthToDisplay, 0, widthToDisplay, heightToDisplay);

  document.getElementById('original-rgb').innerHTML = '<pre><small>Red:</small><strong>' + padNumberString(redOriginal,3) + '</strong>' +
                                                      ' <small>Green:</small><strong>' + padNumberString(greenOriginal,3) + '</strong>' +
                                                      ' <small>Blue:</small><strong>' + padNumberString(blueOriginal,3) + '</strong>' +
                                                      ' <small>Alpha:</small><strong>' + padNumberString(alphaOriginal,3) + '</strong></pre>';
  document.getElementById('changed-rgb').innerHTML = '<pre><small>Red:</small><strong>' + padNumberString(redChanged,3) + '</strong>' +
                                                      ' <small>Green:</small><strong>' + padNumberString(greenChanged,3) + '</strong>' +
                                                      ' <small>Blue:</small><strong>' + padNumberString(blueChanged,3) + '</strong>' +
                                                      ' <small>Alpha:</small><strong>' + padNumberString(alphaChanged,3) + '</strong></pre>';
    // Add Coordinate Data 
  let maxWidth = Number(width).toString(10).length;
  document.getElementById('x-coordinate').innerHTML = '<pre><small>X:</small><strong>' + padNumberString(x, maxWidth) + '</strong></pre>';
  let maxHeight = Number(height).toString(10).length;
  document.getElementById('y-coordinate').innerHTML = ' <pre><small>Y:</small><strong>' + padNumberString(y, maxHeight) + '</strong></pre>';

  
}