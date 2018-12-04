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

## Conventions for the documentation of functions
All functions should be preceeded with a block comment header with doxygen style comments. Example:

/**

  @summary  this function does a task, and here is where I describe how in abstract terms
  
  @brief  this function does x task
  
  @param  name  description of the object and constraints
  
  @return what the function returns, if anything.
  
*/

### Items of note from the documentation structure
* All parameter names are preceeded by and are followed by one tabbed space. (one must press TAB before and after typing the name)
* the @summary tag is optional, and should only be used when a longer description is necessary.
* the @brief tag is required on all functions to describe the purpose of the function in abstract terms.
* Regular block comments are proceeded by /* while doxygen comments must start with /** because they are read differently by certain programs.
* any updates to function documentation headers must be pushed here for consistency.

## Pulling the greediness value
For testing purposes only, should only be called once per run. Value set by user before steganography
* var greedVal = document.getElementById("greed").value;

## Declaring functions
JavaScript allows for use to declare function in a variety of ways, which can make reading code difficult if each collaborator is using different ways to declare their functions.
Here is our standard for declaring a function in javascript
/**

	Documentation goes here as described above
	
*/

function <functionName>(param1, param2)

{

	//function body
	
}

