// Tab Switching Functionality
const tabs = document.querySelectorAll('.tabButton');
const tabContents = document.querySelectorAll('.tabContent');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active')); // Remove active class from all tabs
        tab.classList.add('active'); // Add active class to the clicked tab

        tabContents.forEach(content => {
            content.classList.remove('active'); // Hide all tab contents
        });

        const targetTab = document.getElementById(tab.id.replace('tab', '').toLowerCase() + 'Tab');
        targetTab.classList.add('active'); // Show the clicked tab's content
    });
});

// File Upload and Drag-and-Drop Functionality
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const musicList = document.getElementById('musicList');
const audioPlayer = document.getElementById('audioPlayer');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
let shuffleState = false;
let repeatState = false;
let musicFiles = [];

// Handle file upload
fileInput.addEventListener('change', handleFileUpload);
dropZone.addEventListener('dragover', event => event.preventDefault()); // Allow dropping
dropZone.addEventListener('drop', handleDrop);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mp3') {
        addMusicToPlayer(file);
    } else {
        alert('Please upload a valid MP3 file.');
    }
}

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'audio/mp3') {
        addMusicToPlayer(file);
    }
}

// Add music to the player list
function addMusicToPlayer(file) {
    const fileURL = URL.createObjectURL(file);
    musicFiles.push(fileURL);

    // Create list item for the uploaded music
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    listItem.addEventListener('click', () => {
        audioPlayer.src = fileURL;
        audioPlayer.play();
    });

    musicList.appendChild(listItem);
    updateMusicList();
}

// Update the music list in the 'Your Music' tab
function updateMusicList() {
    const uploadedMusicList = document.getElementById('uploadedMusicList');
    uploadedMusicList.innerHTML = '';

    musicFiles.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Music ${index + 1}`;
        listItem.addEventListener('click', () => {
            audioPlayer.src = file;
            audioPlayer.play();
        });
        uploadedMusicList.appendChild(listItem);
    });
}

// Shuffle button functionality
shuffleBtn.addEventListener('click', () => {
    shuffleState = !shuffleState;
    shuffleBtn.textContent = shuffleState ? 'Shuffle: On' : 'Shuffle: Off';
});

// Repeat button functionality
repeatBtn.addEventListener('click', () => {
    repeatState = !repeatState;
    repeatBtn.textContent = repeatState ? 'Repeat: On' : 'Repeat: Off';
    audioPlayer.loop = repeatState; // Set the repeat functionality
});