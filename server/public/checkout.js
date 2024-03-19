// This is your test publishable API key.
const stripe = Stripe("pk_test_51OvpUi2LHwPQKUjhrs5FrqallM64kZnghA1kyrshs0HfLWvfTdV4ddi0HJpghqhgeDOCqzxjyuaympen1gkCUu2x00X3SXBSJv");

initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
  const response = await fetch("/create-checkout-session", {
    method: "POST",
  });

  const { clientSecret } = await response.json();

  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}