class BasicImage {
    /*
    width=width of image
    height=height of image
    data=Uint8ClampedArray containing the color channel values of
         the image in the format RGBARGBARGBA...
    */
    constructor(width, height, data) {
        this.width = width;
        this.height = height;
        this.data = data;
    }
}