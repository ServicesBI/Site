// ===============================
// ServicesBI - CMS Loader
// main.js (COMPLETO)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadServices();
});

// ===============================
// UTIL: carregar YAML
// ===============================
async function loadYAML(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Erro ao carregar ${path}`);
  const text = await response.text();
  return jsyaml.load(text);
}

// ===============================
// SERVIÇOS (GLOBAL)
// ===============================
async function loadServices() {
  const container = document.getElementById("services-container");
  if (!container) return; // página não usa serviços

  try {
    const data = await loadYAML("/content/services/index.yml");

    if (!data || data.ativo !== true || !Array.isArray(data.servicos)) {
      return;
    }

    const servicesAtivos = data.servicos.filter(s => s.ativo === true);
    if (servicesAtivos.length === 0) return;

    container.innerHTML = "";

    servicesAtivos.forEach(servico => {
      const card = document.createElement("div");
      card.className = "service-card";

      card.innerHTML = `
        <div class="service-icon">
          <i class="${servico.icone}"></i>
        </div>
        <h3>${servico.titulo}</h3>
        <p>${servico.descricao}</p>
        ${servico.link ? `<a href="${servico.link}" class="btn-service">Ver mais</a>` : ""}
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar Serviços:", error);
  }
}
