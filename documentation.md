# This file contains all of our agreed upon conventions for the project.
## Conventions for the decryption header
All headers start with a unique bit, which indicates whether or not the hidden file is a .txt file or a .png file.
This first bit will be called the leading header bit.
If the leading header bit is a 1, we are decrypting an image, while a 0 indicates a text file.

### Image headers
After the leading header bit, there are four bytes, split into groups of two. The first two bytes indicate the width of the hidden image.
The second two bytes indicate the height of the hidden image. This is all the information that we need to begin extracting the hidden image
from the steganograhied image.

### Text file headers
After the leading header bit, there are three bytes. These three bytes indicate the number of characters (spaces and special characters included)
in the hidden .txt file. It is important to note that the maximum number of characters in this instance is 33,554,431 characters.
This choice is to allow our encrypted .txt file to be large enough to contain the entire works of William Shakespeare. 
