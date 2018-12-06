var inputImage = document.getElementById( 'ImageFile' );
var inputHidden = document.getElementById( 'HiddenFile');
var inputImageLabel = document.getElementById('ImageLabel');
var inputHiddenLabel = document.getElementById('HiddenLabel');
var originalImage = document.getElementById('original');

inputImage.addEventListener('change', function(){applyName(inputImage,inputImageLabel)});


inputHidden.addEventListener('change',function(){applyName(inputHidden, inputHiddenLabel)});

function applyName(input,label) {
	 let file = input.files[0];

	label.innerHTML = file.name;

}
