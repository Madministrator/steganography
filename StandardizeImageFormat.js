// JavaScript source code

// Paint given image to canvas to standardize format
function convertImageToCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.display = none;
    //Draw the given image to canvaas, that way all images will have the same format when encrytion occurs
    //Alpha should be true
    canvas.getContext("2d", {alpha: true}).drawImage(image, 0, 0);

    return canvas;
}

//Pull the image from the canvas as a 32-bit PNG, RGBA
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}