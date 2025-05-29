import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.taxRate = 0.06;
    this.shippingBase = 10;
    this.shippingPerItem = 2;
  }

  calculateSubtotal() {
    return this.cartItems.reduce((sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);
  }

  calculateTax(subtotal) {
    return subtotal * this.taxRate;
  }

  calculateShipping() {
    if (this.cartItems.length === 0) return 0;
    return this.shippingBase + this.shippingPerItem * (this.cartItems.length - 1);
  }

  calculateOrderTotal(subtotal, tax, shipping) {
    return subtotal + tax + shipping;
  }

  displayOrderSummary() {
    const subtotal = this.calculateSubtotal();
    const tax = this.calculateTax(subtotal);
    const shipping = this.calculateShipping();
    const total = this.calculateOrderTotal(subtotal, tax, shipping);

    document.getElementById("cart-subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("cart-tax").textContent = tax.toFixed(2);
    document.getElementById("cart-shipping").textContent = shipping.toFixed(2);
    document.getElementById("cart-total").textContent = total.toFixed(2);
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity || 1
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = {};
    for (const [key, value] of formData.entries()) {
      order[key] = value;
    }

    // Adiciona os campos do pedido
    const subtotal = this.calculateSubtotal();
    const tax = this.calculateTax(subtotal);
    const shipping = this.calculateShipping();
    const total = this.calculateOrderTotal(subtotal, tax, shipping);

    order.orderDate = new Date().toISOString();
    order.orderTotal = total.toFixed(2);
    order.tax = tax.toFixed(2);
    order.shipping = shipping;
    order.items = this.packageItems(this.cartItems);

    // Envia para o servidor
    const response = await ExternalServices.checkout(order);
    return response;
  }
}