// Função genérica para carregar qualquer componente em um container
function carregarComponente(url, containerId) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Erro ao carregar: ${url}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => console.error(error));
}

// Executa o carregamento assim que a página estiver pronta
document.addEventListener("DOMContentLoaded", () => {
  carregarComponente("../componentes/header.html", "header-container");
  // carregarComponente("../componentes/footer.html", "footer-container"); // Exemplo se tiver rodapé
});
