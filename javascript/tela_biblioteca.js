document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os cards de livros dentro do painel de sugestões
    const bookItems = document.querySelectorAll('.book-item');

    // Adiciona o evento de clique em cada um deles
    bookItems.forEach(book => {
        book.style.cursor = 'pointer'; // Garante que o ponteiro do mouse mude ao passar por cima
        
        book.addEventListener('click', () => {
            // Redireciona para a sua tela de erro
            window.location.href = './tela_erro.html';
        });
    });

});