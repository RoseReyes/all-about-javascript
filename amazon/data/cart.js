export const cart = [];

export const addToCart = (productId) => {
  const productIdx = cart.findIndex((item) => item.productId === productId);
  const quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  if (productIdx === -1) {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  } else {
    cart[productIdx]['quantity'] += quantity;
  }
};
