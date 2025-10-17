async function loadPatials(containerId, file) {
  const host = document.getElementById(containerId);
  if (!host) return;
  try {
    const res = await fetch(file);
    const html = await res.text();
    host.innerHTML = html;
  } catch(err){
    console.log('Failed to load partials:', file, err);
  }
}


function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    console.warn('initNavbar: .navbar not found!');
    return;
  }

  let lastState = null;

  const onScroll = () => {
    const shouldShrink = window.scrollY > 80; // add buffer
    if (shouldShrink !== lastState) {
      navbar.classList.toggle('navbar--shrink', shouldShrink);
      lastState = shouldShrink;
    }
    // navbar.classList.toggle('navbar--shrink', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = navbar.querySelector('.navbar__toggle');
  const menu = navbar.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('active');
      navbar.classList.toggle('menu-active', !expanded);
    });

    menu.addEventListener('click', (e) => {
      if(e.target.tagName === 'A' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > 600 && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false')
      }
    });
  } else {
    console.warn('initNavbar: toggle or menu not found', {toggle, menu});
  }
}

document.addEventListener("DOMContentLoaded", async () => {

  await Promise.all([
    loadPatials("header", "partials/header.html"),
    loadPatials("footer", "partials/footer.html"),
  ]);

  initNavbar();
});

