export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export const addOrder = (order) => {
  orders.unshift(order);
};

const saveToStorage = () => {
  localStorage.setItem('orders', JSON.stringify(orders));
};
