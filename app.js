let items = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const table = document.getElementById("table-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("items"));

if (leadsFromLocalStorage) {
  items = leadsFromLocalStorage;
  render(items);
}

function render(arr) {
  let listItem = "<table>";
  let rowId = 1;
  arr.forEach((element) => {
    listItem += `
      <tr style=${
        rowId % 2 === 0
          ? '"background-color: #f2f2f2"'
          : "background-color: #04AA6D"
      }>
          <td><p id="text-${rowId}" style="padding-left: 5px">${element.replaceAll(
      /-/g,
      " "
    )}</p>
    </td>
      <td style="width: 10%; text-align: center">
        <img src="./icon/clipboard-svgrepo-com.svg" id="clipboard-${rowId}" style="cursor: pointer">
      </td>
      <tr/>
    `;
    rowId++;
  });
  listItem += "</table>";
  table.innerHTML = listItem;
}

inputBtn.addEventListener("click", () => {
  items.push(inputEl.value);
  inputEl.value = "";
  items = JSON.stringify(items);
  localStorage.setItem("items", items);
  items = JSON.parse(items);
  render(items);
  addEventToClipboard();
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  items = [];
  render(items);
  addEventToClipboard();
});

const addEventToClipboard = () => {
  for (let row = 1; row <= items.length; row++) {
    const clipBoard = document.getElementById(`clipboard-${row}`);
    clipBoard.addEventListener("click", () => {
      const value = document.getElementById(`text-${row}`).textContent;
      clipBoard.src = "./icon/clipboard-check-svgrepo-com.svg";

      window.navigator.clipboard.writeText(value);

      setTimeout(() => {
        clipBoard.src = "./icon/clipboard-svgrepo-com.svg";
      }, 2000);
    });
  }
};

addEventToClipboard();
