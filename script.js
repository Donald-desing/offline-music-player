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

let songs = [];
let currentSongIndex = 0;

// Load playlist from local storage on page load
document.addEventListener("DOMContentLoaded", loadPlaylistFromLocalStorage);

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
    if (currentSongIndex < songs.length - 1) {
        loadSong(currentSongIndex + 1);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        loadSong(currentSongIndex - 1);
    }
});

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

// Save playlist to local storage
function savePlaylistToLocalStorage() {
    const songData = songs.map(song => ({
        name: song.name,
        type: song.type,
        content: URL.createObjectURL(song)
    }));
    localStorage.setItem("playlist", JSON.stringify(songData));
}

// Load playlist from local storage
function loadPlaylistFromLocalStorage() {
    const savedSongs = JSON.parse(localStorage.getItem("playlist"));
    if (savedSongs) {
        // Recreate File objects from stored data
        songs = savedSongs.map(fileInfo => {
            const fileBlob = new Blob([fileInfo.content], { type: fileInfo.type });
            return new File([fileBlob], fileInfo.name, { type: fileInfo.type });
        });
        displaySongs();
        loadSong(0); // Load the first song
    }
}
