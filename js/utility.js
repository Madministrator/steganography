// Test header is represented by a unique bit = 0
// Followed by three bytes representing the number of characters
// Up to 33,554,431 characters, enough for entire works of William Shakespeare
var TEXT_HEADER_BITS = 25;
// Image header is represented by a unique bit = 1
// Followed by 4 bytes
// First two bytes = width of hidden image
// Second two bytes = height of hidden image
var IMAGE_HEADER_BITS = 33;
// Each pixel has 4 channels Red, Green, Blue, Alpha
// Represents by one byte (eight bits)
// Total 32 bits per pixel
var BITS_PER_PIXEL = 32;
// Characters are being represented in ASCII
// Values from 0-255 or 8 bits per character
var BITS_PER_CHARACTER = 8;

/**
	@brief calculates the number of pixels in a given image
	@param	image	an image object to be measured
	@return	a number (expressed as an int) which is the number of pixels in the input image
*/
function pixelsInImage(image)
{
  // Uses the files original width and length to return number of pixels
  return (image.width * image.height);
}

/**
	@brief	calculates the number of available bits available for writing using steganography
	@param	image	an image object which will function as the "haystack" image in steganography
	@param	greediness	the number of bits per byte which will be modified in the steganography process
	@param	includeAlpha	a boolean which indicates whether or not we include bits in the alpha channel
							in the calculation of available bits
	@return	a number (expressed as an int) which is the number of bits available to write in the steganography algorithm
*/
function bitsInImage(image, greediness, includeAlpha)
{
	//QUESTION: if there are 24 bits for every red, blue, and green value, does this function account for that???
	

  // If we are including the alpha we are using 4 bytes per pixel
  let bytesPerPixel = includeAlpha ? 4 : 3;
  // Get the number of pixels avialable in the specified image
  let pixelsAvailable = pixelsInImage(image);
  // Greediness is bits per byte we are using
  return (pixelsAvailable * greediness * bytesPerPixel);
}

/**
	@brief	determines if it is possible to hide a "needle" image inside a "haystack" image using steganography
	@param	haystack	an image which we wish to hide data within
	@param	needle		a data object (either text or image) which we wish to hide
	@param	greediness	the number of how many bits per byte which will be modified in the steganography process
	@param	includeAlpha	a boolean which indicates whether or not we include bits in the alpha channel for steganography
	@return	a boolean which indicates that there is enough space in the haystack to hide the needle data
*/
function canHideMessage(haystack, needle, greediness, includeAlpha)
{
  // Returns the available bits in the image we are hiding message in
  let bitsInHaystack = bitsInImage(haystack, greediness, includeAlpha);
  
  //QUESTION: are text files actually read as strings? just want to make sure that the needle logic applies correctly
  
  // Bits per pixel for an image or bits per character for text
  let bitsPerUnit = typeof(needle) == 'string' ? BITS_PER_CHARACTER : BITS_PER_PIXEL;
  // Pixels in image to be hidden or characters in text to be hidden
  let unitsInNeedle= typeof(needle) == 'string' ? needle.length : pixelsInImage(needle);
  // Header bits for image or text, respectively
  let headerBits = typeof(needle) == 'string' ? TEXT_HEADER_BITS : IMAGE_HEADER_BITS;
  
  // The total number of bits needed to hide the message
  let totalBitsNeeded = bitsPerUnit * unitsInNeedle + headerBits;

  return (totalBitsNeeded <= bitsInHaystack);
}

/**
	@brief	calculates the maximum size of a file to be hidden in a given image
	@param	haystack	the image we wish to hide data in
	@param	greediness	the number of how many bits per byte which will be modified in the steganography process
	@param	includeAlpha	a boolean which indicates whether or not we include bits in the alpha channel for steganography
	@return the number of megabytes we can hide in the haystack image
*/
function getMaxHiddenSize(haystack, greediness, includeAlpha)
{
  // Returns the results of bitsInImage as Megabytes
  return (bitsToMegabytes(bitsInImage(haystack, greediness, includeAlpha)));
}

/**
    @brief  Checks the type of file that is hidden inside of an image.
    @param  loadedHaystack  BasicImage (from BasicImage.js)
            greed number 1-8 level of greediness the file was hidden with
    @return Boolean True if an image was hidden, false if a text file was hidden
*/
function getHiddenFileType(loadedHaystack, greed) {
    return isBitSet(loadedHaystack.data[0], 8 - greed);
}

//Draws a blob on canvas
function drawBlobOnCanvas(canvas, blob) {
    if (blob.type == "image/png" || blob.type== "image/jpeg") {
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = URL.createObjectURL(blob);
    }
}
