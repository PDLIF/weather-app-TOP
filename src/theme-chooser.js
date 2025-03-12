export const themeChooser = (() => {
    const bodyElement = document.querySelector('body');

    const themeBtn = document.querySelector('#themeBtn');
    const themeMenu = document.querySelector('#themeMenu');
    const themeMenuClose = document.querySelector('.theme-menu-close');




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

    function changeTheme(event) {
        const imgSrc = this.querySelector('img').src;
        bodyElement.style.backgroundImage = `url(${imgSrc})`;
    }

    return {
        changeTheme,
        openThemeMenu,
        closeThemeMenu
    }
})();
