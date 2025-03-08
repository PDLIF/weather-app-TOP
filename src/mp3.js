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
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const newVolume = clickX / width;

    audio.volume = newVolume;
}

// Event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

volumeContainer.addEventListener('click', setVolume);
audio.addEventListener('volumechange', updateVolume)

