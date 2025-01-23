export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
    },
    {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
    },
  ];
}

export const saveToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (productId) => {
  const quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  const productIdx = cart.findIndex((item) => item.id === productId);

  if (productIdx === -1) {
    cart.push({
      id: productId,
      quantity: quantity,
    });
  } else {
    cart[productIdx]['quantity'] += quantity;
  }

  saveToStorage();
};

export const removeFromCart = (productId) => {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.id !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
};
