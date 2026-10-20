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

// 6) Carrossel de fotos: setas, pontinhos, arrastar no celular e troca automática
const trilho = document.getElementById("carrosselTrilho");

if (trilho) {
  const slides = trilho.children;
  const pontos = document.getElementById("carrosselPontos");
  let atual = 0;
  let timer;

  // cria um pontinho para cada foto
  [...slides].forEach((_, i) => {
    const ponto = document.createElement("button");
    ponto.setAttribute("aria-label", `Ir para a foto ${i + 1}`);
    ponto.addEventListener("click", () => irPara(i));
    pontos.appendChild(ponto);
  });

  function irPara(indice) {
    atual = (indice + slides.length) % slides.length; // volta ao início depois da última
    trilho.style.transform = `translateX(-${atual * 100}%)`;
    [...pontos.children].forEach((p, i) => p.setAttribute("aria-current", i === atual));
    reiniciarTimer();
  }

  function reiniciarTimer() {
    clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => irPara(atual + 1), 5000);
    }
  }

  document.getElementById("carrosselAnt").addEventListener("click", () => irPara(atual - 1));
  document.getElementById("carrosselProx").addEventListener("click", () => irPara(atual + 1));

  // arrastar com o dedo
  let inicioX = null;
  trilho.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  trilho.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const distancia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(distancia) > 50) irPara(atual + (distancia < 0 ? 1 : -1));
    inicioX = null;
  });

  irPara(0);
}
