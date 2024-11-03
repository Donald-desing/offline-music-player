// Elements
const authScreen = document.getElementById("authScreen");
const playerUI = document.getElementById("playerUI");
const playlistContainer = document.getElementById("playlistContainer");
const userSettings = document.getElementById("userSettings");
const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progressBar");
const currentSongDisplay = document.getElementById("currentSong");

// Global Variables
let songs = [];
let playlists = [];
let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;

// Login Function
function login() {
    authScreen.style.display = "none";
    playerUI.style.display = "block";
}

// Attach login event to the form
document.getElementById("authForm").addEventListener("submit", function(event) {
    event.preventDefault();
    login();
});

// Create a New Playlist
function createPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
        playlists.push({ name: playlistName, songs: [] });
        displayPlaylists();
    }
}

// Display Playlists in the UI
function displayPlaylists() {
    playlistContainer.innerHTML = "";
    playlists.forEach((playlist, index) => {
        const playlistElement = document.createElement("div");
        playlistElement.textContent = playlist.name;
        playlistElement.onclick = () => viewPlaylist(index);
        playlistContainer.appendChild(playlistElement);
    });
}

// View Playlist Songs
function viewPlaylist(index) {
    const playlist = playlists[index];
    const songNames = playlist.songs.map(song => song.name).join("\n");
    alert(`Songs in ${playlist.name}:\n${songNames}`);
}

// Share Playlist Functionality
function sharePlaylist() {
    alert("Playlist shared!");
}

// Filter Songs by Genre (Placeholder Function)
function filterSongsByGenre() {
    alert("Filtering songs by genre...");
}

// Edit Profile Function
function editProfile() {
    const newUsername = prompt("Enter new username:");
    if (newUsername) {
        alert(`Profile updated with username: ${newUsername}`);
        userSettings.textContent = `Username: ${newUsername}`;
    }
}

// Logout Function
function logout() {
    playerUI.style.display = "none";
    authScreen.style.display = "block";
}

// Toggle Shuffle Mode
function toggleShuffle() {
    isShuffle = !isShuffle;
    alert(`Shuffle is now ${isShuffle ? "on" : "off"}`);
}

// Toggle Repeat Mode
function toggleRepeat() {
    isRepeat = !isRepeat;
    alert(`Repeat is now ${isRepeat ? "on" : "off"}`);
}

// Playback Control Functions
function playSong(song) {
    audioPlayer.src = URL.createObjectURL(song);
    audioPlayer.play();
    currentSongDisplay.textContent = `Playing: ${song.name}`;
}

function pauseSong() {
    audioPlayer.pause();
}

// Update Progress Bar
function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
}

// Handle Song End Event
function handleSongEnd() {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        playSong(songs[currentSongIndex]);
    } else if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
        playSong(songs[currentSongIndex]);
    } else {
        nextSong();
    }
}

// Go to Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
}

// Event Listeners for Playback Controls
document.getElementById("shuffleBtn").addEventListener("click", toggleShuffle);
document.getElementById("repeatBtn").addEventListener("click", toggleRepeat);
document.getElementById("playPauseBtn").addEventListener("click", function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        pauseSong();
    }
});
document.getElementById("nextBtn").addEventListener("click", nextSong);
document.getElementById("prevBtn").addEventListener("click", function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
});

// Audio Player Event Listeners
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", handleSongEnd);

// Volume Control
document.getElementById("volumeSlider").addEventListener("input", function(event) {
    audioPlayer.volume = event.target.value;
});

// Upload Songs to Library
document.getElementById("fileInput").addEventListener("change", function(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (file.type.startsWith("audio/")) {
            songs.push(file);
        }
    });
    alert(`${files.length} files added to your library`);
    // Optionally, display the list of songs in your library
});
