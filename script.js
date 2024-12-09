// Elements
const fileInput = document.getElementById('fileInput');
const yourMusicList = document.getElementById('yourMusicList');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const homeTab = document.getElementById('homeTab');
const uploadTab = document.getElementById('uploadTab');
const searchTab = document.getElementById('searchTab');
const homeContent = document.getElementById('homeContent');
const uploadContent = document.getElementById('uploadContent');

// Music Array and Current Index
let musicList = [];
let currentMusicIndex = 0;

// Add some default music from assets folder
function addDefaultMusic() {
    const assetsMusic = [
        { name: 'Chukua Udongo (MP3_320K).mp3', url: 'assets/music/Chukua_Udongo.mp3' },
        { name: 'Matata Ft. Watendawili - Inakubalika (Official Video)(MP3_160K).mp3', url: 'assets/music/Matata_Inakubalika.mp3' }
    ];
    musicList = [...assetsMusic];
    displayMusicList();
}

// Handle file input
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mp3') {
        const fileURL = URL.createObjectURL(file);
        musicList.push({ name: file.name, url: fileURL });
        displayMusicList();
    } else {
        alert("Please upload a valid MP3 file.");
    }
});

// Display the uploaded music in the list
function displayMusicList() {
    yourMusicList.innerHTML = '';
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

// Tab Navigation
homeTab.addEventListener('click', () => {
    homeContent.classList.add('active');
    uploadContent.classList.remove('active');
});

uploadTab.addEventListener('click', () => {
    uploadContent.classList.add('active');
    homeContent.classList.remove('active');
});

searchTab.addEventListener('click', () => {
    // Implement Search functionality if needed
});

// Event listeners for playback controls
playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);
shuffleBtn.addEventListener('click', shuffleMusic);
repeatBtn.addEventListener('click', repeatMusic);

// Initialize with default music
addDefaultMusic();