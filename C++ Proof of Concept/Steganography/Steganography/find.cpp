#include "find.h"
#include "BitManipulation.h"

#include <vector>
#include <iostream>

using namespace std;

Image* find(Image haystack, string needleFilename, int greed)
{
	unsigned char header[4];
	vector<unsigned char> foundNeedleData;
	unsigned int needleWidth = 0;
	unsigned int needleHeight = 0;

	int bitsToReadForHeader = 32;
	int headerByte = 0;
	int headerBit = 0;

	int bitsToReadForNeedle = -1;
	int needleByte = 0;
	int needleBit = 0;

	cout << "Here are the first four bytes from our loaded haystack:" << endl;
	for (int i = 0; i < 4; i++) {
		cout << (int)haystack.getData()[i] << ", ";
	}
	cout << endl;

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
					needleWidth = header[0];
					needleWidth <<= 8;
					needleWidth += header[1];
					needleHeight = header[2];
					needleHeight <<= 8;
					needleHeight += header[3];

					cout << "Here is the header information that has been recovered:" << endl;
					for (int i = 0; i < 4; i++) {
						cout << (int)header[i] << ", ";
					}
					cout << endl;

					cout << "The needle image appears to be a " << needleWidth << "x" << needleHeight << " image." << endl;

					int bytesNeededForNeedle = needleWidth * needleHeight * 4;
					bitsToReadForNeedle = bytesNeededForNeedle * 8;

					//If this image is impossibly big, abort!
					if ((haystack.getData().size() - haystackByte)*greed + (8 - (haystackBit + 1)) < bitsToReadForNeedle) {
						cout << "Error. Hidden image too big. Source image or greed level is incorrect." << endl;
						return nullptr;
					}

					foundNeedleData = vector<unsigned char>(bytesNeededForNeedle);
				}
			}

			//Read bits from haystack for needle
			else if (bitsToReadForNeedle > 0) {
				setBit(foundNeedleData[needleByte], needleBit, isBitSet(haystack.getData()[haystackByte], haystackBit));

				needleBit++;
				if (needleBit >= 8) {
					needleBit = 0;
					needleByte++;
				}

				bitsToReadForNeedle--;
			}
		}
	}

	cout << "Here are the first four bytes of the recovered image:" << endl;
	for (int i = 0; i < 4; i++) {
		cout << (int)foundNeedleData[i] << ", ";
	}
	cout << endl;

	return new Image(foundNeedleData, needleWidth, needleHeight, needleFilename);
}
