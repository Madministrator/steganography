
async function findFile() {
    let haystackBlob = document.getElementById('ImageFile').files.item(0);
    let needleBlob = await findImageFile(haystackBlob, 1);
    
    download(needleBlob, "Needle.png", "image/png");
}
