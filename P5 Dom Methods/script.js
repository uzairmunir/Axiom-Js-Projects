const addUserBtn = document.getElementById('add-user');
const filter = document.getElementById('filter');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');
const main = document.getElementById('main');

let data = [];

// Fetch Random User from Api
const fetchRandomUser = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 1000000),
  };
  addUserData(newUser);
};
const addUserData = (userData) => {
  data.push(userData);
  updateDom();
};
// Function To Double Money
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, balance: user.balance * 2 };
  });
  updateDom();
};
// Function to Filter Millionaire User
const filterUser = () => {
  data = data.filter((user) => user.balance > 1000000);
  updateDom();
};
// Function to Sort user
const sortUser = () => {
  data = data.sort((a, b) => b.balance - a.balance);
  updateDom();
};
// Function to format random number as money
function formatNumberToDollar(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// Function to get Total Balance
const totalWealth = () => {
  const balance = data.reduce((acc, user) => (acc += user.balance), 0);
  const balanceElement = document.createElement('div');
  balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(
    balance
  )}</h3>`;
  main.appendChild(balanceElement);
};
// Update dom
const updateDom = (userData = data) => {
  main.innerHTML = '<h2><strong>User</strong>Wealth</h2>';
  userData.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.innerHTML = `<strong>${user.name}</strong>${formatNumberToDollar(
      user.balance
    )}`;
    main.appendChild(userDiv);
  });
};

//Event Listeners
addUserBtn.addEventListener('click', fetchRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
filter.addEventListener('click', filterUser);
sortBtn.addEventListener('click', sortUser);
sumBtn.addEventListener('click', totalWealth);
fetchRandomUser();
fetchRandomUser();
