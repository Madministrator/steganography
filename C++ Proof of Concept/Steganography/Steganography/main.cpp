#include <iostream>
#include <string>

#include "Image.h"
#include "hide.h"
#include "find.h"

using namespace std;

int main(int argc, char* argv[]) {
	//Usage: Steganography.exe [hide/find] [greed] [haystack filename] [needle filename] 
	if (argc == 5) {
		string command = argv[1];
		if (command != "hide" || command != "find") return 1;
		int greed = atoi(argv[2]);
		if (greed < 1 || greed>8) return 2;
		if (command == "hide") {
			Image haystack(argv[3]);
			Image needle(argv[4]);

			if (hide(haystack, needle, greed)) {
				haystack.saveImage();
			}
			else return 3;
		}
		else {
			Image haystack(argv[3]);
			find(haystack, argv[4], greed).saveImage();
		}
	}
	else return -1;
}