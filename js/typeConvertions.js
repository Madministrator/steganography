
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
    let width = canvas.width;
    let height = canvas.height;
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
    if (file.type == "image/png") {
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
    } else { //Must be a JPEG file
        return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = function(event) {
                let parser = new JpegDecoder();
                parser.parse(new Uint8Array(reader.result));
                let width = parser.width;
                let height = parser.height;
                let components = parser.numComponents; //1 = grayscale, 3 = RGB, 4 = RGBA
                let unformattedData = parser.getData(width, height);
                let data = new Uint8ClampedArray(width*height*4);
                if(components==1) {
                    let i=0;
                    for(let j=0;j<data.length;j+=4) {
                        data[j]=unformattedData[i];
                        data[j+1]=unformattedData[i];
                        data[j+2]=unformattedData[i];
                        data[j+3]=255;
                        i++;
                    }
                } else if(components==3) {
                    let i=0;
                    for(let j=0;j<data.length;j+=4) {
                        data[j]=unformattedData[i];
                        data[j+1]=unformattedData[i+1];
                        data[j+2]=unformattedData[i+2];
                        data[j+3]=255;
                        i+=3;
                    }
                } else if(components==4) {
                    let i=0;
                    for(let j=0;j<data.length;j+=4) {
                        data[j]=unformattedData[i];
                        data[j+1]=unformattedData[i+1];
                        data[j+2]=unformattedData[i+2];
                        data[j+3]=unformattedData[i+3];
                        i+=4;
                    }
                } else {
                    console.log("Error: Unsupported component number "+components);
                    reject(null);
                }
                resolve(new BasicImage(width, height, data));
            }
        });
    }
}

/**
    @summary  Coverts a text file into an array of Bytes.
              This is performed as an async operation returning a Promise.
              No data is lost in this operation.
    @brief  Converts inputted File containing raw text data to returned Promise of Uint8ClampedArray.
    @param  file (https://developer.mozilla.org/en-US/docs/Web/API/File)
    @return Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
            of Uint8ClampedArray.
*/
async function convertFileToCharArray(file) {
    return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function(event) {
            resolve(new Uint8ClampedArray(reader.result));
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
function convertBasicImageToBlob(basicImage) {
    if(basicImage==null) return null;

    let frames = basicImage.data.buffer;
    console.log(frames);
    let rawPNG = UPNG.encode([frames], basicImage.width, basicImage.height, 0);
    return new Blob([rawPNG], { type: "image/png" });
}

/**
    @summary  Converts an array of ASCII character data into a
              Blob containing an ASCII encoded text file.
    @brief  Converts inputted Uint8ClampedArray to returned text file Blob.
    @param  characterArray Uint8ClampedArray with ASCII encoded character data
    @return  Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing an ASCII encoded text file.
*/
function convertCharArrayToBlob(characterArray) {
    return new Blob([characterArray.buffer], { type: "text/plain" });
}