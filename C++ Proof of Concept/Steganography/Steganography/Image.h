#pragma once
#include <vector>
#include <string>

using std::vector;
using std::string;

class Image {
private:
	//Raw array of image data. RGBARGBARGBA....
	vector<unsigned char> data;
	unsigned int width;
	unsigned int height;
	string filename;
public:
	Image(string filename);
	Image(vector<unsigned char> data, int width, int height, string filename);

	void saveImage();

	vector<unsigned char>& getData();
	unsigned int getWidth();
	unsigned int getHeight();
	unsigned int getSize();

};