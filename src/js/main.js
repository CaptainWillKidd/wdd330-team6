import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { updateCartNumber } from "./ProductDetails.mjs";

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();

  const dataSource = new ExternalServices('tents');
  const productListElement = document.querySelector('.product-list'); // or your specific selector
  const tentList = new ProductList('tents', dataSource, productListElement);
  tentList.init();

  updateCartNumber();
});

/*function updateCartNumber() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCountElement = document.querySelector('.cart-count');
    //Add a superscript number of items in the cart to the backpack icon according to the number of items in the cart
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}*/
