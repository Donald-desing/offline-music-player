// Access the 'Your Music' list and audio player
const yourMusicList = document.getElementById('yourMusicList');
const audioPlayer = document.getElementById('audioPlayer');

// Handle file input selection (for when files are selected through file input)
function handleFileInput(event) {
    const file = event.target.files[0]; // Get the first file selected
    if (file && file.type === 'audio/mp3') {
        const fileURL = URL.createObjectURL(file); // Generate a URL for the file
        addMusicToYourList(fileURL, file.name); // Add to 'Your Music' list
    } else {
        alert("Please upload an MP3 file.");
    }
}

// Add uploaded music to the 'Your Music' list and make it clickable
function addMusicToYourList(fileURL, fileName) {
    const listItem = document.createElement('li'); // Create a list item
    listItem.textContent = fileName; // Display the file name
    listItem.addEventListener('click', () => {
        audioPlayer.src = fileURL; // Set the audio player's source to the file URL
        audioPlayer.play(); // Play the audio
    });
    yourMusicList.appendChild(listItem); // Append the list item to the 'Your Music' list
}

// Event listeners for file input
document.getElementById('fileInput').addEventListener('change', handleFileInput);

// Function to handle tab switching
document.getElementById('yourMusicTabBtn').addEventListener('click', () => {
    document.getElementById('yourMusicTab').style.display = 'block';
    document.getElementById('uploadTab').style.display = 'none';
});

document.getElementById('uploadTabBtn').addEventListener('click', () => {
    document.getElementById('uploadTab').style.display = 'block';
    document.getElementById('yourMusicTab').style.display = 'none';
});