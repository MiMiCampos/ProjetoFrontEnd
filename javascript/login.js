// Armazenará o papel temporário escolhido pelo usuário ("Aluno", "Professor", etc.)
let selectedRole = "";

// Mapeamento completo dos Passos do Painel Direito
const steps = {
    roles: document.getElementById('step-role-selection'),
    login: document.getElementById('step-login'),
    register: document.getElementById('step-register'),
    success: document.getElementById('step-success'),
    google: document.getElementById('step-google'),
    gov: document.getElementById('step-gov')
};

// Subtítulo descritivo do Painel Esquerdo (Azul)
const sidebarSubtitle = document.getElementById('sidebar-subtitle');

function switchStep(targetStep) {
    // Esconde todas as telas ativas
    Object.values(steps).forEach(step => step.classList.remove('active'));
    
    // Ativa a tela solicitada
    steps[targetStep].classList.add('active');

    // Manipulação visual inteligente da sidebar baseado no contexto da tela ativa
    const sidebar = document.querySelector('.sidebar-panel');
    const brandTitle = document.querySelector('.sidebar-panel .brand-title');
    
    if (targetStep === 'google') {
        sidebar.style.backgroundColor = '#f8f9fa';
        sidebar.style.color = '#333';
        brandTitle.style.color = '#0b51b7';
        sidebarSubtitle.textContent = "Autenticação externa simplificada via Google.";
    } else if (targetStep === 'gov') {
        sidebar.style.backgroundColor = '#13315c';
        sidebar.style.color = '#fff';
        brandTitle.style.color = '#fff';
        sidebarSubtitle.textContent = "Provedor de identidade unificada do Governo Federal.";
    } else {
        // Padrão de Cores Oficial UFAC
        sidebar.style.backgroundColor = '#1a6ced';
        sidebar.style.color = '#fff';
        brandTitle.style.color = '#fff';
        
        if (targetStep === 'roles') {
            sidebarSubtitle.textContent = "Seja bem-vindo(a) ao aplicativo oficial da UFAC!";
        } else if (targetStep === 'login') {
            sidebarSubtitle.textContent = `Painel de acesso exclusivo para: ${selectedRole}.`;
        } else if (targetStep === 'register') {
            sidebarSubtitle.textContent = `Criando credencial única de acesso para ${selectedRole}.`;
        } else if (targetStep === 'success') {
            sidebarSubtitle.textContent = "Autenticação concluída!";
        }
    }
}

// Interceptando a escolha de perfil inicial (Ação dos 4 botões)
document.querySelectorAll('.btn-profile').forEach(button => {
    button.addEventListener('click', (e) => {
        selectedRole = e.target.getAttribute('data-role');
        
        // Customiza os textos da tela de login/cadastro com base no papel escolhido
        document.getElementById('login-title').textContent = `Acesso do ${selectedRole}`;
        document.getElementById('register-role-badge').textContent = selectedRole;
        
        switchStep('login');
    });
});

// Voltar da tela de Login para a Seleção de Perfis inicial
document.getElementById('btn-back-to-roles').addEventListener('click', () => {
    selectedRole = "";
    switchStep('roles');
});

// Navegações secundárias de Ida
document.getElementById('go-to-register').addEventListener('click', (e) => { e.preventDefault(); switchStep('register'); });
document.getElementById('go-to-google').addEventListener('click', () => switchStep('google'));
document.getElementById('go-to-gov').addEventListener('click', () => switchStep('gov'));

// Botões "Voltar" padrões retornando sempre ao Login do perfil
document.querySelectorAll('.btn-back-to-login').forEach(btn => {
    btn.addEventListener('click', () => switchStep('login'));
});

// Finalização do Cadastro simulada
document.getElementById('btn-finalizar-cadastro').addEventListener('click', () => {
    const agree = document.getElementById('agree-terms').checked;
    if(!agree) {
        alert("Você precisa aceitar os Termos de Uso antes de continuar.");
        return;
    }
    switchStep('success');
    
    // Simula processamento e retorna à tela inicial de perfis após 3.5 segundos
    setTimeout(() => {
        alert(`Conta de ${selectedRole} ativada com sucesso no banco de dados local!`);
        selectedRole = "";
        switchStep('roles');
    }, 3500);
});

// === A MÁGICA ACONTECE AQUI ===
// Redirecionamento real ao clicar em "Entrar"
document.getElementById('btn-entrar-dashboard').addEventListener('click', () => {
    if (selectedRole === "Professor") {
        // Redireciona para o painel do professor que criamos
        window.location.href = 'prof_tela_inicial.html';
    } else {
        // Alerta provisório para os outros perfis (Aluno, Técnico, Administrador) que ainda não têm tela
        alert(`O painel para o perfil "${selectedRole}" ainda está em desenvolvimento!`);
    }
});

// Feedbacks para os botões de ação final (Google/Gov)
document.getElementById('btn-google-auth').addEventListener('click', () => alert('Sucesso: Conta Google vinculada ao perfil acadêmico!'));
document.getElementById('btn-gov-auth').addEventListener('click', () => alert('Sucesso: Token de autenticação Gov.br aceito!'));

// Alternador dinâmico de visibilidade de senha (o clássico "olhinho")
function togglePass(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        iconElement.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = "password";
        iconElement.classList.replace('fa-eye', 'fa-eye-slash');
    }
}