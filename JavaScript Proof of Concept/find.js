function find(haystack, needleFilename, greed) {
    let header = new Uint8ClampedArray(4);
    let foundNeedleDatanew = new Uint8ClampedArray();
    let needleWidth = 0;
    let needleHeight = 0;

    let bitsToReadForHeader = 32;
    let headerByte = 0;
    let headerBit = 0;

    let bitsToReadForNeedle = -1;
    let needleByte = 0;
    let needleBit = 0;


    for (let haystackByte = 0; haystackByte < haystack.length; haystackByte++) {
        for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {

   
            if (bitsToReadForHeader > 0) {
                setBit(header[headerByte], headerBit, isBitSet(haystack[haystackByte], haystackBit));

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
                    setBit(foundNeedleData[needleByte], needleBit, isBitSet(haystack[haystackByte], haystackBit));

                    needleBit++;
                    if (needleBit >= 8) {
                        needleBit = 0;
                        needleByte++;
                    }

                    bitsToReadForNeedle--;
            }
        }
    }

    return foundNeedleData;
}