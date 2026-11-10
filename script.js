const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");
const fileName = document.getElementById("fileName");
const status = document.getElementById("status");

const pngButton = document.getElementById("pngButton");
const jpgButton = document.getElementById("jpgButton");
const selectedFormat = document.getElementById("selectedFormat");

const convertButton = document.getElementById("convertButton");
const downloadButton = document.getElementById("downloadButton");
const clearButton = document.getElementById("clearButton");

let selectedFormatValue = "png";
let convertedImage = null;

pngButton.classList.add("selected");

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    fileName.textContent = file.name;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;
    previewImage.style.display = "block";
    previewText.style.display = "none";

    convertedImage = null;
    downloadButton.disabled = true;

    status.textContent = "Image loaded.";
});

pngButton.addEventListener("click", function () {

    selectedFormatValue = "png";

    pngButton.classList.add("selected");
    jpgButton.classList.remove("selected");

    selectedFormat.textContent = "PNG selected";
});

jpgButton.addEventListener("click", function () {

    selectedFormatValue = "jpg";

    jpgButton.classList.add("selected");
    pngButton.classList.remove("selected");

    selectedFormat.textContent = "JPG selected";
});

convertButton.addEventListener("click", function () {

    const file = imageInput.files[0];

    if (!file) {
        status.textContent = "Please choose an image first.";
        return;
    }

    const image = new Image();

    image.onload = function () {

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        if (selectedFormatValue === "jpg") {
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        context.drawImage(image, 0, 0);

        if (selectedFormatValue === "jpg") {
            convertedImage = canvas.toDataURL("image/jpeg", 0.9);
        } else {
            convertedImage = canvas.toDataURL("image/png");
        }

        downloadButton.disabled = false;

        status.textContent = "Image converted successfully.";
    };

    image.src = URL.createObjectURL(file);
});

downloadButton.addEventListener("click", function () {

    if (!convertedImage) {
        status.textContent = "Convert the image first.";
        return;
    }

    const link = document.createElement("a");

    link.href = convertedImage;

    if (selectedFormatValue === "png") {
        link.download = "converted-image.png";
    } else {
        link.download = "converted-image.jpg";
    }

    link.click();

    status.textContent = "Download started.";
});

clearButton.addEventListener("click", function () {

    imageInput.value = "";

    previewImage.src = "";
    previewImage.style.display = "none";
    previewText.style.display = "block";

    fileName.textContent = "No file selected";

    selectedFormatValue = "png";

    pngButton.classList.add("selected");
    jpgButton.classList.remove("selected");

    selectedFormat.textContent = "PNG selected";

    convertedImage = null;
    downloadButton.disabled = true;

    status.textContent = "Cleared.";
});