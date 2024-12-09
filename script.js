// Get references to HTML elements
const fileInput = document.getElementById('fileInput');
const musicList = document.getElementById('musicList');
const audioPlayer = document.getElementById('audioPlayer');

// Function to handle file input and load the music into the player
fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0]; // Get the uploaded file

    if (file && file.type === "audio/mp3") {
        const fileURL = URL.createObjectURL(file);  // Create a URL for the file
        
        // Create a new list item for the uploaded song
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        // Add a click event to play the selected music
        listItem.addEventListener('click', () => {
            audioPlayer.src = fileURL;   // Set the audio source to the uploaded file
            audioPlayer.play();          // Start playing the audio
        });

        // Append the list item to the music list
        musicList.appendChild(listItem);

        // Optionally, auto-play the first uploaded file
        if (musicList.children.length === 1) {
            audioPlayer.src = fileURL;
            audioPlayer.play();
        }
    } else {
        alert('Please upload a valid MP3 file.');
    }
}

// Tab switching functionality (same as before)
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Hide all tab contents
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Activate the clicked button
    const activeButton = Array.from(tabButtons).find(button => button.textContent.toLowerCase() === tabName.replace('upload', 'upload ').toLowerCase());
    activeButton.classList.add('active');
}