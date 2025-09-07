const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar--shrink');
  } else {
    navbar.classList.remove('navbar--shrink');
  }
});


function loadPatials(containerId, file){
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(err => console.error("Loading partials error:", file, err));
}

document.addEventListener("DOMContentLoaded",() => {
  loadPatials("header", "partials/header.html");
  loadPatials("footer", "partials/footer.html");
})