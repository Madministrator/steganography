#include "hide.h"
#include "BitManipulation.h"

#include <vector>
#include <iostream>

using namespace std;

bool canHide(unsigned int sizeOfHaystack, unsigned int sizeOfNeedle, int greed) {
	sizeOfNeedle += 4; //Add size of fixed length header
	int spaceAvailableForHiding = (sizeOfHaystack*greed) / 8;
	cout << "Your needle image will take up " << sizeOfNeedle << " bytes." << endl;
	cout << "Your haystack provides " << spaceAvailableForHiding << " bytes of storage with greed set to " << greed << "." << endl;
	return sizeOfNeedle < spaceAvailableForHiding;
}

bool hide(Image &haystack, Image needle, int greed)
{
	cout << "Your needle image is a " << needle.getWidth() << "x" << needle.getHeight() << " image." << endl;

	if (!canHide(haystack.getSize(), needle.getSize(), greed))
		return false;

	unsigned int sizeOfDataToHide = needle.getSize() + 4;
	unsigned char* dataToHide = new unsigned char[sizeOfDataToHide];

	//Create header
	dataToHide[0] = getByte(needle.getWidth(), 2);
	dataToHide[1] = getByte(needle.getWidth(), 3);
	dataToHide[2] = getByte(needle.getHeight(), 2);
	dataToHide[3] = getByte(needle.getHeight(), 3);

	//Copy image data over
	for (int i = 0; i < needle.getData().size(); i++) {
		dataToHide[i + 4] = needle.getData()[i];
	}

	//Hide needle's data in haystack
	int bitsToWrite = sizeOfDataToHide * 8;
	int dataToHideByte = 0;
	int dataToHideBit = 0;
	for (int haystackByte = 0; haystackByte < haystack.getData().size(); haystackByte++) {
		for (int haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {
			if (bitsToWrite > 0) {
				setBit(haystack.getData()[haystackByte], haystackBit, isBitSet(dataToHide[dataToHideByte], dataToHideBit));
				bitsToWrite--;

				dataToHideBit++;
				if (dataToHideBit >= 8) {
					dataToHideBit = 0;
					dataToHideByte++;
				}
			}
		}
	}

	delete[] dataToHide;

	return true;
}
