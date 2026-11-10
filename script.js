const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");
const fileName = document.getElementById("fileName");
const status = document.getElementById("status");

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

    status.textContent = "Image loaded.";
});

const pngButton = document.getElementById("pngButton");
const jpgButton = document.getElementById("jpgButton");
const selectedFormat = document.getElementById("selectedFormat");

let selectedFormatValue = "png";

pngButton.classList.add("selected");

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