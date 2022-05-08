const cname = document.getElementById("name");
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
  retrieveData();

  for (let i = 0; i < arr.length; i++) {
    let row = myTable.insertRow();

    let cellName = row.insertCell();
    let cellPosition = row.insertCell();
    let cellDate = row.insertCell();
    cellName.innerHTML = arr[i].name;
    cellPosition.innerHTML = arr[i].position;
    cellDate.innerHTML = arr[i].date;
  }
}

var arr = new Array();
saveBtn.addEventListener("click", function () {
  retrieveData();
  arr.push({
    name: cname.value,
    position: position.value,
    date: date.value,
  });

  localStorage.setItem("localData", JSON.stringify(arr));
  render();
  numberOfRows += 1;
  cname.value = "";
  position.value = "";
  date.value = "";
});

function retrieveData() {
  let str = localStorage.getItem("localData");

  if (str != null) {
    arr = JSON.parse(str);
  }
}

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

  localStorage.clear();
});
