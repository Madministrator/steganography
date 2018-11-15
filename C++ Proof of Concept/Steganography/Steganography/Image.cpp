#include "Image.h"
#include "../lodepng/lodepng.h"

#include <iostream>

using namespace std;

Image::Image(string filename)
{
	unsigned int error = lodepng::decode(data, width, height, filename.c_str());
	if (error) {
		cout << "lodepng error " << error << ": " << lodepng_error_text(error) << endl;
	}
}

Image::Image(vector<unsigned char> data, int width, int height, string filename)
{
	this->data = data;
	this->width = width;
	this->height = height;
	this->filename = filename;
}

void Image::saveImage(string newFilename)
{
	if (newFilename == "") newFilename = filename;
	vector<unsigned char> png;
	unsigned int error = lodepng::encode(png, data, width, height);
	if (!error) lodepng::save_file(png, newFilename.c_str());
	if (error) {
		cout << "lodepng error " << error << ": " << lodepng_error_text(error) << endl;
	}
}

vector<unsigned char>& Image::getData()
{
	return data;
}

unsigned int Image::getWidth()
{
	return width;
}

unsigned int Image::getHeight()
{
	return height;
}

unsigned int Image::getSize()
{
	return data.size();
}
