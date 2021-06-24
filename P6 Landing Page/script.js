const menuToggle = document.getElementById('toggle');
const closeModel = document.getElementById('close');
const openModel = document.getElementById('open');
const model = document.getElementById('model');

menuToggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});
openModel.addEventListener('click', () => {
  model.classList.add('show-model');
});
closeModel.addEventListener('click', () => {
  model.classList.remove('show-model');
});

window.addEventListener('click', (e) => {
  e.target === model ? model.classList.remove('show-model') : false;
});
