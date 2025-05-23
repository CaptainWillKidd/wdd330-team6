import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import Alert from './Alert.mjs';

const category = getParam("category")

const dataSource = new ProductData(`${category}`);
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
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
  .addEventListener("click", addToCartHandler);

// Instancia e inicializa o produto
const productPage = new ProductDetails(productId, dataSource);
productPage.init();
