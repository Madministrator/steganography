/**
	@param	haystack	an image object with data hidden inside it.
	@param	greed		a number indicating how many bits are manipulated by the steganography algorithm (range 1-8, inclusive)
	@return	returns a BasicImage object with text hidden inside it, 
			or NULL if no image was passed.
*///TODO: check if this documentation is accurate, I'm not sure what the purpose of the BasicImage object is.
findText = function(haystack, greed) {
    let header = new Uint8ClampedArray(4);
    let foundNeedleData = new Uint8ClampedArray();
    let needleWidth = 0;
    let needleHeight = 0;

    let bitsToReadForHeader = 32;
    let headerByte = 0;
    let headerBit = 0;

    let bitsToReadForNeedle = -1;
    let needleByte = 0;
    let needleBit = 0;

    //True when the first bit of needle's header has been read
    //This let's us skip checking this value because at this point we already know the type
    let flagRead = false;


    for (let haystackByte = 0; haystackByte < haystack.length; haystackByte++) {
        for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {

   
            if (bitsToReadForHeader > 0) {
                if (flagRead) {
                    setBit(header[headerByte], headerBit, isBitSet(haystack.data[haystackByte], haystackBit));
                } else {
                    flagRead = true;
                }

                headerBit++;
                if (headerBit >= 8) {
                    headerBit = 0;
                    headerByte++;
                }

                bitsToReadForHeader--;
                if (bitsToReadForHeader == 0) {
                    needleWidth = header[0];
                    needleWidth <<= 8;
                    needleWidth += header[1];
                    needleHeight = header[2];
                    needleHeight <<= 8;
                    needleHeight += header[3];


                    let bytesNeededForNeedle = needleWidth * needleHeight * 4;
                    bitsToReadForNeedle = bytesNeededForNeedle * 8;

                    if ((haystack.length - haystackByte)*greed + (8 - (haystackBit + 1)) < bitsToReadForNeedle) {
                        return null;
                    }

                    foundNeedleData = new Uint8ClampedArray(bytesNeededForNeedle);
                }
            }

            else if (bitsToReadForNeedle > 0) {
                    setBit(foundNeedleData[needleByte], needleBit, isBitSet(haystack.data[haystackByte], haystackBit));

                    needleBit++;
                    if (needleBit >= 8) {
                        needleBit = 0;
                        needleByte++;
                    }

                    bitsToReadForNeedle--;
            }
        }
    }

    return new BasicImage(needleWidth, needleHeight, foundNeedleData);
}