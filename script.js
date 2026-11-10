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