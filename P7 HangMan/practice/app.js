const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const finalMessage = document.getElementById('final-message');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-btn');
const figureParts = document.querySelectorAll('.figure-part');
const notification = document.getElementById('notification-container');

const words = [
  'scientist',
  'song',
  'built',
  'word',
  'spell',
  'value',
  'support',
  'heavy',
  'men',
  'dead',
  'bad',
  'here',
  'street',
  'dream',
  'eventually',
  'original',
  'broad',
  'floating',
  'daily',
  'tool',
  'swimming',
  'mostly',
  'escape',
  'fourth',
  'within',
  'government',
  'somewhere',
  'means',
  'fight',
  'section',
  'longer',
  'clear',
  'creature',
  'situation',
  'who',
  'were',
  'turn',
  'table',
  'sure',
  'sugar',
  'sister',
  'wool',
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLettersArray = [];
const incorrectLettersArray = [];
const displayWord = () => {
  word.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          (letter) =>
            `<span class="letter">${
              correctLettersArray.includes(letter) ? letter : ''
            }</span>`
        )
        .join('')}
      `;
  const innerWord = word.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You Won';
    popup.style.display = 'flex';
  }
};
const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};
const updateIncorrectLetters = () => {
  incorrectLetters.innerHTML = `
    ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letters</p>' : ''}
    ${incorrectLettersArray.map((letter) => `<span>${letter}</span>`)}
    `;
  figureParts.forEach((part, index) => {
    const errors = incorrectLettersArray.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
    if (incorrectLettersArray.length === figureParts.length) {
      finalMessage.innerText = 'You Lost';
      popup.style.display = 'flex';
    }
  });
};
window.addEventListener('keydown', (e) => {
  // Check if key pressed is a letter a = 65 and z = 90
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    // Check if letter is in the selected word
    if (selectedWord.includes(letter)) {
      // Check if letter is already in correctLettersArray
      if (!correctLettersArray.includes(letter)) {
        // Add letter into the correctLettersArray
        correctLettersArray.push(letter);
        // Run the displayWord function again to display new letter
        displayWord();
      } else {
        showNotification();
      }
    } else {
      // Check if letter is already in incorrectLettersArray
      if (!incorrectLettersArray.includes(letter)) {
        // Add letter into the incorrectLettersArray
        incorrectLettersArray.push(letter);
        // Update the incorrect letters UI
        updateIncorrectLetters();
      } else {
        showNotification();
      }
    }
  }
});
playBtn.addEventListener('click', () => {
  incorrectLettersArray.splice(0);
  correctLettersArray.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  updateIncorrectLetters();
  popup.style.display = 'none';
  displayWord();
});
displayWord();
