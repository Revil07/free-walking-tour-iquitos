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

/* ============================
   CONTADOR DINÁMICO AL SCROLL
   ============================ */

const contador = document.getElementById("contador-viajeros");
const seccionExperiencia = document.getElementById("experiencia");

let iniciado = false;

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting && !iniciado){

      iniciado = true;

      let numero = 0;
      const objetivo = 500;

      const intervalo = setInterval(() => {

        numero += 5;
        contador.textContent = numero;

        if(numero >= objetivo){
          contador.textContent = objetivo;
          clearInterval(intervalo);
        }

      }, 30);

    }

  });

}, { threshold: 0.5 });

observer.observe(seccionExperiencia);

/* ============================
   LIGHTBOX GALERÍA
   ============================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".lightbox-close");

document.querySelectorAll(".galeria-grid img").forEach(img => {

  img.addEventListener("click", () => {

    lightbox.style.display = "flex";
    lightboxImg.src = img.src;

  });

});

closeLightbox.addEventListener("click", () => {

  lightbox.style.display = "none";

});

lightbox.addEventListener("click", () => {

  lightbox.style.display = "none";

});

/* ============================
   CAMBIO DE IDIOMA
   ============================ */

function setLanguage(lang){

const elements = document.querySelectorAll("[data-es]");

elements.forEach(el => {
  el.textContent = el.getAttribute("data-" + lang);
});

}