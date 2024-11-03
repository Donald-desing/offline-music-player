// Authentication and Basic Setup
const authScreen = document.getElementById("authScreen");
const playerUI = document.getElementById("playerUI");
const playlistContainer = document.getElementById("playlistContainer");
const userSettings = document.getElementById("userSettings");
const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progressBar");
const currentSongDisplay = document.getElementById("currentSong");

let songs = [];            // Stores uploaded songs
let playlists = [];        // Stores playlists
let currentSongIndex = 0;  // Tracks current song index
let isShuffle = false;
let isRepeat = false;

// Show the player UI if the user is logged in
function login() {
    authScreen.style.display = "none";
    playerUI.style.display = "block";
}

// Create a New Playlist
function createPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
        playlists.push({ name: playlistName, songs: [] });
        displayPlaylists();
    }
}

// Display All Playlists
function displayPlaylists() {
    playlistContainer.innerHTML = "";
    playlists.forEach((playlist, index) => {
        const playlistElement = document.createElement("div");
        playlistElement.textContent = playlist.name;
        playlistElement.onclick = () => viewPlaylist(index);
        playlistContainer.appendChild(playlistElement);
    });
}

// View Playlist Details
function viewPlaylist(index) {
    const playlist = playlists[index];
    const songNames = playlist.songs.map(song => song.name).join("\n");
    alert(`Songs in ${playlist.name}:\n${songNames}`);
}

// Share Playlist (Placeholder)
function sharePlaylist() {
    alert("Playlist shared!");
}

// Filter Songs by Genre (Placeholder)
function filterSongsByGenre() {
    alert("Filtering songs by genre...");
}

// Edit Profile
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

// Play/Pause Song Toggle
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById("playPauseBtn").textContent = "Pause";
    } else {
        audioPlayer.pause();
        document.getElementById("playPauseBtn").textContent = "Play";
    }
}

// Update Progress Bar and Current Time Display
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", handleSongEnd);

function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }
}

// Handle Song End (Repeat, Shuffle, or Next)
function handleSongEnd() {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
        playSong(songs[currentSongIndex]);
    } else {
        nextSong();
    }
}

// Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
}

// Previous Song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
}

// Play Selected Song
function playSong(song) {
    audioPlayer.src = URL.createObjectURL(song);
    audioPlayer.play();
    currentSongDisplay.textContent = `Playing: ${song.name}`;
}

// Pause Song
function pauseSong() {
    audioPlayer.pause();
}

// Upload Songs
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", (event) => {
    const selectedFiles = Array.from(event.target.files);
    songs.push(...selectedFiles);
    displaySongs();
});

// Display Uploaded Songs
function displaySongs() {
    const songList = document.getElementById("songList");
    songList.innerHTML = ""; // Clear previous songs
    songs.forEach((song, index) => {
        const songElement = document.createElement("div");
        songElement.textContent = song.name;
        songElement.onclick = () => {
            currentSongIndex = index;
            playSong(song);
        };
        songList.appendChild(songElement);
    });
}
