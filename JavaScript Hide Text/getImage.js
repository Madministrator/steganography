/**
	@brief	retrieves an image file from a HTML element
	@return? where does the image go after this function is done?
*/
function get_image() {
    var img = document.getElementById('file').files[0];
    var reader  = new FileReader();
    reader.onload = function(e)  {
        var image = document.createElement("img");
        image.src = e.target.result;
        document.body.appendChild(image);
    }
    reader.readAsDataURL(img);
}