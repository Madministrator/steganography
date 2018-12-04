//TO BE IMPLEMENTED
isBitSet = function(byte, index) {
    // Align the bit at the index spot to the least significant bit
    byte = byte >> (index - 1)

    // Check if this number is odd. If it is then the bit is set
    if(byte % 1 == 1)
        return true
    else
        return false
}
setBit = function(byte, index, value) {
    // Value should be 0 or 1
    let mask = value << index
    if (value == 1)
        // or byte with mask to set the value bit in byte to 1
        byte | mask
    else 
        // and byte with mask to set the value bit in byte to 0
        byte & mask
}
getByte = function(number, index) {
    let mask = 0x000000FF
    let shift = 4-(index+1)*8
    number = number >> shift

    return number & mask
}
