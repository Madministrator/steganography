var inputImage = document.getElementById( 'ImageFile' );
var inputHidden = document.getElementById( 'HiddenFile');
var inputImageLabel = document.getElementById('ImageLabel');
var inputHiddenLabel = document.getElementById('HiddenLabel');
var originalImage = document.getElementById('original');
var changedImage = document.getElementById('changed');
var greedSlider =document.getElementById('greed')
var greed;

inputImage.addEventListener('change', function(){applyName(inputImage,inputImageLabel)});


inputHidden.addEventListener('change',function(){applyName(inputHidden, inputHiddenLabel)});

greedSlider.addEventListener('change',function(){
	greed = greedSlider.value;
});
function applyName(input,label) {
	 let file = input.files[0];

	label.innerHTML = file.name;

}
