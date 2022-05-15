const cname = document.getElementById("name");
const position = document.getElementById("position");
const website = document.getElementById("website");
const date = document.getElementById("date");
const saveBtn = document.getElementById("save-btn");
const delBtn = document.getElementById("rm-all-btn");
const genSiteBtn = document.getElementById("gen-site-btn");
const myTable = document.getElementById("table");

let numberOfRows = 0;
let arr = new Array();
render();

saveBtn.addEventListener("click", function () {
  retrieveData();
  arr.push({
    name: cname.value,
    position: `<a target='_blank' href='${website.value}'>${position.value}</a>`,
    date: date.value,
  });

  var deadline = new Date(date.value);
  var dateNotif = new Date();
  const diffTime = deadline - dateNotif;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(deadline);
  console.log(dateNotif);
  console.log(diffDays + " days");
  // dateNotif.setDate(deadline.getDate - 2);
  if (diffDays == 2) {
    var notifObject = {
      type: "basic",
      title: "deadline",
      message: "should apply soon",
      iconUrl: "/res/icons8-alert-64.png",
    };
    chrome.notifications.create("chromNotif", notifObject);

    // chrome.notifications.create({
    //   type: "basic",
    //   title: "deadline",
    //   message: "should apply soon",
    //   iconUrl: "icons8-alert-64.png",
    // });
  }
  // todo: iterate through the dates
  for (var i = 1; i < myTable.rows.length; i++) {}

  localStorage.setItem("localData", JSON.stringify(arr));
  render();
  numberOfRows += 1;
  cname.value = "";
  position.value = "";
  website.value = "";
  date.value = "";
});

function retrieveData() {
  let str = localStorage.getItem("localData");
  if (str != null) {
    arr = JSON.parse(str);
    console.log("retrieveData ok");
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

function render() {
  retrieveData();

  // let myTable = document.getElementById("table");
  let x = myTable.rows.length;
  while (--x) {
    myTable.deleteRow(x);
  }

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
