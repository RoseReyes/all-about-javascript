import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProductsFetch } from '../data/products.js';

const loadPage = async () => {
  try {
    await loadProductsFetch();
  } catch {
    console.log('Unexpected error. Please try again later.');
  }
  renderOrderSummary();
  renderPaymentSummary();
};

loadPage();
