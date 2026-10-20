// =========================================================
// G2F Transportes — interações do site
// =========================================================

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav__link");

// 1) Menu do celular: abre e fecha ao clicar no botão hambúrguer
menuToggle.addEventListener("click", () => {
  const aberto = nav.classList.toggle("aberto");
  menuToggle.setAttribute("aria-expanded", aberto);
  menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu quando a pessoa escolhe um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("aberto");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

// 2) Cabeçalho fica mais compacto e com sombra depois de rolar a página
function atualizarHeader() {
  header.classList.toggle("rolou", window.scrollY > 40);
}
window.addEventListener("scroll", atualizarHeader, { passive: true });
atualizarHeader();

// 3) Destaca no menu a seção que está aparecendo na tela
const secoes = document.querySelectorAll("main section[id], footer[id]");

const observadorSecoes = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const id = entrada.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("ativo", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
secoes.forEach((secao) => observadorSecoes.observe(secao));

// 4) Animação de entrada: elementos com a classe .reveal aparecem ao rolar
const elementosReveal = document.querySelectorAll(".reveal");

const observadorReveal = new IntersectionObserver(
  (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target); // anima só uma vez
      }
    });
  },
  { threshold: 0.15 }
);
elementosReveal.forEach((el) => observadorReveal.observe(el));

// 5) Ano atual no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
