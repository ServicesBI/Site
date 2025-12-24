/* ============================================================
   CMS SIMPLES - ServicesBI
   Responsável por:
   - Carregar header e footer
   - Identificar a página atual
   - Ler Markdown em /content/pages
   - Renderizar hero e conteúdo
   ============================================================ */

/* ---------- UTIL ---------- */

async function fetchText(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Erro ao carregar: ${path}`);
  return await response.text();
}

/* ---------- HEADER / FOOTER ---------- */

async function loadLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.innerHTML = await fetchText("../admin/header.html");
  }

  if (footer) {
    footer.innerHTML = await fetchText("../admin/footer.html");
  }
}

/* ---------- ROTEAMENTO ---------- */

function getPageName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "home";
}

/* ---------- MARKDOWN ---------- */

function parseFrontmatter(md) {
  const match = md.match(/^---([\s\S]*?)---/);
  if (!match) return { meta: {}, body: md };

  const meta = jsyaml.load(match[1]);
  const body = md.replace(match[0], "").trim();

  return { meta, body };
}

/* ---------- HERO ---------- */

function renderHero(meta) {
  const hero = document.getElementById("hero");
  if (!hero || meta.hero === false) return;

  hero.innerHTML = `
    <div class="container hero-container">
      <h1>${meta.title || ""}</h1>
      <p>${meta.subtitle || ""}</p>
    </div>
  `;
}

/* ---------- CONTEÚDO ---------- */

function renderContent(markdown) {
  const content = document.getElementById("page-content");
  if (!content) return;

  content.innerHTML = marked.parse(markdown);
}

/* ---------- INIT ---------- */

async function loadPage() {
  try {
    const page = getPageName();
    const mdPath = `../content/pages/${page}.md`;

    const rawMD = await fetchText(mdPath);
    const { meta, body } = parseFrontmatter(rawMD);

    renderHero(meta);
    renderContent(body);

  } catch (error) {
    console.error(error);
    document.getElementById("page-content").innerHTML =
      "<p>Erro ao carregar a página.</p>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadLayout();
  await loadPage();
});
