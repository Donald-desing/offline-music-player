// Elements
const fileInput = document.getElementById('fileInput');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');

// Event listener for file input
fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const songName = file.name;

      // Save the song details to local storage
      let storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
      storedSongs.push({ name: songName, url });
      localStorage.setItem('songs', JSON.stringify(storedSongs));

      // Add song to playlist
      addToPlaylist(songName, url);
    });
  }
});

// Function to load songs from local storage on page load
function loadPlaylist() {
  const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
  storedSongs.forEach((song) => {
    addToPlaylist(song.name, song.url);
  });
}

// Function to add song to playlist
function addToPlaylist(songName, url) {
  const listItem = document.createElement('li');
  listItem.textContent = songName;

  // Play song on click
  listItem.addEventListener('click', () => {
    audioPlayer.src = url;
    audioPlayer.play();
  });

  playlist.appendChild(listItem);
}

// Load the playlist when the page loads
document.addEventListener('DOMContentLoaded', loadPlaylist);