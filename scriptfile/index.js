import menuItems from "./menuData.js";
const tableContainer = document.querySelector(".totalTable");
const wrapMenu = document.querySelector(".wrapMenu");
let backButton = document.querySelector(".backButton");
let selectedTable = document.querySelector(".selectedTable");
let menu = document.querySelector(".menu");
const cartItems = document.querySelector(".cartItems");
const totalPrice = document.querySelector(".totalPrice");
let tableNo = null;
let cart = [];

for (let i = 1; i <= 10; i++) {
  const tableDiv = document.createElement("div");
  tableDiv.className = `table w-28 h-28  border border-red-500 `;
  tableDiv.dataset.table = i;
  tableDiv.textContent = i;
  tableContainer.appendChild(tableDiv);
}

//card
menuItems.forEach((item) => {
  const card = document.createElement("div");
  card.className = " card w-42 h-42 border border-gray-300";
  card.innerHTML = `
    <h3 class="text-lg font-semibold">${item.name}</h3>

    <p class="text-gray-600">${item.description}</p>

    <div class="mt-3 flex justify-between items-center">
        <span class="font-bold">Rs. ${item.price}</span>

        <button type= "text" class="addToCart px-3 py-1 bg-green-500 text-white rounded" data-item-Id="${item.id}">
            Add
        </button>
    </div>
`;

  wrapMenu.appendChild(card);
});

tableContainer.addEventListener("click", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("table")) return;

  let table = e.target.closest(".table");
  activeTable(table);

  tableNo = table.dataset.table;
  selectedTable.innerText = `Table: ${tableNo}`;

  //for switching screen
  tableContainer.classList.add("hidden");
  menu.classList.remove("hidden");
});

backButton.addEventListener("click", () => {
  tableContainer.classList.remove("hidden");
  menu.classList.add("hidden");
});

function activeTable(tableDiv) {
  document.querySelectorAll(".table").forEach((table) => {
    table.classList.remove("bg-green-500");
  });

  tableDiv.classList.add("bg-green-500");
}

//add to cart
const addToCart = document.querySelectorAll(".addToCart");

addToCart.forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.itemId);
    let selectedItem = null;  
    menuItems.forEach((item) => {
     
      if (item.id === id) {
        selectedItem = item;
      }
      
    });
    if (selectedItem) {
      cart.push(selectedItem);
      renderCart();
    }
  });
});

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((items) => {

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${items.name}</td>
    <td>1</td>
    <td>${items.price}</td>
    <td>${items.price}</td>
    `;

    cartItems.appendChild(row);
    total += items.price 
    totalPrice.innerText = total
  });
}
