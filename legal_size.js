// Test header is represented by a unique bit = 0
// Followed by three bytes representing the number of characters
// Up to 33,554,431 characters, enough for entire works of William Shakespeare
var TEXT_HEADER_BITS = 25;
// Image header is represented by a unique bit = 1
// Followed by 4 bytes
// First two bytes = width of hidden image
// Second two bytes = height of hidden image
var IMAGE_HEADER_BITS = 33;
// Each pixel has 4 channels Red, Green, Blue, Alpha
// Represents by one byte (eight bits)
// Total 32 bits per pixel
var BITS_PER_PIXEL = 32;
// Characters are being represented in ASCII
// Values from 0-255 or 8 bits per character
var BITS_PER_CHARACTER = 8;

function pixelsInImage(image)
{
  // Uses the files original width and length to return number of pixels
  return (image.width * image.height);
}

function bitsInImage(image, greediness, includeAlpha)
{
  // If we are including the alpha we are using 4 bytes per pixel
  let bytesPerPixel = includeAlpha ? 4 : 3;
  // Get the number of pixels avialable in the specified image
  let pixelsAvailable = pixelsInImage(image);
  // Greediness is bits per byte we are using
  return (pixelsAvailable * greediness * bytesPerPixel);
}

function canHideMessage(haystack, needle, greediness, includeAlpha)
{
  // Returns the available bits in the image we are hiding message in
  let bitsInHaystack = bitsInImage(haystack, greediness, includeAlpha);
  // Bits per pixel for an image or bits per character for text
  let bitsPerUnit = typeof(needle) == 'string' ? BITS_PER_CHARACTER : BITS_PER_PIXEL;
  // Pixels in image to be hidden or characters in text to be hidden
  let unitsInNeedle= typeof(needle) == 'string' ? needle.length : pixelsInImage(needle);
  // Header bits for image or text, respectively
  let headerBits = typeof(needle) == 'string' ? TEXT_HEADER_BITS : IMAGE_HEADER_BITS;
  
  // The total number of bits needed to hide the message
  let totalBitsNeeded = bitsPerUnit * unitsInNeedle + headerBits;

  return (totalBitsNeeded <= bitsInHaystack);
}

function getMaxHiddenSize(haystack, greediness, includeAlpha)
{
  // Returns the results of bitsInImage as Megabytes
  return (bitsToMegabytes(bitsInImage(haystack, greediness, includeAlpha)));
}

function bitsToMegabytes(bits)
{
  // 1000 Kilobytes to a Megabyte
  return (bitsToKilobytes(bits) / 1000 );
}

function bitsToKilobytes(bits)
{
  // 1000 bytes to a Kilobyte
  return (bitsToBytes(bits) / 1000);
}

function bitsToBytes(bits)
{
  // 8 bits to a byte
  return (bits / 8);
}