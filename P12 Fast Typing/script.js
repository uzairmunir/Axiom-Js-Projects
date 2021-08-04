const word = document.getElementById('word');
const userWord = document.getElementById('user-word');
const settingContainer = document.getElementById('setting');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const settingBtn = document.getElementById('setting-btn');
const difficultyDropdown = document.getElementById('difficulty');
const settingForm = document.getElementById('form');
const gameOverContainer = document.getElementById('game-over');

let randomWord;
let score = 0;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';
let time = 5;
userWord.focus();
const fetchRandomWord = async () => {
  let res = await fetch('https://random-words-api.vercel.app/word');
  let data = await res.json();
  //   console.log(data[0].word);
  return data[0].word;
};
const renderWord = async () => {
  randomWord = await fetchRandomWord();
  word.innerHTML = randomWord;
};
const incrementScore = () => {
  score++;
  scoreElement.innerHTML = score;
};

const decrementTime = () => {
  time--;
  timeElement.innerHTML = time;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};
const timeInterval = setInterval(decrementTime, 1000);
function gameOver() {
  gameOverContainer.style.display = 'flex';
  gameOverContainer.innerHTML = `
  <h1>Game Over</h1>
  <p>Good Game! Your Score is ${score} </p>
  <button onClick="location.reload()">Paly Again</button/>
  `;
}

userWord.addEventListener('input', (e) => {
  const userInput = e.target.value;
  if (userInput === randomWord) {
    renderWord();
    incrementScore();
    e.target.value = '';
    if (difficulty === 'easy') {
      time += 3;
    } else if (difficulty === 'medium') {
      time += 2;
    } else {
      time += 1;
    }
    timeElement.innerHTML = time;
  }
});

settingBtn.addEventListener('click', () =>
  settingContainer.classList.toggle('hide')
);
difficultyDropdown.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
renderWord();
