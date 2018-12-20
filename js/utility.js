/**
    @brief  Checks the type of file that is hidden inside of an image.
    @param  loadedHaystack  BasicImage (from BasicImage.js)
            greed number 1-8 level of greediness the file was hidden with
    @return Boolean True if an image was hidden, false if a text file was hidden
*/
function getHiddenFileType(loadedHaystack, greed) {
    return isBitSet(loadedHaystack.data[0], 8 - greed);
}

//Draws a blob on canvas
function drawBlobOnCanvas(canvas, blob) {
    if (blob.type == "image/png" || blob.type== "image/jpeg") {
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = URL.createObjectURL(blob);
    }
}
