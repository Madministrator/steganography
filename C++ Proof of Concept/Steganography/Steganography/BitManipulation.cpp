#include "BitManipulation.h"

bool isBitSet(unsigned char byte, int index)
{
	unsigned char bit = 1;
	int offset = 7 - index;
	bit <<= offset;
	return bit & byte;
}

void setBit(unsigned char & byte, int index, bool value)
{
	unsigned char bit = 1;
	int offset = 7 - index;
	bit <<= offset;
	bool currentBitValue = isBitSet(byte, index);
	if (value) {
		if (!currentBitValue) {
			byte = byte | bit;
		}
	}
	else {
		if (currentBitValue) {
			byte = byte ^ bit;
		}
	}
}

unsigned char getByte(unsigned int number, int index)
{
	unsigned int bitMask = 255;
	bitMask <<= ((3 - index) * 8);
	number = number & bitMask;
	number >>= ((3 - index) * 8);
	return (unsigned char)number;
}
