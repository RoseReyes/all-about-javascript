let productsHTML = '';

const displayProducts = () => {
  const addedMessageTimeouts = {};

  products.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${product.image} />
          </div>
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png" />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${(product.priceCents / 100).toFixed(
            2
          )}</div>
          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option
                selected
                value="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          <div class="js-added-to-cart-${product.id} added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>
          <button class="js-add-to-cart add-to-cart-button button-primary" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>`;
  });

  document.querySelector('.products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const quantity = Number(
        document.querySelector(
          `.js-quantity-selector-${button.dataset.productId}`
        ).value
      );

      const productIdx = cart.findIndex(
        (item) => item.productId === button.dataset.productId
      );

      if (productIdx === -1) {
        cart.push({
          productId: button.dataset.productId,
          quantity: quantity,
        });
      } else {
        cart[productIdx]['quantity'] += quantity;
      }

      // sum the product quantity
      const cartQuantity = cart.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      );

      // display added
      document
        .querySelector(`.js-added-to-cart-${button.dataset.productId}`)
        .classList.add('added-to-cart-visible');

      // we check if there's a previous timeout id
      const previousTimeoutId = addedMessageTimeouts[button.dataset.productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        document
          .querySelector(`.js-added-to-cart-${button.dataset.productId}`)
          .classList.remove('added-to-cart-visible');
      }, 2000);

      // Save the timeoutId for this product
      // so we can stop it later if we need to.
      addedMessageTimeouts[button.dataset.productId] = timeoutId;

      // append to the DOM
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
  });
};
const init = () => {
  displayProducts();
};

init();
