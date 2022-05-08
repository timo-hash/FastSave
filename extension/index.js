const name = document.getElementById("name");
const position = document.getElementById("position");
const website = document.getElementById("website");
const date = document.getElementById("date");
const saveBtn = document.getElementById("save-btn");
const delBtn = document.getElementById("rm-all-btn");
const genSiteBtn = document.getElementById("gen-site-btn");

const myTable = document.getElementById("table");

render();

function render() {
  var row = myTable.insertRow(1);

  var cellName = row.insertCell(0);
  var cellPosition = row.insertCell(1);
  var cellDate = row.insertCell(2);

  cellName.innerHTML = name.value;
  cellPosition.innerHTML = position.value;
  cellDate.innerHTML = date.value;
}

saveBtn.addEventListener("click", function () {
  name.value = "";
  position.value = "";
  date.value = "";
});

genSiteBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0].url);
    website.value = tabs[0].url;
  });
});
