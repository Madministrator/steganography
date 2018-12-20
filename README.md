# JavaScript Steganography Decoder/Encoder
## What is Steganography and how does that apply to this application?
[Steganography](https://en.wikipedia.org/wiki/Steganography) is the practice of hiding objects in plain sight. This application hides files in the least significant bits of the color channels of PNG (Portable Network Graphics) images. This adds a small amount of noise to the image that is often completely unnoticable to any person looking at it. 
## Definitions of jargon used in this project.
 * Haystack: A large image file that will contain a hidden file.
 * Needle: A small image or text file that will be hidden or has been recovered.
 * Loaded Haystack: A large PNG image file that contains a hidden file.
 * Greed or Greediness: A value [1-8] inclusively that tells the application how many bits we want to allocate for hiding our file per byte in the Haystack image.
## How do I use this application to hide a file?
 1. Click on the radio button to the left of "Hide".
 2. Click on the text "Select Image File". Select the JPEG or PNG file you wish to use as a Haystack image from opened dialog.
 3. Click on the text "Select Hidden File". Select the small JPEG, PNG, or TXT file you wish to hide from the opened dialog.
 4. Click and drag the slider to adjust the greed to a desired amount. All the way left is greed level 1. All the way right is greed level 8. 
 5. Click on "Submit" to preview the freshly created Loaded Haystack and/or "Save Result" to save it to your disk.
## How do I use this application to find a hidden file?
 1. Make sure the file was hidden using this same application. It can **NOT** find files hidden by other Steganography applications.
 2. Click on the radio button to the left of "Find".
 3. Click on the text "Select Image File". Select a Loaded Haystack file from the opened dialog. 
 4. Click and drag the slider to adjust the greed to the same amount that was used to hide the file. 
 5. Click on "Submit" to preview the recovered file and/or "Save Result" to save it to your disk. 
## Why did you create this application?
This application was the result of a team effort from Evan Vander Hoeven, Nicholas Labelle, Tanner Verber, Brendan Bard, Connor Fergesen, and Austin Scott. It was created as a project for UW-Stout's Fall 2018 Software Engineering Principles class as an excercise in using Agile development. 
## Do you plan to expand upon what was created in class by adding new features?
Perhaps. If I do decide to add new features I would probably expand upon the metadata that we currently store in the header to add things such as checksums to verify that a hidden file was actually found or not. Some other features I might add would be an "advanced" mode where the user would have much more freedom to customize how the algorithm will hide their data.
