// Armazena o papel temporário escolhido pelo usuário ("Aluno", "Professor", etc.)
let selectedRole = "";

// Mapeamento dos Passos do Painel Direito
const steps = {
    roles: document.getElementById('step-role-selection'),
    login: document.getElementById('step-login'),
    register: document.getElementById('step-register'),
    success: document.getElementById('step-success')
};

// Subtítulo descritivo do Painel Esquerdo (Azul)
const sidebarSubtitle = document.getElementById('sidebar-subtitle');

function switchStep(targetStep) {
    // Esconde todas as telas ativas
    Object.values(steps).forEach(step => {
        if(step) step.classList.remove('active');
    });
    
    // Ativa a tela solicitada
    if(steps[targetStep]) {
        steps[targetStep].classList.add('active');
    }

    // Manipulação dinâmica do texto da sidebar baseado na tela ativa
    if (sidebarSubtitle) {
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

// 1. Interceptando a escolha de perfil (Ação dos 4 botões iniciais)
document.querySelectorAll('.btn-profile').forEach(button => {
    button.addEventListener('click', (e) => {
        selectedRole = e.target.getAttribute('data-role');
        
        // Customiza os textos da tela com base no papel escolhido
        document.getElementById('login-title').textContent = `Acesso do ${selectedRole}`;
        const badge = document.getElementById('register-role-badge');
        if(badge) badge.textContent = selectedRole;
        
        switchStep('login');
    });
});

// 2. Voltar da tela de Login para a Seleção de Perfis inicial
const btnBackToRoles = document.getElementById('btn-back-to-roles');
if(btnBackToRoles) {
    btnBackToRoles.addEventListener('click', () => {
        selectedRole = "";
        switchStep('roles');
    });
}

// 3. Navegações de Ida e Volta entre Login e Cadastro
const btnGoToRegister = document.getElementById('go-to-register');
if(btnGoToRegister) {
    btnGoToRegister.addEventListener('click', (e) => { 
        e.preventDefault(); 
        switchStep('register'); 
    });
}

document.querySelectorAll('.btn-back-to-login').forEach(btn => {
    btn.addEventListener('click', () => switchStep('login'));
});

// 4. Finalização do Cadastro simulada
const btnFinalCadastro = document.getElementById('btn-finalizar-cadastro');
if(btnFinalCadastro) {
    btnFinalCadastro.addEventListener('click', () => {
        const agree = document.getElementById('agree-terms');
        if(agree && !agree.checked) {
            alert("Você precisa aceitar os Termos de Uso antes de continuar.");
            return;
        }
        
        switchStep('success');
        
        // Simula processamento e retorna à tela inicial de perfis
        setTimeout(() => {
            alert(`Conta de ${selectedRole} ativada com sucesso! Você já pode fazer login.`);
            selectedRole = "";
            switchStep('roles');
        }, 3000);
    });
}

// 5. REDIRECIONAMENTO DE LOGIN REAL 
const btnEntrar = document.getElementById('btn-entrar-dashboard');
if(btnEntrar) {
    btnEntrar.addEventListener('click', () => {
        if (selectedRole === "Professor") {
            window.location.href = 'prof_tela_inicial.html'; // Rota Professor
        } else if (selectedRole === "Aluno") {
            window.location.href = 'tela_inicial.html';      // Rota Aluno
        } else {
            // Técnico e Administrador
            window.location.href = 'tela_erro.html';
        }
    });
}

// 6. Alternador dinâmico de visibilidade de senha (Olhinho)
// Exportado como função global para funcionar via 'onclick' no HTML que você enviou
window.togglePass = function(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === "password") {
            input.type = "text";
            iconElement.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            input.type = "password";
            iconElement.classList.replace('fa-eye', 'fa-eye-slash');
        }
    }
};

// Adiciona o evento de clique no olhinho da tela de login (que não tinha 'onclick' no seu HTML)
const loginEye = document.querySelector('#step-login .toggle-password');
if(loginEye) {
    // Como no seu HTML o ícone está depois do input, localizamos o input pelo ID fixo 'login-senha'
    loginEye.addEventListener('click', function() {
        togglePass('login-senha', this);
    });
}