const handleCostKeydown = (e) => {
  if (e.keyCode === 13) {
    calculateTotal();
  }
};

const calculateTotal = () => {
  const inputElement = document.querySelector('.js-cost-input');
  let cost = Number(inputElement.value);

  if (cost < 40) {
    cost = cost + 10;
  }

  document.querySelector('.total-cost').innerHTML = `$${cost}`;
};
