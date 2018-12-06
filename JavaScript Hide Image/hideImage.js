/*
canHideImage returns a Boolean if hiding an image is possible
sizeOfHaystack = Integer representing the number of bytes in the Haystack image
sizeOfNeedle = Integer representing the number of bytes in the Needle image
*/
canHideImage = function (sizeOfHaystack, sizeOfNeedle, greed) {
    //sizeOfNeedle = (number of bits for needle) + (size of the header in bits)
    sizeOfNeedle = (sizeOfNeedle * 8) + 33;
    let spaceAvailableForHiding = (sizeOfHaystack * greed);
    sizeOfHaystack = sizeOfHaystack * 8;
    console.log("The size of the haystack image in bits: "+sizeOfHaystack);
    console.log("The size of the needle image in bits: "+sizeOfNeedle);
    console.log("Here is the number of bits available for hiding with greed set to "+greed+": "+spaceAvailableForHiding);
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
    //If we cannot hide Needle's data inside of Haystack due to size constraints
    if (!canHideImage(haystack.data.length, needle.data.length, greed)) {
        console.log("Could not hide image");
        return null;
    }
    
    //Total number of bits we are hiding (excluding the one bit type flag)
    let sizeOfNeedleWithHeader = needle.data.length + 4;

    //Array that stores the data (including everything in the header EXCEPT the image flag bit) that we will be hiding
    let needleDataWithHeader = new Uint8ClampedArray(sizeOfNeedleWithHeader);

    //Array that will store the resulting data from the algorithm before it is returned
    let haystackWithNeedleData = new Uint8ClampedArray(haystack.data.length);

    console.log("Needle's width: " + needle.width);
    console.log("Needle's height: " + needle.height);

    //Compute Needle's 4 byte dimension header data (first two bytes = width, last two bytes = height)
    needleDataWithHeader[0] = getByte(needle.width, 2);
    needleDataWithHeader[1] = getByte(needle.width, 3);
    needleDataWithHeader[2] = getByte(needle.height, 2);
    needleDataWithHeader[3] = getByte(needle.height, 3);

    console.log("Here is Needle's 4 byte header from hideImage: " + needleDataWithHeader[0] + ", " + needleDataWithHeader[1] + ", " + needleDataWithHeader[2] + ", " + needleDataWithHeader[3]);

    //Copy all of Needle's pixel data into the array that starts with its header data
    for (let i = 0; i < needle.data.length; i++) {
		needleDataWithHeader[i + 4] = needle.data[i];
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
    let imageFlagWritten = false;
    
    //For every byte (RGBARGBARGBA...) in the haystack
    for (let haystackByte = 0; haystackByte < haystack.data.length; haystackByte++) {
        //For every bit in that byte that we want to overwrite with our secret data
        for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {

            //If we still have more data that needs to be hidden
            if (needleDataBitsToHide > 0) {
                //If we have already written the one bit 'this is an image' flag
                if (imageFlagWritten) {

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

		            //The first bit of the header is always true representing that this is an image.
		            haystackWithNeedleData[haystackByte]=setBit(haystackWithNeedleData[haystackByte], haystackBit, true);
                    //Record that the header type flag has been written
		            imageFlagWritten = true;

                }

                //Reduce the number of write operations that still need to be performed
                needleDataBitsToHide--;
            }
        }
    }

    return new BasicImage(haystack.width, haystack.height, haystackWithNeedleData);
}