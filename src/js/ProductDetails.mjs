// productDetails.mjs
import { getLocalStorage, setLocalStorage, getAlertMessage } from './utils.mjs';
import Alert from './Alert.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  triggerCartAnimation() {
    console.log("Disparando animação...");
    const cart = document.querySelector('.cart');
    if (cart) {
      cart.classList.add("animate");
      console.log("Classe .animate adicionada!");

      setTimeout(() => {
        cart.classList.remove("animate");
        console.log("Classe .animate removida após 2s!");
      }, 400);
    }
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  async addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];
    const existingIndex = cartItems.findIndex(item => item.Id === this.product.Id);
    let alertType = "";
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity || 1) + 1;
      alertType = "increment";
    } else {
      const productToAdd = { ...this.product, quantity: 1 };
      cartItems.push(productToAdd);
      alertType = "add";
    }
    setLocalStorage("so-cart", cartItems);
    updateCartNumber();
    this.triggerCartAnimation();

    displayTotalPrice(cartItems.reduce((acc, item) => acc + item.FinalPrice * (item.quantity || 1), 0));

    const alertData = await getAlertMessage(alertType);
    new Alert(alertData.message || "Unknown alert", alertData.background || "green", alertData.color || "white");
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }

}

export function updateCartNumber() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.querySelector('.cart-count');
  //Add a superscript number of items in the cart to the backpack icon according to the number of items in the cart
  if (cartCountElement) {
    let counter = 0;
    cartItems.forEach(product => {
      counter += product.quantity;
    });
    cartCountElement.textContent = counter;
  }
}

function productDetailsTemplate(product) {
  // Set up basic product details
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  const productPriceContainer = document.getElementById('productPrice');

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    // Create original price (crossed out)
    const originalPrice = document.createElement("span");
    originalPrice.className = "original-price";
    originalPrice.textContent = `$${product.SuggestedRetailPrice.toFixed(2)}`;

    // Create discounted price
    const finalPrice = document.createElement("span");
    finalPrice.className = "discounted-price";
    finalPrice.textContent = `$${product.FinalPrice.toFixed(2)}`;

    // Create amount saved flag
    const amountSaved = product.SuggestedRetailPrice - product.FinalPrice;
    const discountFlag = document.createElement("span");
    discountFlag.className = "discount-flag";
    discountFlag.textContent = `Save $${amountSaved.toFixed(2)}!`;

    // Append prices and flag to the container
    productPriceContainer.innerHTML = "";
    productPriceContainer.appendChild(originalPrice);
    productPriceContainer.appendChild(finalPrice);
    productPriceContainer.appendChild(discountFlag);
  } else {
    productPriceContainer.textContent = `$${product.FinalPrice.toFixed(2)}`;
  }

  // Add discount percentage badge if applicable
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPerc = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );

    const discountBadge = document.createElement("span");
    discountBadge.className = "discount-badge";
    discountBadge.textContent = `${discountPerc}% OFF`;

    // Insert discount badge after the price container
    productPriceContainer.parentElement.insertBefore(discountBadge, productPriceContainer.nextSibling);
  }

  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
