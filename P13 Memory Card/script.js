const addCardBtn = document.getElementById('add-btn');
const clearCardBtn = document.getElementById('clear-btn');
const cardContainer = document.getElementById('card-container');
const prevCardBtn = document.getElementById('prev-btn');
const nextCardBtn = document.getElementById('next-btn');
const addCardContainer = document.getElementById('add-card-container');
const cancelBtn = document.getElementById('cancel-btn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const currentCard = document.getElementById('current-card');
const submitCardBtn = document.getElementById('add-card-btn');

// ID of current card
let currentCardID = 0;

// Collection of Cards DOM Elements
const cards = [];
const cardData = getCardData();
// // Collection of Cards data
// const cardData = [
//   {
//     // 0
//     question: 'What is React?',
//     answer:
//       'React is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
//   },
//   {
//     // 1
//     question: 'What is HTML?',
//     answer:
//       'The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.',
//   },
//   {
//     // 2
//     question: 'What is MongoDB?',
//     answer:
//       'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License.',
//   },
// ];
// Function to save card on local storage
const saveCardsData = (cardData) => {
  localStorage.setItem('cards', JSON.stringify(cardData));
  window.location.reload();
};
// Function to get Cards from local storage
function getCardData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}
//Function to update current card text
const updateCurrentCardNav = () => {
  currentCard.innerText = `${currentCardID + 1}/${cards.length}`;
};

//Function to Generate Cards Based on Data
const generateCards = () => {
  cardData.forEach((data, index) => generateCardData(data, index));
};

//Function to generate a single card
const generateCardData = (data, index) => {
  // create a div for card element
  const card = document.createElement('div');
  // assign class to card
  card.classList.add('card');

  //assign active class only when index is 0
  if (index === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `
    <div class="card-inside">
    <div class="card-front">
    <p>${data.question}</p>
    </div>
    <div class="card-back">
    <p>${data.answer}</p>
    </div>
    </div>
    `;
  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  cards.push(card);
  cardContainer.appendChild(card);
  updateCurrentCardNav();
};
// Event Listener
// listen for the click on Next button
nextCardBtn.addEventListener('click', () => {
  // Update the class for the current card to make it inactive
  cards[currentCardID].className = 'card left';
  currentCardID++;
  if (currentCardID > cards.length - 1) {
    currentCardID = 0;
  }
  cards[currentCardID].className = 'card active';
  updateCurrentCardNav();
});
//Listen for the click on previous button
prevCardBtn.addEventListener('click', () => {
  cards[currentCardID].className = 'card right';
  currentCardID--;
  if (currentCardID < 0) {
    currentCardID = cards.length - 1;
  }
  cards[currentCardID].className = 'card active';
  updateCurrentCardNav();
});
//Listen click for the add Card btn
addCardBtn.addEventListener('click', () =>
  addCardContainer.classList.add('active')
);
cancelBtn.addEventListener('click', () =>
  addCardContainer.classList.remove('active')
);
submitCardBtn.addEventListener('click', () => {
  const question = questionInput.value;
  const answer = answerInput.value;
  if (question.trim() && answer.trim()) {
    const nextCard = { question, answer };
    generateCardData(nextCard);
    questionInput.value = '';
    answerInput.value = '';
    addCardContainer.classList.remove('active');
    cardData.push(nextCard);
    saveCardsData(cardData);
  }
});
// listen click for Clear cards
clearCardBtn.addEventListener('click', () => {
  localStorage.clear();
  cardContainer.innerHTML = '';
  window.location.reload();
});
generateCards();
