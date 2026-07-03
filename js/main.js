/* main.js — decorado y estética (navbar scroll, reveal, back to top) */

document.addEventListener("DOMContentLoaded", () => {

  /* Navbar: sombra al hacer scroll */
  const navbar = document.querySelector(".navbar");
  const toggleNavbarShadow = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  toggleNavbarShadow();
  window.addEventListener("scroll", toggleNavbarShadow, { passive: true });

  /* Cerrar menú mobile al elegir una opción */
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("show") && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
      });
    });
  }

  /* Reveal de tarjetas / bloques al hacer scroll */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* Botón volver arriba */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => backToTop.classList.toggle("show", window.scrollY > 420),
      { passive: true }
    );
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});
