console.log("main.js carregado ✅");

/**
 * Extrai o nome da página atual a partir da URL do Decap CMS
 * Exemplo:
 * /admin/#/collections/pages/entries/home
 */
function getCurrentPageFromCMS() {
  const hash = window.location.hash;
  const match = hash.match(/entries\/([^/]+)/);

  return match ? match[1] : null;
}

async function loadYAMLForCMS() {
  const page = getCurrentPageFromCMS();

  if (!page) {
    console.warn("Nenhuma página CMS detectada");
    return;
  }

  const yamlPath = `/content/cms/pages/${page}/${page}.yml`;

  console.log("Página detectada:", page);
  console.log("Tentando carregar:", yamlPath);

  try {
    const response = await fetch(yamlPath);

    if (!response.ok) {
      throw new Error("Arquivo YAML não encontrado");
    }

    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    console.log("YAML carregado com sucesso 🎉");
    console.log(data);
  } catch (error) {
    console.error("Erro ao carregar YAML:", error.message);
  }
}

// Executa quando o CMS termina de carregar
window.addEventListener("load", loadYAMLForCMS);
