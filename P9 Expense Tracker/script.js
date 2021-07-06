const balance = document.getElementById('total-balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const Transactions = [
  { id: 1, reason: 'Salary', amount: 5000 },
  { id: 2, reason: 'Breakfast', amount: -20 },
  { id: 3, reason: 'Lunch', amount: -30 },
  { id: 4, reason: 'Dinner', amount: -60 },
];
let transactions = Transactions;

const displayTransaction = (transaction) => {
  const type = transactions.amount > 0 ? '+' : '-';
  const transactionLi = document.createElement('li');
  transactionLi.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
  transactionLi.innerHTML = `
    ${transaction.reason} <span>${transaction.amount}</span>
    <button class="del-btn" onClick="deleteTransaction(${transaction.id})"  >X</button>
    `;
  list.appendChild(transactionLi);
};
const updateBalance = () => {
  const transactionAmount = transactions.map(
    (transaction) => transaction.amount
  );
  const totalBalance = transactionAmount.reduce(
    (acc, value) => (acc += value),
    0
  );
  const creditBalance = transactionAmount
    .filter((amount) => amount > 0)
    .reduce((acc, value) => (acc += value), 0);
  const debitBalance = transactionAmount
    .filter((amount) => amount < 0)
    .reduce((acc, value) => (acc += value), 0);
  balance.innerText = `${totalBalance}`;
  moneyCredit.innerText = `${creditBalance}`;
  moneyDebit.innerText = `${debitBalance}`;
};
const firstInit = () => {
  list.innerHTML = '';
  transactions.forEach(displayTransaction);
  updateBalance();
};
const addTransaction = (e) => {
  e.preventDefault();
  if (reason.value.trim() === '' || amount.value.trim() === '') {
    alert('Please provide a valid reason and transaction amount.');
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 10000),
      reason: reason.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    displayTransaction(transaction);
    updateBalance();
    reason.value = '';
    amount.value = '';
  }
};
const deleteTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  firstInit();
};

form.addEventListener('submit', addTransaction);
firstInit();
