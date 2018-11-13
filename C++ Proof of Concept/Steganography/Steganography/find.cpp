#include "find.h"
#include "BitManipulation.h"

#include <vector>

using namespace std;

Image find(Image haystack, string needleFilename, int greed)
{
	unsigned char header[4];
	vector<unsigned char> data;
	unsigned int width = 0;
	unsigned int height = 0;

	int bitsToReadForHeader = 32;
	int bitsToReadForImage = -1;

	//TODO: finish here
}
