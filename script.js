// Get references to HTML elements
const fileInput = document.getElementById('fileInput');
const musicList = document.getElementById('musicList');
const audioPlayer = document.getElementById('audioPlayer');

// Function to handle file input and load the music into the player
fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === "audio/mp3") {
        const fileURL = URL.createObjectURL(file);
        
        // Create a new list item for the uploaded song
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        
        // Add a click event to play the selected music
        listItem.addEventListener('click', () => {
            audioPlayer.src = fileURL;
            audioPlayer.play();
        });

        // Append the list item to the music list
        musicList.appendChild(listItem);
    } else {
        alert('Please upload a valid MP3 file.');
    }
}

// Play music when a list item is clicked