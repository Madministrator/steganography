function setup() {

    let testHaystackData = new Uint8ClampedArray(144);
    for (let i = 0; i < 144; i++) {
        testHaystackData[i] = 255;
    }

    
    let testNeedleData = new TextEncoder("utf-8").encode("TEST NEEDLE DATA");
    // new Uint8ClampedArray([31, 41, 15, 92, 11, 11, 11, 11, 11, 11, 11, 11, 11, 16, 53, 42]);
    let testHaystack = new BasicImage(6, 6, testHaystackData);
    // let testNeedle = new BasicText(2, 2, testNeedleData);

    console.log(testNeedleData)

    let testLoadedHaystack = hideText(testHaystack, testNeedleData, 3);
    console.log("Haystack with needle hidden: " + testLoadedHaystack.data);

    console.log("Recovered text from that loadedHaystack: "+findText(testLoadedHaystack, 3));
}

function draw() {
    
}

function handleFile(file) {
    
}