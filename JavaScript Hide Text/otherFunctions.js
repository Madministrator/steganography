function convert_text_to_binary(text) {
    let output = ""
    for(let i = 0; i < text.length; i++) {
        output += text[i].charCodeAt(0).toString(2) + " "
    }
    console.log(output)
    return output
}

function is_bit_set(letter, index) {
    index = Number(index); //make sure input was a number
    if(letter[index] == true)
        return true
    else
        return false
}

function convert_binary_to_text(binary) {

    let digit = parseInt(binary, 2);
    let ascii = String.fromCharCode(digit);
    
    console.log(ascii)
}


let letter = "H"
let binary = convert_text_to_binary(letter)
console.log(binary) 

for (i = 0; i < binary.length; i++) {
    console.log(is_bit_set(binary,i))
}

// let binary = convert_text_to_binary(test)

// convert_binary_to_text(binary)