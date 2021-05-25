const currencyOne = document.getElementById('currency-one');
const currencyOneAmount = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const currencyTwoAmount = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

populateUi();

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
// Set Items in Local Storage
const setCurrencyOne = (currencyOne) => {
  localStorage.setItem('setCurrencyOne', currencyOne);
};
const setCurrencyTwo = (currencyTwo) => {
  localStorage.setItem('setCurrencyTwo', currencyTwo);
};
const setCurrencyOneAmount = (currencyOneAmount) => {
  localStorage.setItem('setCurrencyOneAmount', currencyOneAmount);
};
// Event Listeners
currencyOne.addEventListener('change', (e) => {
  setCurrencyOne(e.target.value);
  calculate();
});
currencyOneAmount.addEventListener('input', () => {
  setCurrencyOneAmount(currencyOneAmount.value);
  calculate();
});
currencyTwo.addEventListener('change', (e) => {
  setCurrencyTwo(e.target.value);
  calculate();
});
currencyTwoAmount.addEventListener('input', calculate);
// Swap Currencies
swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

//Get data from Local Storage Update The Ui
function populateUi() {
  const selectedCurrencyOne = localStorage.getItem('setCurrencyOne');
  const selectedCurrencyTwo = localStorage.getItem('setCurrencyTwo');
  const setCurrencyOneAmount = localStorage.getItem('setCurrencyOneAmount');
  if (selectedCurrencyOne && selectedCurrencyTwo && setCurrencyOneAmount) {
    currencyOne.value = selectedCurrencyOne;
    currencyTwo.value = selectedCurrencyTwo;
    currencyOneAmount.value = setCurrencyOneAmount;
  }
}
calculate();
