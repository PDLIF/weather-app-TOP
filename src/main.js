import './style.css'
import { weatherData } from "./weatherData";
import { navigation } from "./navigation";
import { mp3Player } from "./mp3";
import { themeChooser } from "./theme-chooser";

const addEventListeners = (() => {

    // Weather panel's event listeners

    const searchField = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    searchField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { weatherData.searchWeather() }
    });

    searchBtn.addEventListener('click', () => { weatherData.searchWeather() });






    // MP3 player's event listeners

    const playerContainer = document.querySelector('.mp3-player');
    const volumeContainer = document.querySelector('.volume-container');
    const audio = document.querySelector('#audio');
    const playBtn = document.querySelector('#play');

    volumeContainer.addEventListener('mousedown', mp3Player.startDragging);
    document.addEventListener('mouseup', mp3Player.stopDragging);
    document.addEventListener('mousemove', mp3Player.dragging);

    audio.addEventListener('volumechange', () => {
        volumeBar.style.width = `${audio.volume * 100}%`;
        mp3Player.updateVolume();
    });

    playBtn.addEventListener('click', () => {
        const isPlaying = playerContainer.classList.contains('play');
        isPlaying ? mp3Player.pauseSong() : mp3Player.playSong();
    });




    // Theme chosser event listeners
    
    const themeOptions = document.querySelectorAll('.theme-option');
    const navigationToggle = document.querySelector('.mobile-nav-toggle');
    const themeMenuClose = document.querySelector('.theme-menu-close');

    themeOptions.forEach((option, index) => {
        option.addEventListener('click', themeChooser.changeTheme);
    })

    themeBtn.addEventListener('click', () => { themeChooser.openThemeMenu() });

    navigationToggle.addEventListener('click', () => { themeChooser.closeThemeMenu() });

    themeMenuClose.addEventListener('click', () => { themeChooser.closeThemeMenu() });

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(option => { option.classList.remove('chosen') });
            option.classList.add('chosen');
        });
    });
})();