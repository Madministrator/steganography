function setup() {

    let testHaystackData = new Uint8ClampedArray(144);
    for (let i = 0; i < 144; i++) {
        testHaystackData[i] = 255;
    }
    let testNeedleData = new Uint8ClampedArray([31, 41, 15, 92, 11, 11, 11, 11, 11, 11, 11, 11, 11, 16, 53, 42]);
    let testHaystack = new BasicImage(6, 6, testHaystackData);
    let testNeedle = new BasicImage(2, 2, testNeedleData);

    let testLoadedHaystack = hideImage(testHaystack, testNeedle, 3);
    console.log("Haystack with needle hidden: " + testLoadedHaystack.data);

    console.log("Recovered image from that loadedHaystack: "+findImage(testLoadedHaystack, 3).data);
}

function draw() {
    
}

function handleFile(file) {
    
}