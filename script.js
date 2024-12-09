// Access the 'Your Music' list (where uploaded music will appear)
const yourMusicList = document.getElementById('yourMusicList');
const audioPlayer = document.getElementById('audioPlayer');

// Handle file input (for when files are selected through file input)
function handleFileInput(event) {
    const file = event.target.files[0]; // Get the first file selected
    if (file && file.type === 'audio/mp3') {
        const fileURL = URL.createObjectURL(file); // Generate a URL for the file
        addMusicToYourList(fileURL, file.name); // Add to 'Your Music' list
    }
}

// Handle drag-and-drop (for when files are dragged and dropped)
function handleDrop(event) {
    event.preventDefault(); // Prevent default behavior (such as opening the file)
    const file = event.dataTransfer.files[0]; // Get the first file dropped
    if (file && file.type === 'audio/mp3') {
        const fileURL = URL.createObjectURL(file); // Generate a URL for the file
        addMusicToYourList(fileURL, file.name); // Add to 'Your Music' list
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

// Event listeners for file input and drop event
document.getElementById('fileInput').addEventListener('change', handleFileInput);

// Drop zone functionality
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', (event) => event.preventDefault()); // Prevent default behavior (needed for drop)
dropZone.addEventListener('drop', handleDrop);

// Function to handle tab switching
document.getElementById('yourMusicTabBtn').addEventListener('click', () => {
    document.getElementById('yourMusicTab').style.display = 'block';
    document.getElementById('uploadTab').style.display = 'none';
});

document.getElementById('uploadTabBtn').addEventListener('click', () => {
    document.getElementById('uploadTab').style.display = 'block';
    document.getElementById('yourMusicTab').style.display = 'none';
});