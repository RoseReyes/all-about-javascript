export let cart;

export const loadFromStorage = () => {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
      {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];
  }
};

loadFromStorage();

export const saveToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (productId) => {
  const productIdx = cart.findIndex((item) => item.id === productId);

  if (productIdx > -1) {
    cart[productIdx]['quantity'] += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
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

export const updateDeliveryOption = (productId, deliveryOptionId) => {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};
