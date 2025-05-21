import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import Alert from './Alert.mjs';
import { getLocalStorage } from './utils.mjs';
import { setLocalStorage } from './utils.mjs';  //check if it works or not

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems); //before it was showing an error

}
// add to cart button event handler
async function addToCartHandler(e) {
  new Alert();

  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);

}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler)

// Instancia e inicializa o produto
const productPage = new ProductDetails(productID, dataSource); //Art changed from product Id para productID
productPage.init();

function updateCartNumber() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.querySelector('.cart-count');
  //Add a superscript number of items in the cart to the backpack icon according to the number of items in the cart
  if (cartCountElement) {
    cartCountElement.textContent = cartItems.length;
  }
}

updateCartNumber();