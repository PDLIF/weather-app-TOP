const primaryNav = document.querySelector('#side-menu');
const navToggle = document.querySelector('.mobile-nav-toggle');

const body = document.querySelector('body');

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');

    if (visibility === 'false') {
        primaryNav.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', 'true');

        body.style.overflow = 'hidden';
    } else if (visibility === 'true') {
        primaryNav.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');

        body.style.overflow = 'scroll';
    }
});