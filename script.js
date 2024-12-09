// Elements
const fileInput = document.getElementById('fileInput');
const yourMusicList = document.getElementById('yourMusicList');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

// Music Array
let musicList = [];
let currentMusicIndex = 0;

// Handle file input
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mp3') {
        const fileURL = URL.createObjectURL(file); // Create a temporary URL for the audio file
        musicList.push({ name: file.name, url: fileURL });
        displayMusicList();
    } else {
        alert("Please upload a valid MP3 file.");
    }
});

// Display the uploaded music in the list
function displayMusicList() {
    yourMusicList.innerHTML = ''; // Clear the list
    musicList.forEach((music, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = music.name;
        listItem.addEventListener('click', () => {
            playMusic(index);
        });
        yourMusicList.appendChild(listItem);
    });
}

// Play or pause music
function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
}

// Play music at a specific index
function playMusic(index) {
    if (index >= 0 && index < musicList.length) {
        currentMusicIndex = index;
        audioPlayer.src = musicList[currentMusicIndex].url;
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
}

// Previous music
function prevMusic() {
    if (currentMusicIndex > 0) {
        currentMusicIndex--;
        playMusic(currentMusicIndex);
    }
}

// Next music
function nextMusic() {
    if (currentMusicIndex < musicList.length - 1) {
        currentMusicIndex++;
        playMusic(currentMusicIndex);
    }
}

// Shuffle music
function shuffleMusic() {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    playMusic(randomIndex);
}

// Repeat music
function repeatMusic() {
    audioPlayer.loop = !audioPlayer.loop;
    repeatBtn.textContent = audioPlayer.loop ? 'Repeat: On' : 'Repeat: Off';
}

// Event listeners for playback controls
playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);
shuffleBtn.addEventListener('click', shuffleMusic);
repeatBtn.addEventListener('click', repeatMusic);

// Search music
function filterMusic() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredMusic = musicList.filter(music => music.name.toLowerCase().includes(searchQuery));
    displayFilteredMusic(filteredMusic);
}

// Display filtered music
function displayFilteredMusic(filteredMusic) {
    yourMusicList.innerHTML = '';
    filteredMusic.forEach((music, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = music.name;
        listItem.addEventListener('click', () => {
            playMusic(index);
        });
        yourMusicList.appendChild(listItem);
    });
}