/**
	@brief	converts a string of ASCII characters to binary
	@param	text	a string of ASCII encoded characters
	@return	a string of binary bits
*/
function convert_text_to_binary(text) {
    let output = ""
    for(let i = 0; i < text.length; i++) {
        output += text[i].charCodeAt(0) // .toString(2) + " "
    }

    output = parseInt(output)
    console.log(output)
    return output
}

/**
	@brief	checks the status of an individual bit of data within a byte
	@param	letter	one byte of data (8 bits of value 0 or 1)
	@param	index	the index of the bit we wish to check (0 = leftmost, 7 = rightmost)
	@return 
*/
function is_bit_set(letter, index) {
    index = Number(index); //make sure input was a number
    if(letter[index] == true)
        return true
    else
        return false
}

/**
	@brief	converts a string of binary numbers into ASCII characters
	@param	binary	a string of binary numbers
	@return	a string of text
*/
function convert_binary_to_text(binary) {

    let digit = parseInt(binary, 2);
    let ascii = String.fromCharCode(digit);
    
    console.log(ascii)
}


let test = "HELLO USER"
// let binary = convert_text_to_binary(letter)
// console.log(binary) 

// for (i = 0; i < binary.length; i++) {
//     console.log(is_bit_set(binary,i))
// }

let binary = convert_text_to_binary(test)

// convert_binary_to_text(binary)