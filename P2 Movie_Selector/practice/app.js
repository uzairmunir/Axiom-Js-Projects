const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const movie1 = document.getElementById('movie1');
const movie2 = document.getElementById('movie2');
const movie3 = document.getElementById('movie3');
const movie4 = document.getElementById('movie4');
const movie5 = document.getElementById('movie5');
console.log(movie1);
let ticketPrice = +movieSelect.value;

populateUI();

// Pull data from Local Storage to build UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Function to update counts
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const countSelectedSeats = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = countSelectedSeats;
  total.innerText = ticketPrice * countSelectedSeats;
}

// Function to save the selected movie and it's price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Event Listener for Change on Select Movie Dropdown
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Event Listener for Click on Available Seats
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Calculate initial number of seats and total price
updateSelectedCount();
// Function to display Movies
movieSelect.addEventListener('change', (e) => {
  let style1 = e.target.value == 30 ? 'block' : 'none';
  let style2 = e.target.value == 40 ? 'block' : 'none';
  let style3 = e.target.value == 35 ? 'block' : 'none';
  let style4 = e.target.value == 25 ? 'block' : 'none';
  let style5 = e.target.value == 20 ? 'block' : 'none';

  movie1.style.display = style1;
  movie2.style.display = style2;
  movie3.style.display = style3;
  movie4.style.display = style4;
  movie5.style.display = style5;
});
