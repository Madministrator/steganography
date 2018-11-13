#include "Image.h"
#include "../lodepng/lodepng.h"

Image::Image(string filename)
{
	lodepng::decode(data, width, height, filename.c_str());
}

Image::Image(vector<unsigned char> data, int width, int height, string filename)
{
	this->data;
	this->width = width;
	this->height = height;
	this->filename = filename;
}

void Image::saveImage()
{
	lodepng::encode(filename.c_str(), data, width, height);
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
	data.size();
}
