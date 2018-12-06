function setup() {

    let haystackImage = document.getElementById("haystack");
    let needleImage = document.getElementById("needle");

    let basicHaystack = convertImageToBasicImage(haystackImage);
    let basicNeedle = convertImageToBasicImage(needleImage);

    let basicLoadedHaystack = hideImage(basicHaystack, basicNeedle, 1);

    let loadedHaystackImage = convertBasicImageToImage(basicLoadedHaystack);
    document.getElementById("placeholder").src = loadedHaystackImage.src;

}

function draw() {
    
}

function handleFile(file) {
    
}