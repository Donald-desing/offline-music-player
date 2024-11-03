document.addEventListener("DOMContentLoaded", () => {
    showTab("library");
});

function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
}

function login() {
    document.getElementById("authScreen").style.display = "none";
    document.getElementById("playerUI").style.display = "block";
}

function createPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
        playlists.push({ name: playlistName, songs: [] });
        displayPlaylists();
    }
}

function sharePlaylist() {
    alert("Playlist shared!");
}

function editProfile() {
    const newUsername = prompt("Enter new username:");
    if (newUsername) {
        alert(`Profile updated with username: ${newUsername}`);
        userSettings.textContent = `Username: ${newUsername}`;
    }
}

function logout() {
    playerUI.style.display = "none";
    authScreen.style.display = "block";
}

function togglePlayPause() {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}
