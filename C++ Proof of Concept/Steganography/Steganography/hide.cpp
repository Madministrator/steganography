#include "hide.h"
#include "BitManipulation.h"

#include <vector>

using namespace std;

bool canHide(unsigned int sizeOfHaystack, unsigned int sizeOfNeedle, int greed) {
	sizeOfNeedle += 4; //Add size of fixed length header
	int spaceAvailableForHiding = (sizeOfHaystack*greed) / 8;
	return sizeOfNeedle < spaceAvailableForHiding;
}

bool hide(Image &haystack, Image needle, int greed)
{
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

	//TODO: finish this

}
