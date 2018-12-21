
//***User Interface Code
var inputImage = document.getElementById( 'ImageFile' );
var inputHidden = document.getElementById( 'HiddenFile');
var inputImageLabel = document.getElementById('ImageLabel');
var inputHiddenLabel = document.getElementById('HiddenLabel');

document.getElementById('greed').addEventListener('change', function () {
	document.getElementById('greedNumber').innerHTML = document.getElementById('greed').value;
})

inputImage.addEventListener('change', function(){applyName(inputImage,inputImageLabel)});
inputHidden.addEventListener('change',function(){applyName(inputHidden, inputHiddenLabel)});

function applyName(input,label) {
	let file = input.files[0];
	label.innerHTML = file.name;
}
//***End User Interface Code



//This variable points to the Blob that needs to be saved to the user's disk when they press "Save Result".
//It is set to null whenever this Blob needs to be generated or regenerated.
var resultBlob = null;
//This variable is false when the above resultBlob is a LoadedHaystack, true when it is a recovered Needle. 
var recovered = false;

//This is the main function of the application. 
//It is called whenever the user presses "Submit", or when the User pressed "Save Result" without pressing "Submit" first.
async function execute() {

    let greed = document.getElementById("greed").value;
    if(greed=="" || greed==null) {
        alert("Please select a greed level");
        return;
    }

    let radioButtons = document.getElementsByName("operation");
    let hide=false;
    if(radioButtons[0].checked==true) hide=true;

    let haystackBlob = document.getElementById('ImageFile').files.item(0);
    if(haystackBlob==null) {
        alert("Please select your Haystack image");
        return;
    }

    //If the user is trying to hide a file
    if(hide) {
        let needleBlob = document.getElementById('HiddenFile').files.item(0);
        if(needleBlob==null) {
            alert("Please select a file you want to hide");
            return;
        }

        //Hide needleBlob inside of haystackBlob with set level of greed
        let loadedHaystackBlob = null;
        if(needleBlob.type=="image/png" || needleBlob.type=="image/jpeg") {
            loadedHaystackBlob = await hideImageFile(haystackBlob, needleBlob, greed);
        } else if(needleBlob.type=="text/plain") {
            loadedHaystackBlob = await hideTextFile(haystackBlob, needleBlob, greed);
        } else {
            alert("Invalid file selected for hiding.");
            return;
        }

        if(loadedHaystackBlob==null) {
            //Haystack wasn't large enough to hide the needle, abort
            return;
        }

        //Set the file that will be downloaded when the user presses "Save Result" to the newly generated LoadedHaystack.
        resultBlob=loadedHaystackBlob;
        recovered=false;

        //Draw the old and new images in the comparison area
        let canvasOriginal = document.getElementById("original");
        drawBlobOnCanvas(canvasOriginal, haystackBlob);
        let canvasChanged = document.getElementById("changed");
        drawBlobOnCanvas(canvasChanged, loadedHaystackBlob);

        //Initialize the mouse hover pixel inspector with the new images
        initializeMouseMove();
        
    } else { //If the user is trying to find a hidden file
        
        let recoveredFile = await findFile(haystackBlob, greed);

        //If findFile found a hidden file
        if(recoveredFile!=null) {

            //Update resultBlob to point to the newly found file so saveResult() knows what blob should be saved.
            resultBlob=recoveredFile;
            recovered=true;

            //Update the recovered file display to display the new file
            let canvas = document.getElementById("recovered");
            let textDisplay = document.getElementById("textDisplay");
            if(recoveredFile.type=="image/png") { //If an image was recovered

                canvas.style.display="block";
                textDisplay.style.display="none";
                drawBlobOnCanvas(canvas, recoveredFile);

            } else { //If a textfile was recovered

                canvas.style.display="none";
                textDisplay.style.display="block";
                textDisplay.data=URL.createObjectURL(recoveredFile);

            }

        } else {
            alert("No hidden file was found.");
            return;
        }
    }
}

//This function is called whenever the user clicks on "Save Result".
async function saveResult() {
    if(resultBlob!=null) {
        if(recovered) {
            if(resultBlob.type=="image/png") {
                download(resultBlob, "Needle.png", "image/png");
            } else {
                download(resultBlob, "Needle.txt", "text/plain");
            }
        } else {
            download(resultBlob, "LoadedHaystack.png", "image/png");
        }
    } else {
        await execute();
        if(resultBlob==null) {
            return;
        }
        saveResult();
    }
}

//This function is called whenever find and hide specific page elements need to be hidden or shown to the user
function setHideVisibility() {
    onSelectionChange();

    let divHide = document.getElementsByClassName("hide");
    let divFind = document.getElementsByClassName("find");

    let radioButtons = document.getElementsByName("operation");
    if(radioButtons[0].checked==true) {
        for(let i=0;i<divHide.length;i++)
            divHide[i].style.display="block";
        for(let i=0;i<divFind.length;i++)
            divFind[i].style.display="none";
    } else {
        for(let i=0;i<divFind.length;i++)
            divFind[i].style.display="block";
        for(let i=0;i<divHide.length;i++)
            divHide[i].style.display="none";
    }
}

//This function is called whenever the user changes any value in the form.
//This function then revokes the old resulting file and sets the resultBlob to null
//     to let the application know that it needs to generate a new file before the user can save their new result.
function onSelectionChange() {
    URL.revokeObjectURL(resultBlob);
    resultBlob=null;
}
