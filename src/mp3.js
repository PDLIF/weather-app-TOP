
import mySong from './assets/mp3/aaa.mp3';

export const mp3Player = (() => {
    const playerContainer = document.querySelector('.mp3-player');
    const playBtn = document.querySelector('#play');
    const audio = document.querySelector('#audio');
    const volumeBar = document.querySelector('#volume');
    const volumeContainer = document.querySelector('.volume-container');

    const song = mySong;

    audio.loop = true;
    audio.volume = 0.3;
    volumeBar.style.width = `${volume * 100}%`;

    const songs = ['Aphex Twin - 3'];

    let songIndex = 0;

    let isDragging = false;

    loadSong(songs[songIndex]);

    function loadSong(song) {
        audio.src = mySong;
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

    return {
        startDragging,
        stopDragging,
        dragging,
        updateVolume,
        pauseSong,
        playSong,
        loadSong
    }
})();
