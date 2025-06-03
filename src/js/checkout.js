import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess();

  // Display the current order summary on page load
  checkout.displayOrderSummary();

  // Get the checkout form by its ID
  const form = document.getElementById("checkout-form");
  if (!form) {
    console.error("Checkout form not found");
    return;
  }

  // When form is submitted, process the checkout
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await checkout.checkout(form);
      alert("Order successful! Order ID: " + response.orderId);
      // You can add code here to redirect or clear cart, etc.
    } catch (error) {
      alert("Checkout failed: " + error.message);
    }
  });
});
