
async function hideFile() {
    let haystackBlob = document.getElementById('ImageFile').files.item(0);
    let needleBlob = document.getElementById('HiddenFile').files.item(0);
    let loadedHaystackBlob = await hideImageFile(haystackBlob, needleBlob, 1);
    
    download(loadedHaystackBlob, "LoadedHaystack.png", "image/png");
}

function setup() {
    
}

function draw() {
    
}

function handleFile(file) {
    
}