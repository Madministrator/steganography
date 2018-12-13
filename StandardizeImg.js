// JavaScript source code


async function ConvertToPng(imgBlob) {
    return new Promise(function (resolve, reject) {

        if (imgBlob.type == "image/png") {
            let reader = new FileReader();
            reader.readAsArrayBuffer(imgBlob);
            reader.onloadend = function (event) {
                let image = UPNG.decode(reader.result);
                let depth = image.depth;
                if (depth == 32) {
                    resolve(imgBlob);
                }
            }
        }

        let image = new Image();
        image.src = URL.createObjectURL(imgBlob);

        
        let newImg = convertImageToBasicImage(img);

        resolve(convertBasicImageToBlob(newImg));
        
    }
}