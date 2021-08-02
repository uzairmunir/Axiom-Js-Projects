const music = document.querySelector('audio');
const img = document.querySelector('img');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const volume = document.querySelector('#volume');
const volumeBtn = document.querySelector('#volume-up');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const songs = [
  {
    name: 'royaa',
    title: 'Maine Royaan',
    artist: 'Arijit Singh',
  },
  {
    name: 'dil',
    title: 'Dil Ko Karaar Aya',
    artist: 'Arijit Singh',
  },
  {
    name: 'mast',
    title: 'Mast Magan',
    artist: 'Arijit Singh',
  },
];
let songIndex = 0;

const audioStatus = () => {
  if (music.paused) {
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    img.classList.add('animate');
  } else {
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('animate');
  }
};

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  music.src = `music/${song.name}.m4a`;
  img.src = `img/${song.name}.jpg`;
}

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  audioStatus();
};
const previousSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  audioStatus();
};
const setVolume = () => {
  music.volume = volume.value / 100;
  if (music.volume !== 0) {
    volumeBtn.classList = 'fas fa-volume-up';
  } else {
    volumeBtn.classList.replace('fa-volume-up', 'fa-volume-mute');
  }
};
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
};
function setProgress(e) {
  // Get the overall width in px for progress bar container
  const width = this.clientWidth;
  // Get the x axis px value for the location of click on the progress bar container
  const clickLocation = e.offsetX;
  // Get the total duration of the track
  const duration = audio.duration;
  // Reassign the currentTime of audio track by calculating based on above metrics
  audio.currentTime = (clickLocation / width) * duration;
}

playBtn.addEventListener('click', audioStatus);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', previousSong);
volume.addEventListener('change', setVolume);
music.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
