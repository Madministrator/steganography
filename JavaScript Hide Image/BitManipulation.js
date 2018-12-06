/**
	@brief	checks the status of an individual bit of data within a byte
	@param	byte	one byte of data (8 bits of value 0 or 1)
	@param	index	the index of the bit we wish to check (0 = leftmost, 7 = rightmost)
	@return 
*/
function isBitSet(byte, index) {
    if (index < 0 || index > 7) {
        console.log("Invalid index passed to isBitSet");
        return null;
    }
    let bit = 1;
    let offset = 7 - index;
    bit <<= offset;
    return (bit & byte)>0;
}
/*	
	Also, without explicit types in JavaScript, it's generally a good idea to 
	force all data to be the type you want like on line 9 with "Number(index)"
	otherwise things could get weird if the computer thinks its a string or bool.
*/

/**
	@brief sets a bit to 0 or 1 within a byte
	@param	byte	the byte we wish to manipulate
	@param	index	the location of the bit we wish to manipulate within the byte (0 = leftmost, 7 = rightmost)
    @return the modified byte
*/
function setBit(byte, index, value) {
    if (index < 0 || index > 7) {
        console.log("Invalid index passed to setBit");
        return null;
    }
    let result = byte;
    let mask = 1;
    mask = mask << (7 - index);
    if (value) {
        result = result | mask;
    } else {
        mask = ~mask;
        result = result & mask;
    }
    return result;
}

/**
	@brief	retrieves a byte of information from a 4 byte variable
	@param	number
	@param	index
	@return	the byte of information found at the 'index' index with 0 being the leftmost byte
*/
function getByte(number, index) {
    if (index < 0 || index > 3) {
        console.log("Invalid index passed to getByte");
        return null;
    }
    let bitMask = 255;
    bitMask <<= ((3-index)*8);
    number = number & bitMask;
    number >>= ((3 - index) * 8);
    return number;
}