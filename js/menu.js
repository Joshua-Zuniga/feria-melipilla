(function(){
    const openButton = document.querySelector('.nav__toggle[aria-controls="main-menu"]');
    const menu = document.getElementById('main-menu');
    const closeButton = document.querySelector('.nav__toggle--close');
    const overlay = document.querySelector('.nav__overlay');
    const body = document.body;

    const openMenu = () => {
        menu.classList.add('nav__link--show');
        overlay.classList.add('nav__overlay--active');
        openButton.setAttribute('aria-expanded', 'true');
        body.classList.add('nav-open');
    };

    const closeMenu = () => {
        menu.classList.remove('nav__link--show');
        overlay.classList.remove('nav__overlay--active');
        openButton.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
    };

    openButton.addEventListener('click', openMenu);

    closeButton.addEventListener('click', closeMenu);

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
})();
