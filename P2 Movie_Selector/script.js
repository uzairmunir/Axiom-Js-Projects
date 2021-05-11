const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi();
let ticketPrice = +movieSelect.value;

// Update the Value of Count and Total Price
const updateSelectedCount = () => {
  const selectedSeat = document.querySelectorAll('.row .seat.selected');
  const seatIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  console.log(seatIndex);
  const selectedSeatCount = selectedSeat.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
};
// Set Movie Price in local Storage
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};
// To get Data from local storage
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // Get the selected movie index from local storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  // Using the value from local storage, select the movie on page load
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//Event Listener For container to check for movies
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
// Event Listener for movie select
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
