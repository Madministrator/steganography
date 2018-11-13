#pragma once
//Checks if the bit at index 0-7 in byte is set
bool isBitSet(unsigned char byte, int index);
void setBit(unsigned char &byte, int index, bool value);
unsigned char getByte(unsigned int number, int index);