import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartNumber } from "./ProductDetails.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  if (!cartItems.length) {
    productList.innerHTML = "<li>Your Shopping Cart is Empty.</li>";
    displayTotalPrice(0);
    return;
  }

  const htmlItems = cartItems.map((item, i) => cartItemTemplate(item, i));
  productList.innerHTML = htmlItems.join("");

  displayTotalPrice(cartItems.reduce((acc, item) => acc + item.FinalPrice * (item.quantity || 1), 0));

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", removeFromCart);
  });

  document.querySelectorAll(".cart-qty-input").forEach(input => {
    input.addEventListener("change", updateQuantity);
  });

  updateCartNumber();
}

function updateQuantity(e) {
  const index = e.target.getAttribute("data-index");
  let cartItems = getLocalStorage("so-cart") || [];
  let qty = parseInt(e.target.value);
  if (qty < 1) qty = 1;
  cartItems[index].quantity = qty;
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}
function displayTotalPrice(itemPrice) {
  document.querySelector("#cart-total").innerHTML = `$${itemPrice.toFixed(2)}`;
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image || item.Images?.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors && item.Colors[0] ? item.Colors[0].ColorName : ''}</p>
      <label>
        qty: 
        <input type="number" min="1" value="${item.quantity || 1}" class="cart-qty-input" data-index="${index}" style="width:50px;">
      </label>
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
updateCartNumber();