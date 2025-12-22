// ==================================================
// 01 // JS principal ServicesBI
// ETAPA 1 — HERO
// ETAPA 2 — SERVIÇOS
// ETAPA 3 — PORTFÓLIO HOME
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  loadHero();
  loadServices();
  loadPortfolioHome();
});

/* =========================
   HERO
========================= */
async function loadHero() {
  try {
    const response = await fetch("content/home/hero.yml");
    if (!response.ok) return;

    const data = jsyaml.load(await response.text());
    if (!data || data.ativo !== true) return;

    if (data.titulo) document.getElementById("hero-title").textContent = data.titulo;
    if (data.subtitulo) document.getElementById("hero-subtitle").textContent = data.subtitulo;
    if (data.texto_apoio) document.getElementById("hero-support").textContent = data.texto_apoio;

  } catch (e) {
    console.warn("Erro Hero:", e);
  }
}

/* =========================
   SERVIÇOS
========================= */
async function loadServices() {
  try {
    const container = document.getElementById("services-container");
    if (!container) return;

    const response = await fetch("content/home/servicos.yml");
    if (!response.ok) return;

    const data = jsyaml.load(await response.text());
    if (!data || data.ativo !== true) return;

    const items = data.itens
      .filter(i => i.ativo)
      .sort((a, b) => a.ordem - b.ordem)
      .slice(0, 6);

    container.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        ${item.icone ? `<img src="${item.icone}" alt="${item.titulo}">` : ""}
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
      `;
      container.appendChild(card);
    });

  } catch (e) {
    console.warn("Erro Serviços:", e);
  }
}

/* =========================
   PORTFÓLIO HOME
========================= */
async function loadPortfolioHome() {
  try {
    const container = document.getElementById("portfolio-container");
    if (!container) return;

    const response = await fetch("content/home/portfolio-home.yml");
    if (!response.ok) return;

    const data = jsyaml.load(await response.text());
    if (!data || data.ativo !== true) return;

    const projetos = data.itens
      .filter(p => p.ativo)
      .sort((a, b) => a.ordem - b.ordem)
      .slice(0, 6);

    container.innerHTML = "";

    projetos.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${p.titulo}</h3>
        ${p.imagem ? `<img src="${p.imagem}" alt="${p.titulo}">` : ""}
        <a href="${p.link || "#"}" class="btn-project">Ver projeto</a>
      `;
      container.appendChild(card);
    });

  } catch (e) {
    console.warn("Erro Portfólio:", e);
  }
}


