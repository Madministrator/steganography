# Steganography
This is the steganography application developed in UW-Stout's Software Engineering Principles class in a team of six.
Steganography is the practice of hidding data inside an image. There are many ways to do this, but in this 
application we manipulate the color values of each pixel bit by bit. When you use this application, you will start 
with two files as input, and one PNG file as output. The output PNG file will appear to look like one of your input 
files, except that there will be data hidden within it that can only be retrieved by our application.

## Why is steganography a secure encryption?
When encrypting data through other encryption standards, and sending that encrypted data to your recipient, it is 
really easy to mathematically detect said data. Therefore, anyone watching your network traffic will know that you 
are trying to send encrypted data to somebody. With Steganography, we are manipulating the colors of pixels, and 
(given a low greediness level, which will be explained later) the changes will be impossible for the human eye to 
notice, and will still be formatted like a regular image file, so a computer can't notice that an image has been 
modified unless that it was both the original image, and the steganographied image. 

## How to use the application
This application requires the use of two files, a "needle" and a "haystack." The haystack must be a picture file in 
either JPEG or PNG format. The needle, may be an image file in the same formats, or the needle may be a .txt file.
In this case, the needle file will be the hidden file, and the haystack file will be the image that everyone and 
anyone can see. Next you need to decide your greediness level as described below. Then you can hit the submit button 
to hide your data. Depending on the size of your input files, this may take a while. Once the process is done, two 
images will be displayed on your screen: your original haystack, and the haystack after our algorithm has manipulated 
it. When you move your mouse over the screen, you may see the color values of both the original image, and the modified
image so you can see what we have done (it is important to note that the difference in pixel color is where the data 
is hidden, so you can't let anyone have both the original and the modified image so they can't see the pixel difference).
Once you're ready, you can download the encrypted photo with the "save result" button. Note that you must download it as 
a png image because png uses a lossless data storage method, which is necessary to preserve your data. 

To recover a file from a steganographied image, click the find button, supply a file, and use the same greediness level 
that you use to encrypt a file. Then the file you be displayed on the screen, text files and images files will both 
display in their own fashion. 

## What is the greediness level?
Steganography manipulates individual bits within each byte. The greediness is the number (1-8) of bits per byte 
manipulated. The more bits manipulated, the more data you can hide, and the larger your needle file can be. 
However, this comes at a cost: the more bits you manipulate, the image can appear hazy and it becomes more obvious 
that the image is has been modified in some way. So, the greedier you are, the more you can encrypt, but the more 
obvious that something is hidden. A greediness level of one is very hard to notice, because our algorithm only 
modifies the least significant bit. 

# Some examples to play with
Inside the folder titled "files" there is a variety of different files for you to play with. PNGs in different formats, 
JPEGs, and they can be used as both a needle and a haystack (as labelled). There are some other files which are very 
interesting to play with.
* "NestedHaystack.png" is a file whose needle is a haystack for another image. 
	* Find the first needle with greediness 1
	* Find the seccond needle with greediness 2
	* Keep going until you find the final needle.
* Shakespeare's Hidden Works.png is a portrait of William Shakespeare which contains the entire works of William Shakespeare.
	* They are hidden at level 3
	* There is another file, Shakespeare's Works.txt which you can compare the results to.
* Shakespeare's Not-So-Hidden Works.png is the entire works of William Shakespeare hidden at greediness level 8 on a blank white canvas
	* The image looks like static, but since the original image is entirely overwritten, any haystack image would follow the same pattern.