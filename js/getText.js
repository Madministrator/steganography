/**
	@brief	converts a string of ASCII characters to binary
	@param	text	a string of ASCII encoded characters
	@return	a string of binary bits
*/
// function convert_text_to_binary(text) {
//     let output = ""
//     for(let i = 0; i < text.length; i++) {
//         output += text[i].charCodeAt(0) // .toString(2) + " "
//     }

//     output = parseInt(output)
//     console.log(output)
//     return output
// }

function convert_text_to_binary(string) {
	let data = new TextEncoder("utf-8").encode(string);
	return data
}

/**
	@brief	retrieves a text file from a HTML element
	@return
*/
function getText() {
	
	let text = reader.readAsText(file);

	let binary = convert_text_to_binary(text)
	console.log(binary)
	
	return binary
}


// TESTING AREA
let test = "HELLO USER"

let binary = convert_text_to_binary(test)
