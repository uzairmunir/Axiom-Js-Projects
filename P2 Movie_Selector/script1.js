const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi();
let ticketPrice = +movieSelect.value;
const updateCount = () => {
  const selectedSeat = document.querySelectorAll('.row .seat.selected');
  const selectedSeatCount = selectedSeat.length;
  const seatIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  console.log(seatIndex);
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
};
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};
function populateUi() {
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
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateCount();
  }
});
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCount();
});
updateCount();
