// Selecting HTML elements
const fileInput = document.getElementById("fileInput");
const songList = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentSongDisplay = document.getElementById("currentSong");
const volumeSlider = document.getElementById("volumeSlider");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const favoriteSongsDisplay = document.getElementById("favoriteSongs");

let songs = [];
let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;
let favoriteSongs = [];

// Handle file input
fileInput.addEventListener("change", (event) => {
    songs = Array.from(event.target.files);
    displaySongs();
    loadSong(0);
    savePlaylistToLocalStorage();
});

// Display song list
function displaySongs() {
    songList.innerHTML = ""; // Clear previous list
    songs.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.textContent = song.name;
        songItem.classList.add("song-item");
        songItem.addEventListener("click", () => loadSong(index));
        
        // Add favorite toggle
        const favoriteBtn = document.createElement("button");
        favoriteBtn.textContent = favoriteSongs.includes(song) ? "Unfavorite" : "Favorite";
        favoriteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent loading song
            toggleFavorite(index);
            favoriteBtn.textContent = favoriteSongs.includes(song) ? "Unfavorite" : "Favorite";
        });

        songItem.appendChild(favoriteBtn);
        songList.appendChild(songItem);
    });
}

// Load a selected song
function loadSong(index) {
    if (songs.length === 0) return;
    currentSongIndex = index;
    const song = songs[index];
    audioPlayer.src = URL.createObjectURL(song);
    currentSongDisplay.textContent = `Playing: ${song.name}`;
    playSong();
}

// Play and pause functionality
function playSong() {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
}

function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Next and previous buttons
nextBtn.addEventListener("click", () => {
    if (isShuffle) {
        loadSong(Math.floor(Math.random() * songs.length));
    } else {
        if (currentSongIndex < songs.length - 1) {
            loadSong(currentSongIndex + 1);
        } else if (isRepeat) {
            loadSong(0); // Loop back to the start
        }
    }
});

prevBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        loadSong(currentSongIndex - 1);
    }
});

// Shuffle functionality
shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
});

// Repeat functionality
repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
});

// Favorite song functionality
function toggleFavorite(index) {
    const song = songs[index];
    if (favoriteSongs.includes(song)) {
        favoriteSongs = favoriteSongs.filter(fav => fav !== song);
    } else {
        favoriteSongs.push(song);
    }
    displayFavorites();
}

// Display favorite songs
function displayFavorites() {
    favoriteSongsDisplay.innerHTML = "";
    favoriteSongs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.textContent = song.name;
        favoriteSongsDisplay.appendChild(songItem);
    });
}

// Update progress bar as song plays
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

// Seek in the song
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

// Set the initial volume
audioPlayer.volume = volumeSlider.value;

// Update volume based on slider value
volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});
