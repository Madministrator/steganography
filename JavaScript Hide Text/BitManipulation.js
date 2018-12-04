//TO BE IMPLEMENTED
/**
	@brief	checks the status of an individual bit of data within a byte
	@param	byte	one byte of data (8 bits of value 0 or 1)
	@param	index	the index of the bit we wish to check (0 = leftmost, 7 = rightmost)
	@return 
*/
 function isBitSet(byte, index) {
    // Align the bit at the index spot to the least significant bit
    byte = byte >> (index - 1)

    // Check if this number is odd. If it is then the bit is set
    if(byte % 1 == 1)
        return true
    else
        return false
}
/*
	Hey, when someone is giving you an index, make sure that the index is
	actually within a valid range. I know that for the sake of our application
	our partners are going to pass valid inputs, but there is something to be 
	said about best practices.
	
	Also, without explicit types in JavaScript, it's generally a good idea to 
	force all data to be the type you want like on line 9 with "Number(index)"
	otherwise things could get weird if the computer thinks its a string or bool.
*/

/**
	@brief sets a bit to 0 or 1 within a byte
	@param	byte	the byte we wish to manipulate
	@param	index	the location of the bit we wish to manipulate within the byte (0 = leftmost, 7 = rightmost)
*/
//QUESTION: are we sure that we are doing pass-by-reference? JavaScript may be picky but I'm not sure...
function setBit(byte, index, value) {
    // Value should be 0 or 1
    let mask = value << index
    if (value == 1)
        // or byte with mask to set the value bit in byte to 1
        byte | mask
    else 
        // and byte with mask to set the value bit in byte to 0
        byte & mask
}
/**
	@brief	retrieves a byte of information
	@param	number
	@param	index
	@return	a byte of information
	///Yeah, I don't understand this code, would the author please fill in the doxygen comments?
*/
function getByte(number, index) {
	let mask = 0x000000FF
	// Shift the number to the correct index
	// Index:   0    1    2    3
	// Number: 0000 0000 0000 0000
    let shift = 4-(index+1)*8
    number = number >> shift

    return number & mask
}