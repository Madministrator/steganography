#pragma once
#include "Image.h"

//Finds and returns an image hidden in 'haystack' with 'greed' levels of greed.
//'greed' must be between 1 and 8 inclusively
Image find(Image haystack, string needleFilename, int greed);