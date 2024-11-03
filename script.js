const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');
const seekBar = document.getElementById('seek-bar');
const fileInput = document.getElementById('file-input');
const playlistContainer = document.getElementById('playlist-container');
const shuffleBtn = document.getElementById('shuffle');
const loopBtn = document.getElementById('loop');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

let playlist = [];
let isLooping = false;
let isShuffling = false;
let currentSongIndex = 0;

// IndexedDB setup
const dbPromise = idb.openDB('music-player-db', 1, {
    upgrade(db) {
        db.createObjectStore('playlists', { keyPath: 'id' });
    }
});

// Load playlists from IndexedDB
dbPromise.then(db => {
    return db.transaction('playlists').objectStore('playlists').getAll();
}).then(result => {
    if (result.length > 0) {
        playlist = result[0].songs;
        updatePlaylistUI();
    }
});

// Event listeners
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});

shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
});

loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    loopBtn.classList.toggle('active', isLooping);
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const song = {
            title: file.name,
            src: url
        };
        addToPlaylist(song);
        document.querySelector('label[for="file-input"]').textContent = file.name;
    }
});
