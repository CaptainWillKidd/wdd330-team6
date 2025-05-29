import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();

import ExternalServices from './ExternalServices.mjs';

const dataSource = new ExternalServices('tents');
import ProductList from './ProductList.mjs';

import { getLocalStorage } from './utils.mjs';

import { updateCartNumber } from "./ProductDetails.mjs";

const productListElement = document.querySelector('.product-list'); // or your specific selector
const tentList = new ProductList('tents', dataSource, productListElement);
tentList.init();

/*function updateCartNumber() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCountElement = document.querySelector('.cart-count');
    //Add a superscript number of items in the cart to the backpack icon according to the number of items in the cart
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}*/

updateCartNumber();
