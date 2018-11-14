#include "find.h"
#include "BitManipulation.h"

#include <vector>
#include <iostream>

using namespace std;

Image find(Image haystack, string needleFilename, int greed)
{
	unsigned char header[4];
	vector<unsigned char> data;
	unsigned int width = 0;
	unsigned int height = 0;

	int bitsToReadForHeader = 32;
	int headerByte = 0;
	int headerBit = 0;

	int bitsToReadForImage = -1;
	int needleByte = 0;
	int needleBit = 0;

	for (int haystackByte = 0; haystackByte < haystack.getData().size(); haystackByte++) {
		for (int haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {

			//Read bits from haystack for the header
			if (bitsToReadForHeader > 0) {
				setBit(header[headerByte], headerBit, isBitSet(haystack.getData()[haystackByte], haystackBit));

				headerBit++;
				if (headerBit >= 8) {
					headerBit = 0;
					headerByte++;
				}

				bitsToReadForHeader--;
				//Header has been read. Calculate needle's width, height, and size.
				if (bitsToReadForHeader == 0) {
					width = header[0];
					width <<= 8;
					width += header[1];
					height = header[2];
					height <<= 8;
					height += header[3];

					cout << "The needle image appears to be a " << width << "x" << height << " image." << endl;

					int bytesNeededForNeedle = width * height * 4;
					bitsToReadForImage = bytesNeededForNeedle * 8;

					data = vector<unsigned char>(bytesNeededForNeedle);
				}
			}

			//Read bits from haystack for needle
			else if (bitsToReadForImage > 0) {
				setBit(data[needleByte], needleBit, isBitSet(haystack.getData()[haystackByte], haystackBit));

				needleBit++;
				if (needleBit >= 8) {
					needleBit = 0;
					needleByte++;
				}

				bitsToReadForImage--;
			}
		}
	}
	return Image(data, width, height, needleFilename);
}
