#include <iostream>
#include <string>

#include "Image.h"
#include "hide.h"
#include "find.h"
#include "BitManipulation.h"

using namespace std;

int main(int argc, char* argv[]) {
	//Usage: Steganography.exe hide [greed] [haystack filename for loading] [needle filename for loading] [loaded haystack filename for saving]
	//Usage: Steganography.exe find [greed] [haystack filename for loading] [needle filename for saving] 
	if (argc == 5 || argc == 6) {
		string command = argv[1];
		if (command != "hide" && command != "find") {
			cout << "Invalid syntax. Expect \"hide\" or \"find\"." << endl;
			return 1;
		}
		int greed = atoi(argv[2]);
		if (greed < 1 || greed>8) {
			cout << "Invalid level of greed. Must be between 1 and 8 inclusively." << endl;
			return 2;
		}
		if (command == "hide") {
			if (argc != 6) {
				cout << "Invalid number of arguments for hide command." << endl;
				return 4;
			}
			cout << "Hiding " << argv[4] << " into " << argv[3] << " and storing result in " << argv[5] << "..." << endl;

			Image haystack(argv[3]);
			Image needle(argv[4]);
			Image* loadedHaystack = hide(haystack, needle, greed);

			if (loadedHaystack!=nullptr) {
				loadedHaystack->saveImage(argv[5]);
				delete loadedHaystack;
			}
			else {
				cout << "Error. Can't fit " << argv[4] << " inside of " << argv[3] << " with greed set to " << greed << ". Aborting." << endl;
				return 3;
			}
		}
		else {
			cout << "Finding " << argv[4] << " inside of " << argv[3] << "..." << endl;
			Image haystack(argv[3]);
			find(haystack, argv[4], greed).saveImage();
		}
	}
	else {
		cout << "Invalid number of commandline arguments." << endl;
		return -1;
	}
}