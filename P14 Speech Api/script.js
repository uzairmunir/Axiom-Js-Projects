const toggleBtn = document.getElementById('toggle');
const customTextContainer = document.getElementById('custom-text-container');
const closeBtn = document.getElementById('close-btn');
const voicesDropdown = document.getElementById('voices');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.getElementById('main');

const data = [
  // For Angry Image
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  // For Drink Image
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  // For Food Image
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  // For Grandma Image
  {
    image: './img/grandma.jpg',
    text: "I'm Miss Grandma",
  },
  // For Happy Image
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  // For Home Image
  {
    image: './img/home.jpg',
    text: 'I want to go home',
  },
  // For Hurt Image
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  // For Outside Image
  {
    image: './img/outside.jpg',
    text: 'I like the outdoors',
  },
  // For Sad Image
  {
    image: './img/sad.jpg',
    text: "I don't like being sad",
  },
  // For Scared Image
  {
    image: './img/scared.jpg',
    text: "I'm scary",
  },
  // For School Image
  {
    image: './img/school.jpg',
    text: 'Long time since I went to school',
  },
  // For Tired Image
  {
    image: './img/tired.jpg',
    text: "I'm so tired",
  },
];

let voicesArray = [];

// function to create ui element for pre-defined text to speech
const createUIElement = (predefineObj) => {
  const { image, text } = predefineObj;
  // create dom element
  const div = document.createElement('div');
  // assign class to div element
  div.classList.add('box');
  // add html content in the div
  div.innerHTML = `
    <img src=${image} alt=${text}/>
    <p class="image-info">${text}</p>
    `;
  // Add event listener for the div
  div.addEventListener('click', () => {
    setText(text);
    speakText();
  });
  // render in UI
  main.appendChild(div);
};
//Initialize the speech synth
const message = new SpeechSynthesisUtterance();

//Function to set text for speak
function setText(text) {
  message.text = text;
}

// function for speaking the text
function speakText() {
  speechSynthesis.speak(message);
}

const speech = window.speechSynthesis;

// function to fetch voices from web api
const fetchVoices = () => {
  if (speech.onvoiceschanged !== 'undefined') {
    speech.onvoiceschanged = () => renderVoices;
  }
};

// Function to render voices from web api
function renderVoices() {
  const voices = speech.getVoices(); // now should have an array of all voices
  // Get voices from speech synthesis get voices method
  voicesArray = voices;
  // Render voices in the dropdown
  voicesArray.forEach((voice) => {
    let option = document.createElement('option');
    option.textContent = `${voice.name} ${voice.lang}`;
    if (voice.default) {
      option.textContent += '(DEFAULT VOICE)';
    }
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voicesDropdown.appendChild(option);
  });
}
// Fetch voices on initial page load
fetchVoices();

// Run a loop on the data array to display the images in the UI
data.forEach(createUIElement);

//Event Listeners

//Listen for click on Toggle Button
toggleBtn.addEventListener('click', () => {
  customTextContainer.classList.toggle('show');
});

//Listen for click on Close Button
closeBtn.addEventListener('click', () => {
  customTextContainer.classList.remove('show');
});
// 3. Listen for voiceschanged in the speechSynthesis
speechSynthesis.addEventListener('voiceschanged', fetchVoices);
// 4. Listen for click on readBtn
readBtn.addEventListener('click', () => {
  setText(customText.value);
  speakText();
});
