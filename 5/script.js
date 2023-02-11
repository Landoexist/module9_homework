var pageElement = document.getElementById("pageNumber");
var limitElement = document.getElementById("limit");
var btn = document.querySelector(".container__button");
var outputElement = document.querySelector(".container__output");

var infoText = "";
var output = "";
var checkValuesFlag = 0;

function checkPageElementValue(pageElem) {
  if (pageElem.value >= 1 && pageElem.value <= 10 && pageElem.value % 1 == 0) {
    return true;
  } else return false;
}

function checkLimitElementValue(limitElem) {
  if (
    limitElem.value >= 1 &&
    limitElem.value <= 10 &&
    limitElem.value % 1 == 0
  ) {
    return true;
  } else return false;
}

function checkValues(pageElem, limitElem) {
  if (pageElem.value == "" || limitElem.value == "") {
    return (checkValuesFlag = 0);
  }
  if (
    checkPageElementValue(pageElem) == true &&
    checkLimitElementValue(limitElem) == false
  )
    return (checkValuesFlag = 1);
  if (
    checkPageElementValue(pageElem) == false &&
    checkLimitElementValue(limitElem) == true
  )
    return (checkValuesFlag = 2);
  if (
    checkPageElementValue(pageElem) == false &&
    checkLimitElementValue(limitElem) == false
  )
    return (checkValuesFlag = 3);
  if (
    checkPageElementValue(pageElem) == true &&
    checkLimitElementValue(limitElem) == true
  )
    return (checkValuesFlag = 4);
}

function showInfoAboutInputValuse() {
  switch (checkValuesFlag) {
    case 0:
      infoText = "Enter page and limit values";
      break;
    case 1:
      infoText = "Page value is out of range from 1 to 10";
      break;
    case 2:
      infoText = "Limit value is out of range from 1 to 10";
      break;
    case 3:
      infoText = "Page number and limit values ​​out of range from 1 to 10";
      break;
    case 4:
      infoText = "Press the button";
      btn.disabled = false;
      break;
  }
  return infoText;
}

pageElement.addEventListener("input", () => {
  checkValues(pageElement, limitElement);
  showInfoAboutInputValuse();
  outputElement.innerHTML = `
    ${infoText}
    `;
});

limitElement.addEventListener("input", () => {
  checkValues(pageElement, limitElement);
  showInfoAboutInputValuse();
  outputElement.innerHTML = `
    ${infoText}
    `;
});

const useRequest = () => {
  return fetch(
    `https://picsum.photos/v2/list?page=${Math.trunc(
      pageElement.value
    )}&limit=${Math.trunc(limitElement.value)}`
  )
    .then((response) => response.json())
    .then((data) => {
      output = "";
      data.forEach((element) => {
        const outputBlock = `
        <div class="container__output-card">
          <img src="${element.download_url}" class="container__output-image" alt="Image">
          <p>${element.author}</p>
        </div>
        `;
        output += outputBlock;
      });
      return output;
    })
    .catch(console.log("error"));
};

btn.addEventListener("click", async () => {
  const requestResult = await useRequest();
  outputElement.innerHTML = requestResult;
  localStorage.setItem("myKey", requestResult);
  localStorage.setItem("pageValue", pageElement.value);
  localStorage.setItem("limitValue", limitElement.value);
});

window.onload = function () {
  outputElement.innerHTML = localStorage.getItem("myKey");
  pageElement.value = localStorage.getItem("pageValue");
  limitElement.value = localStorage.getItem("limitValue");
};
