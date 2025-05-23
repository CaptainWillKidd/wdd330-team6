import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".cart-list");
  if (!cartItems.length) {
    productList.innerHTML = "<li>Your Shopping Cart is Empty.</li>";
    displayTotalPrice(0);
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  displayTotalPrice(cartItems.reduce((acc, item) => acc + item.FinalPrice, 0));

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", removeFromCart);
  });
}

function displayTotalPrice(itemPrice) {
  document.querySelector("#cart-total").innerHTML = `$${itemPrice.toFixed(2)}`;
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors && item.Colors[0] ? item.Colors[0].ColorName : ''}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <span class="remove-item" data-index="${index}" style="cursor:pointer;color:red;float:right;font-weight:bold;">X</span>
    </li>
  `;
}

function removeFromCart(event) {
  const index = event.target.getAttribute("data-index");
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
