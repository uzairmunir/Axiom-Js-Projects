const currencyOne = document.getElementById('currency-one');
const currencyOneAmount = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const currencyTwoAmount = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

const calculate = () => {
  const currencyOneCode = currencyOne.value;
  const currencyTwoCode = currencyTwo.value;
  fetch(
    ` https://v6.exchangerate-api.com/v6/51497476eca5e4e1c1293582/pair/${currencyOneCode}/${currencyTwoCode}`
  )
    .then((res) => res.json())
    .then((data) => {
      const conversionRate = data.conversion_rate;
      rate.innerText = `1 ${currencyOneCode}=${conversionRate} ${currencyTwoCode}`;
      currencyTwoAmount.value = (
        currencyOneAmount.value * conversionRate
      ).toFixed(2);
    });
};
// Event Listeners
currencyOne.addEventListener('change', calculate);
currencyOneAmount.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
currencyTwoAmount.addEventListener('input', calculate);
// Swap Currencies
swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});
calculate();
