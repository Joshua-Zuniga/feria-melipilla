(function(){
    const openButton = document.querySelector('.nav__toggle[aria-controls="main-menu"]');
    const menu = document.getElementById('main-menu');
    const closeMenu = document.querySelector('.nav__toggle--close');

    openButton.addEventListener('click', () => {
        menu.classList.add('nav__link--show');
        openButton.setAttribute('aria-expanded', 'true');
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('nav__link--show');
        openButton.setAttribute('aria-expanded', 'false');
    });
})();
