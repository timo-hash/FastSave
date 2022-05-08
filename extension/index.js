const name = document.getElementById("name");
const position = document.getElementById("position");
const website = document.getElementById("website");
const date = document.getElementById("date");
const saveBtn = document.getElementById("save-btn");
const delBtn = document.getElementById("rm-all-btn");
const genSiteBtn = document.getElementById("gen-site-btn");

let numberOfRows = 0;
const myTable = document.getElementById("table");
render();

function render() {
  let row = myTable.insertRow(1);

  let cellName = row.insertCell(0);
  let cellPosition = row.insertCell(1);
  let cellDate = row.insertCell(2);

  cellName.innerHTML = name.value;
  cellPosition.innerHTML = position.value;
  cellDate.innerHTML = date.value;
}

saveBtn.addEventListener("click", function () {
  render();
  numberOfRows += 1;
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

delBtn.addEventListener("click", function () {
  while (numberOfRows > 0) {
    myTable.deleteRow(1);
    numberOfRows -= 1;
  }
});
