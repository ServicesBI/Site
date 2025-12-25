console.log("main.js carregado ✅");

/**
 * Detecta página:
 * - CMS: via URL
 * - Front: via data-page
 */
function detectPage() {
  // CMS
  const hash = window.location.hash;
  const match = hash.match(/entries\/([^/]+)/);
  if (match) return match[1];

  // Front
  const body = document.body;
  return body.dataset.page || null;
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
    console.error(error.message);
  }
}

/**
 * Injeção básica: título, subtítulo, banner
 */
function injectBasicContent(data) {
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");
  const bannerEl = document.getElementById("page-banner");

  if (titleEl && data.title) {
    titleEl.textContent = data.title;
  }

  if (subtitleEl && data.subtitle) {
    subtitleEl.textContent = data.subtitle;
  }

  if (bannerEl && data.banner) {
    bannerEl.src = data.banner;
  }
}

window.addEventListener("load", loadPageContent);
