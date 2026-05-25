document.addEventListener('DOMContentLoaded', () => {
    
    // Interatividade na Barra de Pesquisa
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            alert(`Buscando por: "${searchInput.value}" no Portal...`);
            // Aqui você redirecionaria para uma página de busca, ex:
            // window.location.href = `/busca?q=${encodeURIComponent(searchInput.value)}`;
        }
    });

    // Interatividade nos botões rápidos (Tags azuis)
    const tagButtons = document.querySelectorAll('.tag-btn');
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert(`Redirecionando para a seção: ${button.textContent}`);
        });
    });

    // Interatividade nas Funcionalidades Principais (Cards Grandes)
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const featureName = card.querySelector('span').textContent;
            alert(`Abrindo o módulo: ${featureName}`);
        });
    });

    // Animação extra ao clicar nas notícias além do link padrão
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const title = item.querySelector('h3').textContent;
            console.log(`Abrindo notícia: ${title}`);
        });
    });
});