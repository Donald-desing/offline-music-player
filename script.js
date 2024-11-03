document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.getElementById('audio');
    const track = audioContext.createMediaElementSource(audioElement);

    // Nodes for volume and panning
    const gainNode = audioContext.createGain();
    const pannerNode = new StereoPannerNode(audioContext);

    // Connect nodes
    track.connect(gainNode).connect(pannerNode).connect(audioContext.destination);

    // Elements
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeControl = document.getElementById('volume');
    const pannerControl = document.getElementById('panner');

    // Load saved settings
    const savedVolume = localStorage.getItem('volume') || 1;
    const savedPan = localStorage.getItem('pan') || 0;

    gainNode.gain.value = savedVolume;
    pannerNode.pan.value = savedPan;
    volumeControl.value = savedVolume;
    pannerControl.value = savedPan;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (audioElement.paused) {
            audioElement.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioElement.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    // Volume control
    volumeControl.addEventListener('input', () => {
        gainNode.gain.value = volumeControl.value;
        localStorage.setItem('volume', volumeControl.value); // Save volume setting
    });

    // Pan control
    pannerControl.addEventListener('input', () => {
        pannerNode.pan.value = pannerControl.value;
        localStorage.setItem('pan', pannerControl.value); // Save pan setting
    });

    // Reset play button when audio ends
    audioElement.addEventListener('ended', () => {
        playPauseBtn.textContent = 'Play';
    });
});
