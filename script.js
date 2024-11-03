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

// Add a song to the playlist
function addToPlaylist(song) {
    playlist.push(song);
    updatePlaylistUI();
    savePlaylist();
}

// Remove a song from the playlist
function removeFromPlaylist(index) {
    playlist.splice(index, 1);
    updatePlaylistUI();
    savePlaylist();
}

// Save playlist to IndexedDB
function savePlaylist() {
    dbPromise.then(db => {
        const tx = db.transaction('playlists', 'readwrite');
        tx.objectStore('playlists').put({ id: 1, songs: playlist });
        return tx.complete;
    });
}

// Play a song
function playSong(index) {
    currentSongIndex = index;
    const song = playlist[index];
    audioPlayer.src = song.src;
    audioPlayer.play();
    updateCurrentSongUI(index);
}

// Shuffle the playlist
function shufflePlaylist() {
    playlist.sort(() => Math.random() - 0.5);
    updatePlaylistUI();
}

// Update UI for current song
function updateCurrentSongUI(index) {
    const items = playlistContainer.children;
    for (let i = 0; i < items.length; i++) {
        items[i].classList.toggle('active', i === index);
    }
}

// Update the playlist UI
function updatePlaylistUI() {
    playlistContainer.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.classList.add('song-item');
        li.addEventListener('click', () => playSong(index));
        playlistContainer.appendChild(li);
    });
}

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

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

seekBar.addEventListener('input', () => {
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = progress;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('ended', () => {
    if (isLooping) {
        playSong(currentSongIndex);
    } else if (isShuffling) {
        playSong(Math.floor(Math.random() * playlist.length));
    } else {
        playSong((currentSongIndex + 1) % playlist.length);
    }
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const song = {
        title: file.name,
        src: url
    };
    addToPlaylist(song);
});

shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
});

loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    loopBtn.classList.toggle('active', isLooping);
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}
