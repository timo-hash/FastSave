const name = document.getElementById("name");
const position = document.getElementById("position");
const website = document.getElementById("website");
const saveBtn = document.getElementById("save-btn");
const delBtn = document.getElementById("rm-all-btn");
const genSiteBtn = document.getElementById("gen-site-btn");

// const table = document.getElementById("table");
const tableFromLocalStorage = JSON.parse(localStorage.getItem("table"));

saveBtn.addEventListener("click", function () {
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  cell1.innerHTML = name.value;
  cell2.innerHTML = position.value;

  name.value = "";
  position.value = "";
});
