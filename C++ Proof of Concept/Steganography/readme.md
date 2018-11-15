 # C++ Steganography Prototype Code
Here's a working prototype that demonstrates the core functionality of our finished application. 
 ## How to build it.
Just open up the project in Visual Studio and click "Build". It should not require any extra configuration.
 ## How to use it.
Here is the syntax to hide an image followed by an example:
```
Steganography.exe hide [greed] [haystack filename for loading] [needle filename for loading] [loaded haystack filename for saving]
Steganography.exe hide 1 haystack.png needle.png loadedHaystack.png
```
Here is the syntax for finding a hidden image inside an image followed by an example:
```
Steganography.exe find [greed] [haystack filename for loading] [needle filename for saving] 
Steganography.exe find 1 loadedHaystack.png discoveredImage.png
```
You may set the greed to any integer value from 1 to 8 inclusively. 
With greed set to 1 the original image will be visually indistinguishable but you will also have the least storage. By setting it to 8 you will make the modifications highly visable but it also gives you the largest potential storage.
 ## Please ignore this totally not suspicious image
 ![imnothidinganything](https://user-images.githubusercontent.com/12504656/48525372-8bc4fe80-e849-11e8-8369-d6ca12c82168.png)
 
