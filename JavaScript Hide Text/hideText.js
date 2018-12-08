/**
	@param	sizeOfHaystack	a number representing the number of bytes in the haystack image
	@param	sizeOfNeedle	a number representing the number of bytes in the needle text
	@param	greed			a number representing the number of bits we can manipulate in the steganographic process
	@return	a boolean indicating if is possible to hide the needle in the haystack 
*/
canHideText = function (sizeOfHaystack, sizeOfNeedle, greed) {
    //sizeOfNeedle = (number of bits for needle) + (size of the header in bits)
    sizeOfNeedle = (sizeOfNeedle * 8) + 33;
    let spaceAvailableForHiding = (sizeOfHaystack * greed);
    return sizeOfNeedle < spaceAvailableForHiding;
}

/**
	@brief hides "needle" data inside of the "haystack" data
	@param	haystack	a 32-bit PNG image object
	@param	needle		a ASCII encoded text file
	@param	greed		a number indicating how many bits per byte we are
						manipulating in the steganographic algorithm
	@return	a 32-bit PNG haystack image with the text data hidden inside it,
			or NULL if the steganographic algorithm failed.
*/
hideText = function(haystack, needle, greed) {
   //If we cannot hide Needle's data inside of Haystack due to size constraints
   if (!canHideText(haystack.data.length, needle.length, greed)) {
    console.log("Could not hide text");
    return null;
}

//Total number of bits we are hiding (excluding the one bit type flag)
let sizeOfNeedleWithHeader = needle.length + 2;
console.log("Needle with Header: " + sizeOfNeedleWithHeader)

//Array that stores the data (including everything in the header EXCEPT the image flag bit) that we will be hiding
let needleDataWithHeader = new Uint8ClampedArray(sizeOfNeedleWithHeader);

//Array that will store the resulting data from the algorithm before it is returned
let haystackWithNeedleData = new Uint8ClampedArray(haystack.data.length);

console.log("Needle's length: " + needle.length);

//Compute Needle's 2 byte dimension header data (first two bytes = width, last two bytes = height)
needleDataWithHeader[0] = getByte(needle.length, 2);
needleDataWithHeader[1] = getByte(needle.length, 3);
// needleDataWithHeader[2] = getByte(needle.length, 4);

console.log("Here is Needle's 3 byte header from hideText: " + needleDataWithHeader[0] + ", " + needleDataWithHeader[1] /*+ ", " + needleDataWithHeader[2]*/);

//Copy all of Needle's pixel data into the array that starts with its header data
for (let i = 0; i < needle.length; i++) {
    needleDataWithHeader[i + 2] = needle[i];
}

//Copy all of Haystack's pixel data into a duplicate array that we will be modifying and returning
for (let i = 0; i < haystack.data.length; i++) {
    haystackWithNeedleData[i] = haystack.data[i];
}

//The number of bits that still need to be hidden of Needle and it's 33 bit header
let needleDataBitsToHide = (sizeOfNeedleWithHeader * 8) + 1;

//These keep track on the current bit that we are hiding inside of Haystack
let needleWithHeaderByte = 0;
let needleWithHeaderBit = 0;

//Have we already written out the one bit 'this is an image' flag?
let textFlagWritten = false;

//For every byte (RGBARGBARGBA...) in the haystack
for (let haystackByte = 0; haystackByte < haystack.data.length; haystackByte++) {
    //For every bit in that byte that we want to overwrite with our secret data
    for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {

        //If we still have more data that needs to be hidden
        if (needleDataBitsToHide > 0) {
            //If we have already written the one bit 'this is an image' flag
            if (textFlagWritten) {

                //Overwrite the bit at haystackWithNeedleData[ haystackByte ][ haystackBit ]
                //with the bit at needleDataWithHeader[ needleWithHeaderByte ][ needleWithHeaderBit ]
                haystackWithNeedleData[haystackByte] = setBit(haystackWithNeedleData[haystackByte], haystackBit, isBitSet(needleDataWithHeader[needleWithHeaderByte], needleWithHeaderBit));


                //Point to the next bit that we will be written next loop
                needleWithHeaderBit++;
                //If the bit that needs to be written next loop is in the next byte then point to the next byte
                if (needleWithHeaderBit >= 8) {
                    needleWithHeaderBit = 0;
                    needleWithHeaderByte++;
                }

            //We still need to write the image flag
            } else {

                //The first bit of the header is always false representing that this is an image.
                haystackWithNeedleData[haystackByte]=setBit(haystackWithNeedleData[haystackByte], haystackBit, true);
                //Record that the header type flag has been written
                textFlagWritten = true;

            }

            //Reduce the number of write operations that still need to be performed
            needleDataBitsToHide--;
        }
    }
}

return new BasicImage(haystack.width, haystack.height, haystackWithNeedleData);
}