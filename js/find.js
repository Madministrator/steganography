
/**
    @summary  Recovers a PNG or Text file hidden inside of a PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Recovers PNG or Text file hidden inside a PNG file.
    @param  loadedHaystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data harboring the hidden file to be found.
            greed number 1-8 defining how greedy the searching should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing recovered PNG or Plain text file.
             Or null if no data was found.
*/
async function findFile(loadedHaystackFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicLoadedHaystack = await convertFileToBasicImage(loadedHaystackFile);

        if(getHiddenFileType(basicLoadedHaystack)) { //The hidden file is an Image
            let basicNeedle = findImage(basicLoadedHaystack, greed);

            if (basicNeedle == null)
                resolve(null);

            resolve(convertBasicImageToBlob(basicNeedle));
        } else { //The Hidden file is plain text
            let charArray = findText(basicLoadedHaystack, greed);

            if (charArray == null)
                resolve(null);

            resolve(convertCharArrayToBlob(charArray));
        }

    });
}
