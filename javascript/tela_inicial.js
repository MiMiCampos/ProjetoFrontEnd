document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================================
    // 1. GERENCIAMENTO DOS BOTÕES AZUIS (PÍLULAS DE ATALHO)
    // ==============================================================
    const tagButtons = document.querySelectorAll('.tag-btn');
    
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            
            // Redirecionamentos para a Tela de Documentos
            if (buttonText === 'Atestado de matrícula' || 
                buttonText === 'Histórico escolar' || 
                buttonText === 'Histórico de integralização') {
                window.location.href = './tela_documentos.html';
            } 
            // Redirecionamentos para a Tela do Restaurante
            else if (buttonText === 'Visualizar o cardápio' || 
                     buttonText === 'Recarregar e-ticket') {
                window.location.href = './tela_restaurante.html';
            }
        });
    });


    // ==============================================================
    // 2. GERENCIAMENTO DOS CARDS GRANDES (FUNCIONALIDADES)
    // ==============================================================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const featureName = card.querySelector('span').textContent.trim();
            
            // Redirecionamento para a nova Tela de Erro (tela_erro.html)
            if (featureName === 'Matrícula') {
                window.location.href = './tela_erro.html';
            } 
            // Redirecionamento para a Tela do Restaurante
            else if (featureName === 'Restaurante Universitário') {
                window.location.href = './tela_restaurante.html';
            } 
            // Redirecionamento para a Tela de Documentos
            else if (featureName === 'Documentos') {
                window.location.href = './tela_documentos.html';
            }
            // Dentro da função dos featureCards no seu tela_inicial.js
            else if (featureName === 'Horários') {
                window.location.href = './tela_horarios1.html';
            }
            // Adicione essa verificação dentro do bloco de cliques do featureCards no seu tela_inicial.js
            else if (featureName === 'Biblioteca') {
                window.location.href = './tela_biblioteca1.html';
            }
            // Outros cards que ainda não possuem telas próprias
            else {
                alert(`Abrindo o módulo: ${featureName}`);
            }
        });
    });


    // ==============================================================
    // 3. BARRA DE PESQUISA (INTERATIVIDADE ADICIONAL)
    // ==============================================================
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                alert(`Buscando por: "${searchInput.value}" no Portal...`);
            }
        });
    }

});