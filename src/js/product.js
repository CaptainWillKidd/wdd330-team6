import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServies from "./ExternalServices.mjs";
import ProductDetails, { updateCartNumber} from "./ProductDetails.mjs";
import Alert from './Alert.mjs';

const category = getParam("category")

const dataSource = new ExternalServies(`${category}`);

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
  .addEventListener("click", addToCartHandler);

const productPage = new ProductDetails(productId, dataSource);
productPage.init();

updateCartNumber();
