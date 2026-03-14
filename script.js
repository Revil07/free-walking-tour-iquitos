/* ============================
   MENU MÓVIL
   ============================ */
const navLinks = document.getElementById("navLinks");
const menuToggle = document.querySelector(".menu-toggle");

// Mostrar / ocultar menú móvil
function toggleMenu() {
  navLinks.classList.toggle("show");
}

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if(navLinks.classList.contains('show')){
      navLinks.classList.remove('show');
    }
  });
});

/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ============================
   SCROLL SUAVE
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});