import menuItems from "./menuData.js";

// ─── DOM Elements ───────────────────────────────────────────
const tableContainer = document.querySelector(".totalTable");
const wrapMenu       = document.querySelector(".wrapMenu");
const backButton     = document.querySelector(".backButton");
const selectedTable  = document.querySelector(".selectedTable");
const menu           = document.querySelector(".menu");
const cartItems      = document.querySelector(".cartItems");
const totalPrice     = document.querySelector(".totalPrice");

// ─── State ──────────────────────────────────────────────────
let currentTable = null;
let table=10
let cart    = {};

// ─── Generate Tables ────────────────────────────────────────
function generateTables() {
  for (let i = 1; i <= 10; i++) {
    const tableDiv = document.createElement("div");
    tableDiv.className    = "table w-28 h-28 border border-red-500";
    tableDiv.dataset.table = i;
    tableDiv.textContent  = i;
    tableContainer.appendChild(tableDiv);
  }
}

// ─── Generate Menu Cards ─────────────────────────────────────
function generateMenu() {
  menuItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card w-42 h-42 border border-gray-300";
    card.innerHTML = `
      <h3 class="text-lg font-semibold">${item.name}</h3>
      <p class="text-gray-600">${item.description}</p>
      <div class="mt-3 flex justify-between items-center">
        <span class="font-bold">Rs. ${item.price}</span>
        <button type="button" class="addToCart px-3 py-1 bg-green-500 text-white rounded" data-item-id="${item.id}">
          Add
        </button>
      </div>
    `;
    wrapMenu.appendChild(card);
  });
}

// ─── Active Table Highlight ──────────────────────────────────
function setActiveTable(tableDiv) {
  document.querySelectorAll(".table").forEach((table) => {
    table.classList.remove("bg-green-500");
  });
  tableDiv.classList.add("bg-green-500");
}
//——————create array object——————————————————————————

for(let i=1;i<=table; i++){
  cart[i]=[]
}

// ─── Add Item To Cart ────────────────────────────────────────
function addItemToCart(id) {
  const selectedItem = menuItems.find((item) => item.id === id);
  if (!selectedItem) return;

  const itemExist = cart[currentTable].find((item) => item.name === selectedItem.name);
  if (itemExist) {
    itemExist.quantity = (itemExist.quantity || 1) + 1;
  } else {
    cart[currentTable].push({ ...selectedItem, quantity: 1 });
  }

  renderCart();
}

// ─── Render Cart ─────────────────────────────────────────────
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart[currentTable].forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${item.price}</td>
      <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
    `;
    cartItems.appendChild(row);
    total += item.price * item.quantity;
  });

  totalPrice.innerText = `Rs. ${total.toFixed(2)}`;
}

// ─── Event Listeners ─────────────────────────────────────────

// table click
tableContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("table")) return;

  const table = e.target.closest(".table");
  setActiveTable(table);

  currentTable = table.dataset.table;
  renderCart()
  selectedTable.innerText = `Table: ${currentTable}`;

  tableContainer.classList.add("hidden");
  menu.classList.remove("hidden");
});

// back button
backButton.addEventListener("click", () => {
  tableContainer.classList.remove("hidden");
  menu.classList.add("hidden");
});

// add to cart buttons
wrapMenu.addEventListener("click", (e) => {
  if (!e.target.classList.contains("addToCart")) return;
  const id = Number(e.target.dataset.itemId);
  addItemToCart(id);
});

// ─── Init ─────────────────────────────────────────────────────
generateTables();
generateMenu();