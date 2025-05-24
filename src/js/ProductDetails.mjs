// productDetails.mjs
import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    updateCartNumber();
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
    cartCountElement.textContent = cartItems.length;
  }
}

function productDetailsTemplate(product) {
  // Set up basic product details
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
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

    // Append both prices to the container
    productPriceContainer.innerHTML = "";
    productPriceContainer.appendChild(originalPrice);
    productPriceContainer.appendChild(finalPrice);
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
