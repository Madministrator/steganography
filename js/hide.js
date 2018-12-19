
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

        if (basicLoadedHaystack == null) {
            let minGreed=1;
            for(;minGreed<9;minGreed++) {
                if(canHideImage(basicHaystack.data.length, basicNeedle.data.length, minGreed)){
                    break;
                }
            }
            if(minGreed<9) {
                if(minGreed!=8) {
                    alert("Greed level "+greed+" is insufficient to hide your file. Please use greed level "+minGreed+" or higher.");
                } else {
                    alert("Greed level "+greed+" is insufficient to hide your file. Please use greed level 8.");
                }
            } else {
                alert("Your haystack image is too small to hide your needle file at any greed level. Please choose a larger haystack image.");
            }
            resolve(null);
        }

        resolve(convertBasicImageToBlob(basicLoadedHaystack));
    });
}

/**
    @summary  Hides a text file inside a PNG file
              with a set greediness level. 
              This is performed as an async operation returning a Promise.
    @brief  Hides text file inside a PNG file.
    @param  haystackFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing PNG data that you will be using to hide the text file in.
            needleFile File (https://developer.mozilla.org/en-US/docs/Web/API/File)
                containing ASCII encoded data that you want to hide.
            greed number 1-8 defining how greedy the hiding should be
                1 = least greedy, 8 = most greedy
    @return  Promise (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
             of a Blob (https://developer.mozilla.org/en-US/docs/Web/API/Blob)
             containing PNG data of the haystack image with the needle text hidden within it.
             Or null if the hiding failed.
*/
async function hideTextFile(haystackFile, needleFile, greed) {
    return new Promise(async function(resolve, reject) {
        let basicHaystack = await convertFileToBasicImage(haystackFile);
        let charArray = await convertFileToCharArray(needleFile);
 
        let basicLoadedHaystack = hideText(basicHaystack, charArray, greed);

        if (basicLoadedHaystack == null) {
            let minGreed=1;
            for(;minGreed<9;minGreed++) {
                if(canHideText(basicHaystack.data.length, charArray.length, minGreed)){
                    break;
                }
            }
            if(minGreed<9) {
                if(minGreed!=8) {
                    alert("Greed level "+greed+" is insufficient to hide your file. Please use greed level "+minGreed+" or higher.");
                } else {
                    alert("Greed level "+greed+" is insufficient to hide your file. Please use greed level 8.");
                }
            } else {
                alert("Your haystack image is too small to hide your needle file at any greed level. Please choose a larger haystack image.");
            }
            resolve(null);
        }

        resolve(convertBasicImageToBlob(basicLoadedHaystack));
    });
}
