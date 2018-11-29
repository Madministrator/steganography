//TO BE IMPLEMENTED
isBitSet = function(byte, index) {
    index = Number(index); //make sure input was a number
    if(byte[index] == true)
        return true
    else
        return false
}
setBit = function(byte, index, value) {
    byte[index] = value
}
getByte = function(number, index) {
    let mask = 0x000000FF
    let shift = 4-(index+1)*8
    number = number >> shift

    return number & mask
}