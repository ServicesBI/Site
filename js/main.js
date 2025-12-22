// ==================================================
// JS principal ServicesBI
//
// ETAPA 1 — HERO
// ETAPA 2 — SERVIÇOS
// ETAPA 3 — PORTFÓLIO HOME
// ETAPA 4 — PYTHON
// ETAPA 5 — POWER BI
// ETAPA 6 — AUTOMAÇÕES
// ETAPA 7 — EXCEL
//
// STATUS:
// [2025-12-21] Integração CMS Home.
// [2025-12-22] Padrão definitivo CMS (projetos).
// [2025-12-22] Integração completa páginas internas.
// [2025-12-22] Correção Portfólio Home (função loadPortfolioHome).
// [2025-12-22] Hotfix: desativação temporária de loadHero e loadServices.
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  // ⚠️ Temporariamente desativado (funções ainda não implementadas)
  // loadHero();
  // loadServices();

  loadPortfolioHome();
  loadSection("python", "python-container");
  loadSection("powerbi", "powerbi-container");
  loadSection("automacoes", "automacoes-container");
  loadSection("excel", "excel-container");
});

/* =========================
   PORTFÓLIO HOME
========================= */
async function loadPortfolioHome() {
  try {
    const container = document.getElementById("home-portfolio-container");
    if (!container) return;

    const response = await fetch("content/home/index.yml");
    if (!response.ok) return;

    const data = jsyaml.load(await response.text());
    if (!data || data.ativo !== true || !Array.isArray(data.projetos)) return;

    container.innerHTML = "";

    data.projetos.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${p.titulo || ""}</h3>
        ${p.imagem ? `<img src="${p.imagem}" alt="${p.titulo}">` : ""}
        <p>${p.descricao || ""}</p>
        <a href="${p.link || "#"}" class="btn-project">Ver projeto</a>
      `;
      container.appendChild(card);
    });

  } catch (e) {
    console.warn("Erro Portfólio Home:", e);
  }
}

/* =========================
   FUNÇÃO GENÉRICA
========================= */
async function loadSection(section, containerId) {
  try {
    const container = document.getElementById(containerId);
    if (!container) return;

    const response = await fetch(`content/${section}/index.yml`);
    if (!response.ok) return;

    const data = jsyaml.load(await response.text());
    if (!data || data.ativo !== true || !Array.isArray(data.projetos)) return;

    container.innerHTML = "";

    data.projetos.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${p.titulo || ""}</h3>
        ${p.imagem ? `<img src="${p.imagem}" alt="${p.titulo}">` : ""}
        <p>${p.descricao || ""}</p>
        <a href="${p.link || "#"}" class="btn-project">Ver projeto</a>
      `;
      container.appendChild(card);
    });

  } catch (e) {
    console.warn(`Erro seção ${section}:`, e);
  }
}
