console.log("main.js carregado ✅");

/**
 * Detecta a página atual
 * - CMS: via hash
 * - Front: via data-page
 */
function detectPage() {
  // CMS (Decap)
  const hash = window.location.hash;
  const match = hash.match(/entries\/([^/]+)/);
  if (match) return match[1];

  // Front
  return document.body.dataset.page || null;
}

async function loadPageContent() {
  const page = detectPage();

  if (!page) {
    console.warn("Nenhuma página detectada");
    return;
  }

  const yamlPath = `/content/cms/pages/${page}/${page}.yml`;
  console.log("Página:", page);
  console.log("YAML:", yamlPath);

  try {
    const response = await fetch(yamlPath);
    if (!response.ok) throw new Error("YAML não encontrado");

    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    console.log("Conteúdo carregado:", data);

    injectBasicContent(data);
  } catch (error) {
    console.error("Erro ao carregar YAML:", error.message);
  }
}

/**
 * Injeção básica: título, subtítulo e banner
 */
function injectBasicContent(data) {
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");
  const bannerEl = document.getElementById("page-banner");

  // Título
  if (titleEl && data.cabecalho?.titulo) {
    titleEl.textContent = data.cabecalho.titulo;
  }

  // Subtítulo
  if (subtitleEl && data.cabecalho?.subtitulo) {
    subtitleEl.textContent = data.cabecalho.subtitulo;
  }

  // Banner
  if (bannerEl && data.banner?.imagem) {
    bannerEl.src = data.banner.imagem;
  }
}

window.addEventListener("load", loadPageContent);
