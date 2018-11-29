function canHide(sizeOfHaystack, sizeOfNeedle, greed) {
    sizeOfNeedle += 4;
    let spaceAvailableForHiding = (sizeOfHaystack * greed) / 8;
    return sizeOfNeedle < spaceAvailableForHiding;
}

function hide(haystack, needle, greed) {
    if (!canHide(haystack.length, needle.length, greed))
        return null;

    let sizeOfNeedleWithHeader = needle.length + 4;
    let needleDataWithHeader = new Uint8ClampedArray(sizeOfNeedleWithHeader);

    let haystackWithNeedleData = new Uint8ClampedArray(haystack.length);

    needleDataWithHeader[0] = getByte(needle.getWidth(), 2);
    needleDataWithHeader[1] = getByte(needle.getWidth(), 3);
    needleDataWithHeader[2] = getByte(needle.getHeight(), 2);
    needleDataWithHeader[3] = getByte(needle.getHeight(), 3);

    for (let i = 0; i < needle.length; i++) {
		needleDataWithHeader[i + 4] = needle[i];
    }

    for (let i = 0; i < haystack.length; i++) {
		haystackWithNeedleData[i] = haystack[i];
    }

    let needleDataBitsToHide = sizeOfNeedleWithHeader * 8;

    let needleWithHeaderByte = 0;
    let needleWithHeaderBit = 0;

    for (let haystackByte = 0; haystackByte < haystack.length; haystackByte++) {
		for (let haystackBit = 8 - greed; haystackBit < 8; haystackBit++) {
			if (needleDataBitsToHide > 0) {
				setBit(haystackWithNeedleData[haystackByte], haystackBit, isBitSet(needleDataWithHeader[needleWithHeaderByte], needleWithHeaderBit));
				needleDataBitsToHide--;

				needleWithHeaderBit++;
				if (needleWithHeaderBit >= 8) {
					needleWithHeaderBit = 0;
					needleWithHeaderByte++;
                }
            }
        }
    }

    return haystackWithNeedleData;
}