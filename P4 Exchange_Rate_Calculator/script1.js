const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');

const calculate = () => {
  const currencyCode = currencyOne.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/51497476eca5e4e1c1293582/latest/${currencyCode}`
  )
    .then((res) => res.json())
    .then((data) => {
      const conversionRate = data.conversion_rates;
      const keys = Object.keys(conversionRate);
      console.log(keys);
      console.log(conversionRate);
      keys.forEach((key) => {
        const table = document.getElementById('table');
        const row = `<tr>
        <td>${key}
        <td>${conversionRate[key]}<td/>
        </tr>
        `;
        table.innerHTML += row;
      });
    });
};

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
calculate();
