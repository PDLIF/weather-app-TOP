const themeBtn = document.querySelector('#themeBtn');
const themeMenu = document.querySelector('#themeMenu');
const themeOptions = document.querySelectorAll('.theme-option');
const themeMenuClose = document.querySelector('.theme-menu-close');

const navigationToggle = document.querySelector('.mobile-nav-toggle');




function openThemeMenu() {
    themeMenu.setAttribute('aria-expanded', 'true');
    themeBtn.style.display = 'none';
    themeMenuClose.style.display = 'block';
}

function closeThemeMenu() {
    themeMenu.setAttribute('aria-expanded', 'false');
    themeBtn.style.display = 'flex';
    themeMenuClose.style.display = 'none';
}

function changeTheme(option) {
    
}


themeBtn.addEventListener('click', () => { openThemeMenu() });

navigationToggle.addEventListener('click', () => { closeThemeMenu() });

themeMenuClose.addEventListener('click', () => { closeThemeMenu() });

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        themeOptions.forEach(option => { option.classList.remove('chosen') });
        option.classList.add('chosen');
    });
})