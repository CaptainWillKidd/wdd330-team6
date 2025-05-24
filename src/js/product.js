import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import Alert from './Alert.mjs';

import { updateCartNumber } from "./ProductDetails.mjs";

const dataSource = new ProductData();
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// add to cart button event handler
async function addToCartHandler(e) {
  new Alert();

  const product = await dataSource.findProductById(e.target.dataset.id);
  //addProductToCart(product);

}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler)
updateCartNumber();
