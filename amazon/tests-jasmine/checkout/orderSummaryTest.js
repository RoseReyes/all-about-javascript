import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';

describe('Test suite: render order summary', () => {
  it('displays the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        `;

    const id1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const id2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    // mock the data from local storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });

    loadFromStorage();
    renderOrderSummary();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(
      2
    );

    expect(
      document.querySelector(`.js-product-quantity-${id1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${id2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

    const id1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const id2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    // mock the data from local storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });

    loadFromStorage();

    renderOrderSummary();

    document.querySelector(`.js-delete-link-${id1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(
      1
    );

    expect(document.querySelector(`.js-cart-item-container-${id1}`)).toEqual(
      null
    );

    expect(
      document.querySelector(`.js-cart-item-container-${id2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual(id2);
  });
});
