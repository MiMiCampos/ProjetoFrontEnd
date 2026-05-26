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
            // Redirecionamento para a Tela de Horários
            else if (featureName === 'Horários') {
                window.location.href = './tela_horarios1.html';
            }
            // Redirecionamento para a Tela da Biblioteca
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

    // ==============================================================
    // 4. ACESSO AO PERFIL DO USUÁRIO
    // ==============================================================
    const userBadge = document.querySelector('.user-badge');
    
    if (userBadge) {
        // Adiciona a "mãozinha" no cursor via JS para mostrar que é clicável
        userBadge.style.cursor = 'pointer'; 
        
        userBadge.addEventListener('click', () => {
            window.location.href = './tela_perfil.html';
        });
    }

});