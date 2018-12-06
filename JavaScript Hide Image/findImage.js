/**
findImage returns a BasicImage of the hidden image
    Returns null if no image was found.
haystack = BasicImage of the image with hidden data
greed = Integer containing the current greed level (1-8)
*/
findImage = function (haystack, greed) {

    //Stores the 4 byte dimensional data of the recovered image
    let header = new Uint8ClampedArray(4);

    //Stores the raw pixel data of the recovered image in 'RGBARGBARGBA...' format
    let foundNeedleData = new Uint8ClampedArray();

    //These are the width and height of the recovered image. This is calculated just after the header is read.
    let needleWidth = -1;
    let needleHeight = -1;

    //This keeps track of how many more bits we need to read before we can construct the header.
    //(1 bit for type flag)+(16 bits for width)+(16 bits for height)=33 bits
    let bitsToReadForHeader = 33;

    //Keeps track of the (byte, bit) postition where the next recovered header bit will need to be written to.
    let headerByte = 0;
    let headerBit = 0;

    //This keeps track of how many more bits we need to read to reconstruct the hidden image.
    //This is computed just after the header is recovered.
    let bitsToReadForNeedle = -1;

    //This keeps track of the (byte, bit) position where the next recovered image bit will need to be written to.
    let needleByte = 0;
    let needleBit = 0;

    //True when the first bit of needle's header has been read
    //This enables us to skip checking this value because at this point we already know the type
    let imageFlagRead = false;

    //For every byte (RGBARGBARGBA...) in Haystack
    for (let haystackByte = 0; haystackByte < haystack.data.length; haystackByte++) {
        //For every bit where data should be hidden in that byte
        for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {


            //If we still need to read more bits to finish constructing the header
            if (bitsToReadForHeader > 0) {
                //If we have already skipped the 'hidden data type' flag bit
                if (imageFlagRead) {

                    //Write the bit at haystack[ haystackByte ][ haystackBit ]
                    //to header[ headerByte ][ headerBit ]
                    header[headerByte]=setBit(header[headerByte], headerBit, isBitSet(haystack.data[haystackByte], haystackBit));

                    //Point to where the next header bit should be placed
                    headerBit++;
                    //If the next header bit is in the next header byte point there
                    if (headerBit >= 8) {
                        headerBit = 0;
                        headerByte++;
                    }

                } else {
                    //We don't care about the current bit, skip it and set the imageFlagRead flag to true
                    imageFlagRead = true;
                }

                //Reduce the number of bits we still need to read to construct the header
                bitsToReadForHeader--;

                //If that was the last bit we needed to read to construct the header
                if (bitsToReadForHeader == 0) {
                    console.log("Here is the recovered 4 byte header: " + header[0] + ", " + header[1] + ", " + header[2] + ", " + header[3]);

                    //Compute needle's width
                    needleWidth = header[0];
                    needleWidth = needleWidth << 8;
                    needleWidth += header[1];

                    //Compute needle's height
                    needleHeight = header[2];
                    needleHeight = needleHeight << 8;
                    needleHeight += header[3];

                    console.log("The hidden image's width appears to be: " + needleWidth);
                    console.log("The hidden image's height appears to be: " + needleHeight);

                    //How many bytes long is needle based on its width and height?
                    let bytesNeededForNeedle = needleWidth * needleHeight * 4;
                    //How many bits long is that?
                    bitsToReadForNeedle = bytesNeededForNeedle * 8;

                    //If the computed size of Needle cannot fit in the number of usable bits remaining in Haystack
                    //or if the hidden image has dimensions less than one
                    if ((haystack.data.length - haystackByte) * greed + (8 - (haystackBit + 1)) < bitsToReadForNeedle || needleWidth<1 || needleHeight<1) {
                        console.log("Could not find hidden image");
                        return null;
                    }

                    //Array to store Needle's pixel data as it is recovered
                    foundNeedleData = new Uint8ClampedArray(bytesNeededForNeedle);
                }
            }
            //If we still need to read more bits to construct Needle
            else if (bitsToReadForNeedle > 0) {

                //Write the bit at haystack[ haystackByte ][ haystackBit ]
                //to foundNeedleData[ needleByte ][ needleBit ]
                foundNeedleData[needleByte]=setBit(foundNeedleData[needleByte], needleBit, isBitSet(haystack.data[haystackByte], haystackBit));

                //Point to where the next recovered Needle bit should be placed
                needleBit++;
                //If that is in the next byte point there
                if (needleBit >= 8) {
                    needleBit = 0;
                    needleByte++;
                }

                //Reduce the number of bits we still need to read by 1
                bitsToReadForNeedle--;
            }
        }
    }

    return new BasicImage(needleWidth, needleHeight, foundNeedleData);
}