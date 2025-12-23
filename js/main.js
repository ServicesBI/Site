/* =====================================================
   ARQUIVO: js/main.js
   PROJETO: ServicesBI

   STATUS:
   [2025-12-21] Integração inicial com Decap CMS.
   [2025-12-22] Correção do padrão CMS (projetos -> projetos).
   [2025-12-22] HERO GLOBAL via CMS (hero.yml por página).
   [2025-12-22] Serviços GLOBAIS via CMS (services/index.yml).
   [2025-12-22] Padronização para todas as páginas com services-container.
   [2025-12-23] Alinhamento de IDs com HTML da Home (servicos-container e projetos-container).
===================================================== */

/* =====================================================
   UTIL — CARREGAMENTO YAML
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
   HERO GLOBAL — CMS
   Carrega: content/{pagina}/hero.yml
===================================================== */
async function loadHero() {
  const heroSection = document.querySelector(".hero");
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");

  if (!heroSection || !titleEl) return;

  let page = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  if (page === "" || page === "index") {
    page = "home";
  }

  const heroPath = `content/${page}/hero.yml`;

  try {
    const data = await loadYAML(heroPath);

    if (!data || data.ativo === false) return;

    if (data.titulo) {
      titleEl.textContent = data.titulo;
    }

    if (data.subtitulo && subtitleEl) {
      subtitleEl.textContent = data.subtitulo;
    }

    if (data.imagem) {
      heroSection.style.backgroundImage = `url('${data.imagem}')`;
    }

  } catch (error) {
    console.warn(`Hero não carregado (${page}):`, error.message);
  }
}

/* =====================================================
   SERVIÇOS GLOBAIS — CMS
   Carrega: content/services/index.yml
   Renderiza onde existir #servicos-container
===================================================== */
async function loadServices() {
  const container = document.getElementById("servicos-container");
  if (!container) return;

  try {
    const data = await loadYAML("content/services/index.yml");

    if (!data || data.ativo === false || !Array.isArray(data.servicos)) return;

    container.innerHTML = "";

    data.servicos.forEach(servico => {
      if (servico.ativo === false) return;

      const card = document.createElement("article");
      card.className = "service-card";

      card.innerHTML = `
        <i class="${servico.icone}"></i>
        <h3>${servico.titulo}</h3>
        <p>${servico.descricao}</p>
        ${servico.link ? `<a href="${servico.link}" class="btn-service">Ver mais</a>` : ""}
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.warn("Serviços não carregados:", error.message);
  }
}

/* =====================================================
   PORTFÓLIO — HOME
   Carrega: content/home/portfolio-home.yml
===================================================== */
async function loadHomePortfolio() {
  const container = document.getElementById("projetos-container");
  if (!container) return;

  try {
    const data = await loadYAML("content/home/portfolio-home.yml");

    if (!data || data.ativo === false || !Array.isArray(data.projetos)) return;

    container.innerHTML = "";

    data.projetos.forEach(projeto => {
      const card = document.createElement("article");
      card.className = "project-card";

      card.innerHTML = `
        <img src="${projeto.imagem}" alt="${projeto.titulo}">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        <a href="${projeto.link}" class="btn-project">Ver projeto</a>
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
