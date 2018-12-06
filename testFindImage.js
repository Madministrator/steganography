function setup() {

    let loadedHaystackImage = document.getElementById("haystack");

    let basicHaystack = convertImageToBasicImage(loadedHaystackImage);

    let basicNeedle = findImage(basicHaystack, 1);

    let needleImage = convertBasicImageToImage(basicNeedle);
    document.getElementById("needle").src = needleImage.src;

}

function draw() {
    
}

function handleFile(file) {
    
}