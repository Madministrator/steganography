
/**
    @summary  Hides a PNG file inside of another PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Hides PNG file inside another PNG file.
    @param  haystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data that you will be using to hide another image in.
            needleFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data that you want to hide.
            greed number 1-8 defining how greedy the hiding should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing PNG data of the haystack image with the needle image hidden within it.
             Or null if the hiding failed.
*/
async function hideImageFile(haystackFile, needleFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicHaystack = await convertFileToBasicImage(haystackFile);
        let basicNeedle = await convertFileToBasicImage(needleFile);
 
        let basicLoadedHaystack = hideImage(basicHaystack, basicNeedle, greed);

        if (basicLoadedHaystack == null)
            reject(null);

        resolve(covertBasicImageToBlob(basicLoadedHaystack));
    });
}
