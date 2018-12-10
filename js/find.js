
/**
    @summary  Recovers a PNG file hidden inside of another PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Recovers PNG file hidden inside another PNG file.
    @param  loadedHaystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data harboring the hidden image to be found.
            greed number 1-8 defining how greedy the searching should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing PNG data recovered image.
             Or null if no image was found.
*/
async function findImageFile(loadedHaystackFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicLoadedHaystack = await convertFileToBasicImage(loadedHaystackFile);

        let basicNeedle = findImage(basicLoadedHaystack, greed);

        if (basicNeedle == null)
            reject(null);

        resolve(convertBasicImageToBlob(basicNeedle));
    });
}

/**
    @summary  Recovers a text file hidden inside of another PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Recovers text file hidden inside another PNG file.
    @param  loadedHaystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data harboring the hidden text file to be found.
            greed number 1-8 defining how greedy the searching should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing text file that was recovered.
             Or null if no text was found.
*/
async function findTextFile(loadedHaystackFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicLoadedHaystack = await convertFileToBasicImage(loadedHaystackFile);

        let charArray = findText(basicLoadedHaystack, greed);

        if (charArray == null)
            reject(null);

        resolve(convertCharArrayToBlob(charArray));
    });
}