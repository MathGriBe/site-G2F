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

// 5) Clientes: monta as duas fileiras do marquee de logos
// Para trocar/adicionar um cliente, edite só esta lista. Os arquivos ficam em img/img-cliente/.
//   zoom:  aumenta a logo quando a imagem veio com muita margem branca em volta (1 = sem zoom)
//   fundo: só para logos com fundo escuro/colorido — a cor de fundo da marca, usada no hover
// Se um arquivo não carregar, aparece o nome no lugar da logo.
const logosClientes = [
  { nome: "BBM Logística", arquivo: "bbm.jpg", zoom: 1.4, fundo: "#262a3e" },
  { nome: "Blue Logística", arquivo: "blue.png", zoom: 2.5 },
  { nome: "Transportadora Brasil Central", arquivo: "brasil central.jpg", zoom: 1.9 },
  { nome: "Bros Log", arquivo: "bros log.webp", zoom: 1.9 },
  { nome: "Cargolift", arquivo: "cargo.png", zoom: 2.6, fundo: "#b00b0b" },
  { nome: "Contrail Logística", arquivo: "contrail.jpg", zoom: 2.3 },
  { nome: "CostaLog", arquivo: "costaLog.jpg", zoom: 1.35 },
  { nome: "Dalastra Logística", arquivo: "dalastra.jpg", zoom: 2.8 },
  { nome: "FVD Logística & Transporte", arquivo: "fvd.png", zoom: 1 },
  { nome: "Global Logística", arquivo: "global.jpg", zoom: 3.2 },
  { nome: "Giovanella Transportes", arquivo: "transportadora-giovanella.webp", zoom: 1.85 },
  { nome: "JSL", arquivo: "jsl.webp", zoom: 2 },
  { nome: "Logline Logística", arquivo: "logline_logstica_logo.jpg", zoom: 2.7, fundo: "#1b3157" },
  { nome: "Lotus Logística e Transporte", arquivo: "lottus.webp", zoom: 1.15 },
  { nome: "Mafro Transportes", arquivo: "mafro.jpg", zoom: 1.6, fundo: "#262626", vermelho: true },
  { nome: "Mais Brasil Expresso", arquivo: "mais brasil.webp", zoom: 1.05 },
  { nome: "Mavimar", arquivo: "mavimar_transportes.jpg", zoom: 2.5, fundo: "#1d3a6b" },
  { nome: "Nova Era Transportes Especiais", arquivo: "transportadora-nova-era.webp", zoom: 1.8 },
  { nome: "Oziris Transportes", arquivo: "oziris.jpg", zoom: 3.2 },
  { nome: "Parceiro do Grão Logística", arquivo: "logo_parceiro-do-grao.png", zoom: 1.1 },
  { nome: "Ranur Logistics", arquivo: "ranur.jpg", zoom: 1.9 },
  { nome: "RG Log", arquivo: "rg log.jpg", zoom: 2.8, fundo: "#2059b0" },
  { nome: "Grupo Sada", arquivo: "logosada50anos.png", zoom: 1 },
  { nome: "SomosLog Transportes e Logística", arquivo: "somos log.png", zoom: 1 },
  { nome: "Sudmar Transportes", arquivo: "sudamar.jpg", zoom: 1.75 },
  { nome: "Tecadi", arquivo: "tecaid.jpg", zoom: 2.5 },
  { nome: "Tecmar Transporte & Logística", arquivo: "tecmar.png", zoom: 3.4 },
  { nome: "Trans Porto", arquivo: "trans porto.png", zoom: 1.05, fundo: "#000000" },
  { nome: "Uni Trading Logistics", arquivo: "uni.png", zoom: 2.6 },
  { nome: "Versatto Logística Inteligente", arquivo: "versatto.jpg", zoom: 3.2, fundo: "#1a2129" },
  { nome: "VPL Tavares Transportes", arquivo: "vpl transportes.jpg", zoom: 2 },
];

//   vermelho: true para logo vermelha sobre fundo escuro (o cinza comum apaga a marca)
function criarLogo({ nome, arquivo, zoom = 1, fundo, vermelho }) {
  const item = document.createElement("li");
  item.className = "logo-cliente";
  item.title = nome;
  item.style.setProperty("--zoom", zoom);
  if (fundo) {
    item.classList.add("logo-cliente--escuro");
    item.style.setProperty("--fundo-marca", fundo);
  }
  if (vermelho) item.classList.add("logo-cliente--vermelho");

  const img = document.createElement("img");
  img.src = `img/img-cliente/${encodeURIComponent(arquivo)}`;
  img.alt = nome;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => {
    const texto = document.createElement("span");
    texto.className = "logo-cliente__nome";
    texto.textContent = nome;
    img.replaceWith(texto);
  });

  item.appendChild(img);
  return item;
}

function montarFileira(container, logos) {
  const trilha = document.createElement("div");
  trilha.className = "marquee__trilha";

  // Duas cópias da mesma lista: a segunda é só visual (escondida de leitores de tela)
  [false, true].forEach((copia) => {
    const lista = document.createElement("ul");
    lista.className = "marquee__lista";
    if (copia) lista.setAttribute("aria-hidden", "true");
    logos.forEach((logo) => {
      const item = criarLogo(logo);
      if (copia) item.querySelector("img").alt = "";
      lista.appendChild(item);
    });
    trilha.appendChild(lista);
  });

  // Velocidade constante (~4s por logo), não importa quantas logos a fileira tenha
  container.style.setProperty("--duracao", `${logos.length * 4}s`);
  container.appendChild(trilha);
}

const fileiras = document.querySelectorAll(".marquee[data-fileira]");
if (fileiras.length === 2) {
  // Alterna as logos entre as fileiras (31 → 16 em cima + 15 embaixo)
  montarFileira(fileiras[0], logosClientes.filter((_, i) => i % 2 === 0));
  montarFileira(fileiras[1], logosClientes.filter((_, i) => i % 2 === 1));
}

// 6) Rotas: desenha as linhas do mapa quando a seção aparece na tela
const secaoRotas = document.getElementById("rotas");
if (secaoRotas) {
  const svg = secaoRotas.querySelector(".rotas__svg");
  const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Copia o corredor principal para a camada dos tracinhos que "andam" pela rota
  const fluxo = svg.querySelector(".rota--forte").cloneNode(true);
  fluxo.setAttribute("class", "rota-fluxo");
  svg.querySelector(".rotas__cidades").before(fluxo);

  if (!semAnimacao) {
    // Corredor principal primeiro, depois as regionais
    const linhas = svg.querySelectorAll(".rota--forte path, .rota--media path");
    linhas.forEach((linha, i) => {
      const tamanho = linha.getTotalLength();
      linha.style.strokeDasharray = tamanho;
      linha.style.strokeDashoffset = tamanho;
      linha.style.transitionDelay = `${i * 0.12}s`;
      linha.parentElement.classList.add("rota--desenhar");
    });
  }

  new IntersectionObserver(
    (entradas, observador) => {
      if (!entradas[0].isIntersecting) return;
      secaoRotas.classList.add("rotas--ativa");
      svg.querySelectorAll(".rota--desenhar path").forEach((linha) => {
        linha.style.strokeDashoffset = "0";
      });
      observador.disconnect();
    },
    { threshold: 0.3 }
  ).observe(secaoRotas);
}

// 7) Ano atual no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
