// JavaScript source code


async function convertToPng(imgBlob) {
    return new Promise(function (resolve, reject) {

        if (imgBlob.type == "image/png") {
            console.log("It's a png!");
            let reader = new FileReader();
            reader.readAsArrayBuffer(imgBlob);
            reader.onloadend = async function(event) {
                let image = UPNG.decode(reader.result);
                let depth = image.depth;
                if (depth == 8) {
                    resolve(imgBlob);
                }

                let newImage = new Image();
                newImage.src = URL.createObjectURL(imgBlob);
                let basicImage = convertImageToBasicImage(newImage);
                resolve(convertBasicImageToBlob(basicImage));
            }
        }

        let image = new Image();
        image.src = URL.createObjectURL(imgBlob);
        let basicImage = convertImageToBasicImage(image);
        resolve(convertBasicImageToBlob(basicImage));
        
    })
}