const inputValue = document.querySelector(".input-field");
var btn = document.querySelector(".btn");
var outputNode = document.querySelector(".output");
var output = ``;

function useRequest(url, callback) {
  output = ``;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status != 200) console.log("Respone status: ", xhr.status);
    else {
      const result = JSON.parse(xhr.response);
      if (callback) callback(result);
    }
  };

  xhr.onerror = function () {
    console.log("Error! Respone status: ", xhr.status);
  };
  xhr.send();
}

function displayResult(apiData) {
  apiData.forEach((element) => {
    const outputBlock = `
    <div class="card-item">
    <img src="${element.download_url}" class="image-item" alt="Image">
    <p>${element.author}</p>
  </div>
        `;
    output += outputBlock;
  });
  outputNode.innerHTML = output;
}

inputValue.addEventListener("input", () => {
  if (inputValue.value < 1 || inputValue.value > 10 || inputValue.value % 1 !== 0) {
    outputNode.innerHTML = `Enter an integer from 1 to 10`;
    btn.disabled = true;
  } else {
    btn.disabled = false;
    outputNode.innerHTML = `Pictures will be here`;
  }
})


btn.addEventListener("click", () => {
  useRequest(
    `https://picsum.photos/v2/list/?limit=${inputValue.value
    }`,
    displayResult
  );
});