var inputImage = document.getElementById( 'ImageFile' );
var inputHidden = document.getElementById( 'HiddenFile');
var inputImageLabel = document.getElementById('ImageLabel');
var inputHiddenLabel = document.getElementById('HiddenLabel');
var originalImage = document.getElementById('original');
var hiddenFile;
var imageFile;

inputImage.addEventListtener('click', applyNameImage);
inputHidden.addEventListtener('click',applyNameHidden);

function applyNameHidden(event) {
	 hiddenFile = event.files[0];

	inputHiddenLabel.innerText = hiddenFile.name;

}
function applyNameImage(event) {
	 imageFile = event.files[0];

	inputImageLabel.innerText = imageFile.name;
	var ctx = originalImage.getContext("2d");
	ctx.drawImage(imageFile);
}