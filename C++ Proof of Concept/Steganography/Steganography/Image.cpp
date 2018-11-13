#include "Image.h"

Image::Image(string filename)
{

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
}

vector<unsigned char> Image::getData()
{
	return data;
}

int Image::getWidth()
{
	return width;
}

int Image::getHeight()
{
	return height;
}
