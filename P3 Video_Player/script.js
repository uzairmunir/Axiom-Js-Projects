const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');
const fullScreenBtn = document.getElementById('full-screen-btn');

// Functions
// Create Function for clicking on Video
const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
// Create Function for updating Play/Pause icon
const updateIcon = () => {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};
// Create Function for Updating Progress
const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  timeStamp.innerHTML = `${mins}:${secs}`;
};
// Create Function for Stop video
const stopVideo = () => {
  video.currentTime = 0;
  video.pause();
};
// Set Progress for slider
const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

// Event Listeners
//1 Event Listener for Video Player
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('dblclick', () => {
  video.requestFullscreen();
});

//2 Event Listener for Play Button
play.addEventListener('click', toggleVideoStatus);

//3 Event Listener for Stop Button
stop.addEventListener('click', stopVideo);

//4 Event Listener for Progress Bar
progress.addEventListener('change', setVideoProgress);

//5 Event for Full Screen
fullScreenBtn.addEventListener('click', () => {
  video.requestFullscreen();
});
