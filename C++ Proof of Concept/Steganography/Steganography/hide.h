#pragma once
#include "Image.h"

//Hides 'needle' in 'haystack' with 'greed' level of greed. Returns true if successful.
//'greed' must be between 1 and 7 inclusively.

//Stores 'needle''s metadata in a fixed length 4 byte header:
//[First two bytes are the width][Last two bytes are the height]
Image* hide(Image haystack, Image needle, int greed);