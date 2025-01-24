let player;
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const fullScreenBtn = document.getElementById('fullScreenBtn');
const shareBtn = document.getElementById('shareBtn');

// YouTube Video URLs
const videoUrls = [
    "https://www.youtube.com/embed/IExBivh96AE",
    "https://www.youtube.com/embed/1ii-UaisDJ8",
    "https://www.youtube.com/embed/w3A9r4v6Ui0",
    "https://www.youtube.com/embed/9VbT3EErWxU",
    "https://www.youtube.com/embed/trvhnFM1SQY"
];

// Initialize YouTube Player API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer1', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Player ready handler
function onPlayerReady(event) {
    console.log("Player is ready");

    // Play/Pause Button
    playPauseBtn.addEventListener('click', () => {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playPauseBtn.innerText = 'Play';
        } else {
            player.playVideo();
            playPauseBtn.innerText = 'Pause';
        }
    });

    // Mute/Unmute Button
    muteBtn.addEventListener('click', () => {
        if (player.isMuted()) {
            player.unMute();
            muteBtn.innerText = 'Mute';
        } else {
            player.mute();
            muteBtn.innerText = 'Unmute';
        }
    });

    // Full Screen Button
    fullScreenBtn.addEventListener('click', () => {
        const iframe = document.getElementById('videoPlayer1');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        }
    });

    // Share Button
    shareBtn.addEventListener('click', () => {
        const videoUrl = player.getVideoUrl();
        alert(`Share this video: ${videoUrl}`);
    });

    // Thumbnails click event
    document.querySelectorAll('.video-thumbnail').forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            player.loadVideoById(videoUrls[index].split('/').pop());
            playPauseBtn.innerText = 'Pause';
        });
    });
}

// Player state change handler
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playPauseBtn.innerText = 'Play';
    }
          }
