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

function togglePlayPause() {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById("playPauseBtn").textContent = "Pause";
    } else {
        audioPlayer.pause();
        document.getElementById("playPauseBtn").textContent = "Play";
    }
}
