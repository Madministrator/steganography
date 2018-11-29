/*
canHideImage returns a Boolean if hiding an image is possible
sizeOfHaystack = Integer representing the number of bytes in the Haystack image
sizeOfNeedle = Integer representing the number of bytes in the Needle image
*/
canHideImage = function (sizeOfHaystack, sizeOfNeedle, greed) {
    //sizeOfNeedle = (number of bits for needle) + (size of the header in bits)
    sizeOfNeedle = (sizeOfNeedle * 8) + 33;
    let spaceAvailableForHiding = (sizeOfHaystack * greed);
    return sizeOfNeedle < spaceAvailableForHiding;
}

/*
hideImage returns a BasicImage with hidden data inside it
    Returns null if impossible.
haystack = BasicImage where we want to hide the needle image
needle = BasicImage that we want to hide
greed = Integer set to the current greed level (1-8)
*/
hideImage = function(haystack, needle, greed) {
    if (!canHideImage(haystack.length, needle.length, greed))
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