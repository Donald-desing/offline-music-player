// Handle file input and save it to local storage
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mp3') {
        // Create a file reader to read the file
        const reader = new FileReader();

        reader.onload = function() {
            // Save the file data (base64) into localStorage
            const musicData = {
                name: file.name,
                data: reader.result
            };

            // Check if localStorage already contains music files, and add the new one
            let musicList = JSON.parse(localStorage.getItem('musicFiles')) || [];
            musicList.push(musicData);
            localStorage.setItem('musicFiles', JSON.stringify(musicList));

            // Update the music list
            displayMusicList();
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid MP3 file.");
    }
});

// Display music files stored in localStorage
function displayMusicList() {
    const musicList = JSON.parse(localStorage.getItem('musicFiles')) || [];
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

// Play music stored in localStorage
function playMusic(index) {
    const musicList = JSON.parse(localStorage.getItem('musicFiles')) || [];
    if (index >= 0 && index < musicList.length) {
        currentMusicIndex = index;
        audioPlayer.src = musicList[currentMusicIndex].data;  // Use the base64 data URL
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
}