/* =====================================================
   SERVICESBI - MAIN JS
   STATUS:
   [2025-12-22] Correção definitiva dos caminhos relativos do CMS
   [2025-12-22] Hero global via CMS por página (hero.yml)
   [2025-12-22] Serviços globais via CMS (services/index.yml)
   [2025-12-22] Portfólio Home via CMS
===================================================== */

/* =====================================================
   UTIL
===================================================== */

async function loadYAML(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Erro ao carregar ${path}`);
  }
  const text = await response.text();
  return jsyaml.load(text);
}

/* =====================================================
   HERO GLOBAL - CMS
===================================================== */

async function loadHero() {
  const pageTitleEl = document.getElementById("page-title");
  const pageSubtitleEl = document.getElementById("page-subtitle");
  const heroSection = document.querySelector(".hero");

  if (!heroSection || !pageTitleEl) return;

  let page = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  if (page === "" || page === "index") {
    page = "home";
  }

  const heroPath = `content/${page}/hero.yml`;

  try {
    const heroData = await loadYAML(heroPath);

    if (!heroData || heroData.ativo === false) return;

    if (heroData.titulo) {
      pageTitleEl.textContent = heroData.titulo;
    }

    if (heroData.subtitulo && pageSubtitleEl) {
      pageSubtitleEl.textContent = heroData.subtitulo;
    }

    if (heroData.imagem) {
      heroSection.style.backgroundImage = `url('${heroData.imagem}')`;
    }

  } catch (error) {
    console.warn(`Hero não carregado (${page}):`, error.message);
  }
}

/* =====================================================
   SERVIÇOS - GLOBAL (TODAS AS PÁGINAS)
===================================================== */

async function loadServices() {
  const container = document.getElementById("services-container");
  if (!container) return;

  try {
    const data = await loadYAML("content/services/index.yml");

    if (!data || data.ativo === false || !data.servicos) return;

    container.innerHTML = "";

    data.servicos.forEach(servico => {
      if (servico.ativo === false) return;

      const card = document.createElement("div");
      card.className = "service-card";

      card.innerHTML = `
        <i class="${servico.icone}"></i>
        <h3>${servico.titulo}</h3>
        <p>${servico.descricao}</p>
        <a href="${servico.link}">Ver mais</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.warn("Serviços não carregados:", error.message);
  }
}

/* =====================================================
   PORTFÓLIO - HOME
===================================================== */

async function loadHomePortfolio() {
  const container = document.getElementById("home-portfolio-container");
  if (!container) return;

  try {
    const data = await loadYAML("content/home/portfolio-home.yml");

    if (!data || data.ativo === false || !data.projetos) return;

    container.innerHTML = "";

    data.projetos.forEach(projeto => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <img src="${projeto.imagem}" alt="${projeto.titulo}">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        <a href="${projeto.link}" class="btn">Ver projeto</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.warn("Portfólio Home não carregado:", error.message);
  }
}

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadHero();
  loadServices();
  loadHomePortfolio();
});
