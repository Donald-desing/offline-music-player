document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");
  const shuffleButton = document.getElementById("shuffle");
  const repeatButton = document.getElementById("repeat");
  const musicListContainer = document.getElementById("music-list-items");
  const fileInput = document.getElementById("file-input");
  const fileNameDisplay = document.getElementById("file-name");

  let shuffleMode = false;
  let repeatMode = false;
  let musicFiles = [];

  // Shuffle and Repeat toggles
  shuffleButton.addEventListener("click", function () {
    shuffleMode = !shuffleMode;
    shuffleButton.textContent = shuffleMode ? "Shuffle: On" : "Shuffle: Off";
  });

  repeatButton.addEventListener("click", function () {
    repeatMode = !repeatMode;
    repeatButton.textContent = repeatMode ? "Repeat: On" : "Repeat: Off";
    audioPlayer.loop = repeatMode;
  });

  // Handle music file upload and add to list
  fileInput.addEventListener("change", handleFileUpload);
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", handleDragAndDrop);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio")) {
      addMusicToList(file);
    }
  }

  function handleDragAndDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("audio")) {
      addMusicToList(file);
    }
  }

  function addMusicToList(file) {
    const listItem = document.createElement("li");
    const musicName = file.name;
    const musicItem = document.createElement("div");
    musicItem.classList.add("music-info");

    musicItem.innerHTML = `
      <span class="music-name">${musicName}</span>
      <button class="remove-btn">Remove</button>
    `;

    listItem.appendChild(musicItem);
    musicListContainer.appendChild(listItem);

    listItem.querySelector(".remove-btn").addEventListener("click", function () {
      musicListContainer.removeChild(listItem);
      musicFiles = musicFiles.filter((f) => f.name !== musicName);
    });

    musicFiles.push(file);
    fileNameDisplay.textContent = `File Uploaded: ${musicName}`;
  }
});