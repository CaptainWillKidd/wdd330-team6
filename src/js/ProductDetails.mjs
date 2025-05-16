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

    // Corrected event listener (removed duplicate .getElementById chain)
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Set up basic product details
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;
  
  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  // Format and display the product price
  const productPriceEl = document.getElementById('productPrice');
  productPriceEl.textContent = `$${product.FinalPrice.toFixed(2)}`;
  
  // Check for a discount: if FinalPrice is less than SuggestedRetailPrice...
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPerc = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) *
        100
    );
    const discountBadge = document.createElement('span');
    discountBadge.className = 'discount-badge';
    discountBadge.textContent = `${discountPerc}% OFF`;
    // Insert the discount badge immediately after the price element.
    productPriceEl.parentElement.insertBefore(discountBadge, productPriceEl.nextSibling);
  }

  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
