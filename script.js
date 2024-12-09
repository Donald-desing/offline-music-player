const audioPlayer = document.getElementById("audio-player");
const audioList = document.getElementById("audio-list");
const progressBar = document.getElementById("progress-bar");
const shuffleButton = document.getElementById("shuffle-btn");
const repeatButton = document.getElementById("repeat-btn");
const fileInput = document.getElementById("file-input");

let audioFiles = [];
let isShuffling = false;
let isRepeating = false;

// Load initial tracks from local storage
function loadPlaylist() {
  const savedTracks = JSON.parse(localStorage.getItem("audioFiles")) || [];
  audioFiles = savedTracks;

  savedTracks.forEach((track) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.dataset.file = track.file;

    li.addEventListener("click", () => {
      audioPlayer.src = li.dataset.file;
      audioPlayer.play();
    });

    audioList.appendChild(li);
  });
}

// Save tracks to local storage
function savePlaylist() {
  localStorage.setItem("audioFiles", JSON.stringify(audioFiles));
}

// Handle shuffle functionality
shuffleButton.addEventListener("click", () => {
  isShuffling = !isShuffling;
  shuffleButton.textContent = isShuffling ? "Shuffle: On" : "Shuffle: Off";
});

// Handle repeat functionality
repeatButton.addEventListener("click", () => {
  isRepeating = !isRepeating;
  repeatButton.textContent = isRepeating ? "Repeat: On" : "Repeat: Off";
});

// Play next track or shuffle
audioPlayer.addEventListener("ended", () => {
  if (isRepeating) {
    audioPlayer.play();
  } else if (isShuffling) {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    audioPlayer.src = audioFiles[randomIndex].file;
    audioPlayer.play();
  } else {
    const currentIndex = audioFiles.findIndex(
      (audio) => audio.file === audioPlayer.src
    );
    const nextIndex = (currentIndex + 1) % audioFiles.length;
    audioPlayer.src = audioFiles[nextIndex].file;
    audioPlayer.play();
  }
});

// Update progress bar
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress || 0;
});

// Seek track position
progressBar.addEventListener("click", (event) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const newTime = (clickX / rect.width) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
});

// Handle file uploads
fileInput.addEventListener("change", (event) => {
  const files = event.target.files;

  Array.from(files).forEach((file) => {
    const url = URL.createObjectURL(file);
    const li = document.createElement("li");
    li.textContent = file.name;
    li.dataset.file = url;

    li.addEventListener("click", () => {
      audioPlayer.src = li.dataset.file;
      audioPlayer.play();
    });

    audioList.appendChild(li);
    audioFiles.push({ name: file.name, file: url });
  });

  savePlaylist();
});

// Load playlist on page load
loadPlaylist();