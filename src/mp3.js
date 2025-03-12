const playerContainer = document.querySelector('.mp3-player');
const playBtn = document.querySelector('#play');
const audio = document.querySelector('#audio');
const volumeBar = document.querySelector('#volume');
const volumeContainer = document.querySelector('.volume-container');
// const title = document.querySelector('#title');

audio.loop = true;
audio.volume = 0.3;
volumeBar.style.width = `${volume * 100}%`;

const songs = ['Aphex Twin - 3'];

let songIndex = 0;

let isDragging = false;

loadSong(songs[songIndex]);

function loadSong(song) {
    audio.src = `./assets/mp3/${song}.mp3`;
}

function playSong() {
    playerContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    playerContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function updateVolume(e) {
    const volume = e.srcElement.volume
    const volumePercent = volume * 100;
    volumeBar.style.width = `${volumePercent}%`
}

function setVolume(e) {
    const width = volumeContainer.clientWidth;
    let clickX = e.offsetX;

    if (e.type === "mousemove") {
        clickX = e.clientX - volumeContainer.getBoundingClientRect().left;
    }
    
    let newVolume = clickX / width;
    newVolume = Math.max(0, Math.min(1, newVolume));

    audio.volume = newVolume;
}

function startDragging(e) {
    isDragging = true;
    setVolume(e);
}

function stopDragging() {
    isDragging = false;
}

function dragging(e) {
    if (!isDragging) return;
    setVolume(e);
}

// Event Listeners

volumeContainer.addEventListener('mousedown', startDragging);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('mousemove', dragging);

audio.addEventListener('volumechange', () => {
    volumeBar.style.width = `${audio.volume * 100}%`;
});







// Event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

// volumeContainer.addEventListener('click', setVolume);
audio.addEventListener('volumechange', updateVolume)

