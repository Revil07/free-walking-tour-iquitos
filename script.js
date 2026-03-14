/* ============================
   MENU MÓVIL
   ============================ */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show"); // muestra/oculta menú móvil
}

// Cerrar menú móvil al hacer clic en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navLinks');
    if(nav.classList.contains('show')){
      nav.classList.remove('show'); // cierra el menú automáticamente
    }
  });
});


/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  if(window.scrollY > 50){
    header.style.background = "rgba(255,255,255,0.95)";
    header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    
    // Efecto en links
    navLinks.forEach(link => {
      link.style.color = "#2ecc71";       // cambia el color al verde
      link.style.fontSize = "19px";       // aumenta un poquito el tamaño
    });
  } else {
    header.style.background = "white";
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    
    // Revertir efecto en links
    navLinks.forEach(link => {
      link.style.color = "#333";          // vuelve al color original
      link.style.fontSize = "18px";       // tamaño original
    });
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