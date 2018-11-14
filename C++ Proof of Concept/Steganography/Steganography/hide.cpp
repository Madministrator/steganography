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

Image* hide(Image haystack, Image needle, int greed)
{
	cout << "Your needle image is a " << needle.getWidth() << "x" << needle.getHeight() << " image." << endl;

	if (!canHide(haystack.getSize(), needle.getSize(), greed))
		return nullptr;

	unsigned int sizeOfNeedleWithHeader = needle.getSize() + 4;
	unsigned char* needleDataWithHeader = new unsigned char[sizeOfNeedleWithHeader];
	
	vector<unsigned char> haystackWithNeedleData(haystack.getData().size());

	//Create header
	needleDataWithHeader[0] = getByte(needle.getWidth(), 2);
	needleDataWithHeader[1] = getByte(needle.getWidth(), 3);
	needleDataWithHeader[2] = getByte(needle.getHeight(), 2);
	needleDataWithHeader[3] = getByte(needle.getHeight(), 3);

	//Copy needle image data over
	for (int i = 0; i < needle.getData().size(); i++) {
		needleDataWithHeader[i + 4] = needle.getData()[i];
	}

	cout << "Here is the header for the needle image:" << endl;
	for (int i = 0; i < 4; i++) {
		cout << (int)needleDataWithHeader[i] << ", ";
	}
	cout << endl;

	//Copy haystack image data over
	for (int i = 0; i < haystack.getData().size(); i++) {
		haystackWithNeedleData[i] = haystack.getData()[i];
	}

	cout << "Here are the first four bytes from the haystack before hiding needle in it:" << endl;
	for (int i = 0; i < 4; i++) {
		cout << (int)haystackWithNeedleData[i] << ", ";
	}
	cout << endl;

	//This keeps track of how many more bits of needleDataWithHeader we still need to hide
	int needleDataBitsToHide = sizeOfNeedleWithHeader * 8;

	//These keep track of what bit from what byte of needleDataWithHeader we are currently hiding
	int needleWithHeaderByte = 0;
	int needleWithHeaderBit = 0;

	//Hide needle's data in haystack
	for (int haystackByte = 0; haystackByte < haystack.getData().size(); haystackByte++) {
		for (int haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {
			if (needleDataBitsToHide > 0) {
				setBit(haystackWithNeedleData[haystackByte], haystackBit, isBitSet(needleDataWithHeader[needleWithHeaderByte], needleWithHeaderBit));
				needleDataBitsToHide--;

				needleWithHeaderBit++;
				if (needleWithHeaderBit >= 8) {
					needleWithHeaderBit = 0;
					needleWithHeaderByte++;
				}
			}
		}
	}

	cout << "Here are the first four bytes of haystack after hiding needle in it:" << endl;
	for (int i = 0; i < 4; i++) {
		cout << (int)haystackWithNeedleData[i] << ", ";
	}
	cout << endl;

	delete[] needleDataWithHeader;

	return new Image(haystackWithNeedleData, haystack.getWidth(), haystack.getHeight(), "");
}
