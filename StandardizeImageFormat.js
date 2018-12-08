
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

/**
    @summary  This function coverts an Image into a BasicImage. 
              NOTE: This function is NOT lossless! 
              Do not use it when you need pixel perfect accuracy. 
    @brief  Converts inputted Image parameter to a returned BasicImage
    @param  image  (https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
    @return BasicImage (from BasicImage.js)
*/
function convertImageToBasicImage(image) {
    let canvas = convertImageToCanvas(image);
    let width = image.width;
    let height = image.height;
    let data = canvas.getContext("2d").getImageData(0, 0, width, height);
    return new BasicImage(width, height, data.data);
}

/**
    @summary  Uses the UPNG library (https://github.com/photopea/UPNG.js) 
              to decode a raw PNG File into a BasicImage.
              This is performed as an async operation returning a Promise.
              This is a pixel perfect operation.
    @brief  Converts inputted File containing raw PNG data to returned Promise of BasicImage.
    @param  file (https://developer.mozilla.org/en-US/docs/Web/API/File)
    @return Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
            of BasicImage (from BasicImage.js)
*/
async function convertFileToBasicImage(file) {
    return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function(event) {
            let image = UPNG.decode(reader.result);
            let unFormattedData = UPNG.toRGBA8(image)[0];
            let data = new Uint8ClampedArray(unFormattedData);
            resolve(new BasicImage(image.width, image.height, data));
        }
    });
}

/**
    @summary  Uses the UPNG library (https://github.com/photopea/UPNG.js) 
              to encode a BasicImage into raw PNG file stored in a Blob.
              This is a pixel perfect operation.
    @brief  Converts inputted BasicImage to returned Blob.
    @param  basicImage BasicImage (from BasicImage.js)
    @return  Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing a PNG file.
*/
function covertBasicImageToBlob(basicImage) {
    let frames = basicImage.data.buffer;
    console.log(frames);
    let rawPNG = UPNG.encode([frames], basicImage.width, basicImage.height, 0);
    return new Blob([rawPNG], { type: "image/png" });
}

/**
    @summary  Hides a PNG file inside of another PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Hides PNG file inside another PNG file.
    @param  haystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data that you will be using to hide another image in.
            needleFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data that you want to hide.
            greed number 1-8 defining how greedy the hiding should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing PNG data of the haystack image with the needle image hidden within it.
             Or null if the hiding failed.
*/
async function hideImageFile(haystackFile, needleFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicHaystack = await convertFileToBasicImage(haystackFile);
        let basicNeedle = await convertFileToBasicImage(needleFile);
 
        let basicLoadedHaystack = hideImage(basicHaystack, basicNeedle, greed);

        if (basicLoadedHaystack == null)
            reject(null);

        resolve(covertBasicImageToBlob(basicLoadedHaystack));
    });
}

/**
    @summary  Recovers a PNG file hidden inside of another PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Recovers PNG file hidden inside another PNG file.
    @param  loadedHaystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data harboring the hidden image to be found.
            greed number 1-8 defining how greedy the searching should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing PNG data recovered image.
             Or null if no image was found.
*/
async function findImageFile(loadedHaystackFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicLoadedHaystack = await convertFileToBasicImage(loadedHaystackFile);

        let basicNeedle = findImage(basicLoadedHaystack, greed);

        if (basicNeedle == null)
            reject(null);

        resolve(covertBasicImageToBlob(basicNeedle));
    });
}