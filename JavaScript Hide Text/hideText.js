/**
	@param	sizeOfHaystack	a number representing the number of bytes in the haystack image
	@param	sizeOfNeedle	a number representing the number of bytes in the needle image
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
    if (!canHideText(haystack.length, needle.length, greed))
        return null;

    //Total number of bits we are hiding
    let sizeOfNeedleWithHeader = needle.length + 4;

    let needleDataWithHeader = new Uint8ClampedArray(sizeOfNeedleWithHeader);

    let haystackWithNeedleData = new Uint8ClampedArray(haystack.data.length);

    needleDataWithHeader[0] = getByte(needle.w, 2);
    needleDataWithHeader[1] = getByte(needle.w, 3);
    needleDataWithHeader[2] = getByte(needle.h, 2);
    needleDataWithHeader[3] = getByte(needle.h, 3);

    for (let i = 0; i < needle.data.length; i++) {
		needleDataWithHeader[i + 4] = needle.data[i];
    }

    for (let i = 0; i < haystack.length; i++) {
		haystackWithNeedleData[i] = haystack[i];
    }

    let needleDataBitsToHide = sizeOfNeedleWithHeader * 8;

    let needleWithHeaderByte = 0;
    let needleWithHeaderBit = 0;

    let imageFlagWritten = false;

    for (let haystackByte = 0; haystackByte < haystack.length; haystackByte++) {
		for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {
		    if (needleDataBitsToHide > 0) {
		        if (imageFlagWritten) {
		            setBit(haystackWithNeedleData[haystackByte], haystackBit, isBitSet(needleDataWithHeader[needleWithHeaderByte], needleWithHeaderBit));
		            needleDataBitsToHide--;

		            needleWithHeaderBit++;
		            if (needleWithHeaderBit >= 8) {
		                needleWithHeaderBit = 0;
		                needleWithHeaderByte++;
		            }
		        } else {
		            setBit(haystackWithNeedleData[haystackByte], haystackBit, true);
		            imageFlagWritten = true;
		        }
            }
        }
    }

    return new BasicImage(haystack.width, haystack.height, haystackWithNeedleData);
}