// New Variables
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const playlist = document.getElementById("playlist");

let songs = [];
let playlistSongs = [];
let currentSongIndex = 0;

// Handle file input
fileInput.addEventListener("change", (event) => {
    songs = Array.from(event.target.files);
    displaySongs(songs);
    loadSong(0);
});

// Display songs in library or playlist
function displaySongs(songsToDisplay, container = songList) {
    container.innerHTML = ""; 
    songsToDisplay.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.textContent = song.name;
        songItem.classList.add("song-item");
        songItem.addEventListener("click", () => loadSong(index));
        
        const addToPlaylistBtn = document.createElement("button");
        addToPlaylistBtn.textContent = "Add to Playlist";
        addToPlaylistBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToPlaylist(song);
        });

        songItem.appendChild(addToPlaylistBtn);
        container.appendChild(songItem);
    });
}

// Load selected song
function loadSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    audioPlayer.src = URL.createObjectURL(song);
    currentSongDisplay.textContent = `Playing: ${song.name}`;
    playSong();
}

// Add to Playlist
function addToPlaylist(song) {
    if (!playlistSongs.includes(song)) {
        playlistSongs.push(song);
        displaySongs(playlistSongs, playlist);
    }
}

// Search functionality
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(searchTerm));
    displaySongs(filteredSongs);
});

// Genre filtering
genreFilter.addEventListener("change", () => {
    const genre = genreFilter.value;
    const filteredSongs = genre === "all" ? songs : songs.filter(song => song.genre === genre);
    displaySongs(filteredSongs);
});
