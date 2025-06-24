(function(){
    const openButton = document.querySelector('.nav__toggle[aria-controls="main-menu"]');
    const menu = document.getElementById('main-menu');
    const closeMenu = document.querySelector('.nav__toggle--close');
    const overlay = document.querySelector('.nav__overlay');

    openButton.addEventListener('click', () => {
        menu.classList.add('nav__link--show');
        overlay.classList.add('nav__overlay--active');
        openButton.setAttribute('aria-expanded', 'true');
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('nav__link--show');
        overlay.classList.remove('nav__overlay--active');
        openButton.setAttribute('aria-expanded', 'false');
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('nav__link--show');
        overlay.classList.remove('nav__overlay--active');
        openButton.setAttribute('aria-expanded', 'false');
    });
})();
