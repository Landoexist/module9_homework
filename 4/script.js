var widthField = document.querySelector(".width-field");
var heightField = document.querySelector(".height-field");
var btn = document.querySelector(".btn");
var outputField = document.querySelector(".output");

function checkValues(widthElement, heightElement, button, outputElement) {
    if (
        widthElement.value >= 100 &&
        widthElement.value <= 300 &&
        widthElement.value % 1 == 0 &&
        heightElement.value >= 100 &&
        heightElement.value <= 300 &&
        heightElement.value % 1 == 0
    ) {
        button.disabled = false;
        outputElement.innerHTML = "Image will be here";
    } else {
        button.disabled = true;
        outputElement.innerHTML = "One of the values ​​is out of range from 100 to 300";
    }
}

widthField.addEventListener("input", () =>
    checkValues(widthField, heightField, btn, outputField)
);
heightField.addEventListener("input", () =>
    checkValues(widthField, heightField, btn, outputField)
);

const useRequest = () => {
    return fetch(`https://picsum.photos/${widthField.value}/${heightField.value}`)
        .then((response) => response.url)
        .catch(console.log("error"));
};

btn.addEventListener("click", async () => {
    const requestResult = await useRequest();
    outputField.innerHTML = `
    <img src="${requestResult}">
    `;
});
