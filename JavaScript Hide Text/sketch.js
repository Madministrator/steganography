function setup() {

    let testHaystackData = new Uint8ClampedArray(3000);
    for (let i = 0; i < 3000; i++) {
        testHaystackData[i] = 255;
    }

    
    let testNeedleData = new TextEncoder("utf-8").encode(
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA " +
        "TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA TEST NEEDLE DATA "        
        );


    let testHaystack = new BasicImage(6, 6, testHaystackData);

    console.log("Needle array" + testNeedleData)

    let testLoadedHaystack = hideText(testHaystack, testNeedleData, 3);
    console.log("Haystack with needle hidden: " + testLoadedHaystack.data);

    console.log("Recovered text from that loadedHaystack: " + findText(testLoadedHaystack, 3));
}

function draw() {
    
}

function handleFile(file) {
    
}