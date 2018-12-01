//TO BE IMPLEMENTED
/**
	@brief	checks the status of an individual bit of data within a byte
	@param	byte	one byte of data (8 bits of value 0 or 1)
	@param	index	the index of the bit we wish to check (0 = leftmost, 7 = rightmost)
	@return 
*/
isBitSet = function(byte, index) {
    index = Number(index); //make sure input was a number
    if(byte[index] == true)
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
setBit = function(byte, index, value) {
    byte[index] = value
}

/**
	@brief	retrieves a byte of information
	@param	number
	@param	index
	@return	a byte of information
	///Yeah, I don't understand this code, would the author please fill in the doxygen comments?
*/
getByte = function(number, index) {
    let mask = 0x000000FF
    let shift = 4-(index+1)*8
    number = number >> shift

    return number & mask
}