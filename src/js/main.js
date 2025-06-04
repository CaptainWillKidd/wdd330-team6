import { loadHeaderFooter, getLocalStorage, updateBreadcrumb } from './utils.mjs';
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


document.addEventListener("DOMContentLoaded", () => {
  updateBreadcrumb()
});

document.addEventListener("DOMContentLoaded", function() {
  if (!localStorage.getItem("registerBannerShown")) {
    document.getElementById("register-banner").style.display = "flex";
    document.getElementById("close-banner").onclick = function() {
      document.getElementById("register-banner").style.display = "none";
      localStorage.setItem("registerBannerShown", "true");
    };
    // Also hide banner and set localStorage when clicking Register Now
    const registerBtn = document.querySelector(".register-btn");
    if (registerBtn) {
      registerBtn.addEventListener("click", function() {
        document.getElementById("register-banner").style.display = "none";
        localStorage.setItem("registerBannerShown", "true");
        // The link will still redirect to /register.html
      });
    }
  }
});

/*function updateCartNumber() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCountElement = document.querySelector('.cart-count');
    //Add a superscript number of items in the cart to the backpack icon according to the number of items in the cart
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}*/
