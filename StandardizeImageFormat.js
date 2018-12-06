/**
	@summary	this function will take an image object (be it in PNG, JPEG, or other file format)
				and create a canvas object on the HTML page, making its display invisible so that 
				it does not effect the page content. Once the canvas object is created, we print
				all the pixels in the passed image to the canvas, then the canvas element is returned.
				This function is built to be used in companion with convertCanvasToImage(canvas).
	@brief		Takes an image object and displays it on an invisble canvas object
	@param	image	an image object
	@return	a canvas HTML element which is both invisible and is displaying the passed image object.
*/
function convertImageToCanvas(image) {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
}

/**
	@summary	this function will take a canvas HTML element and retrieve the data within it. As
				the canvas standard retrieved is a 24-bit PNG image with alpha channel (also known
				as a 32-bit PNG image) this is the standardized file format retrieved. This function
				is built to be used in companion with convertImageToCanvas(image).
	@brief		takes an canvas HTML element and retrieves the image displayed on it.
	@param	canvas	a canvas HTML element which should contain image data within it.
	@return	a 32-bit PNG image object
*/
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function convertImageToBasicImage(image) {
    let canvas = convertImageToCanvas(image);
    let width = image.width;
    let height = image.height;
    let data = canvas.getContext("2d").getImageData(0, 0, width, height);
    return new BasicImage(width, height, data.data);
}

function convertBasicImageToImage(basicImage) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = basicImage.width;
    canvas.height = basicImage.height;
    let data = new ImageData(basicImage.data, basicImage.width, basicImage.height);
    context.putImageData(data, 0, 0);

    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
}