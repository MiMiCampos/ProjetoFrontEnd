let selectedRole = "";

const steps = {
    roles: document.getElementById('step-role-selection'),
    login: document.getElementById('step-login'),
    register: document.getElementById('step-register'),
    success: document.getElementById('step-success'),
    google: document.getElementById('step-google'),
    gov: document.getElementById('step-gov')
};

const sidebarSubtitle = document.getElementById('sidebar-subtitle');

function switchStep(targetStep) {
    Object.values(steps).forEach(step => step.classList.remove('active'));
    steps[targetStep].classList.add('active');

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

document.querySelectorAll('.btn-profile').forEach(button => {
    button.addEventListener('click', (e) => {
        selectedRole = e.target.getAttribute('data-role');
        document.getElementById('login-title').textContent = `Acesso do ${selectedRole}`;
        document.getElementById('register-role-badge').textContent = selectedRole;
        switchStep('login');
    });
});

document.getElementById('btn-back-to-roles').addEventListener('click', () => {
    selectedRole = "";
    switchStep('roles');
});

document.getElementById('go-to-register').addEventListener('click', (e) => { e.preventDefault(); switchStep('register'); });
document.getElementById('go-to-google').addEventListener('click', () => switchStep('google'));
document.getElementById('go-to-gov').addEventListener('click', () => switchStep('gov'));

document.querySelectorAll('.btn-back-to-login').forEach(btn => {
    btn.addEventListener('click', () => switchStep('login'));
});

document.getElementById('btn-finalizar-cadastro').addEventListener('click', () => {
    const agree = document.getElementById('agree-terms').checked;
    if(!agree) {
        alert("Você precisa aceitar os Termos de Uso antes de continuar.");
        return;
    }
    switchStep('success');
    setTimeout(() => {
        alert(`Conta de ${selectedRole} ativada com sucesso no banco de dados local!`);
        selectedRole = "";
        switchStep('roles');
    }, 3500);
});

document.getElementById('btn-entrar-dashboard').addEventListener('click', () => alert(`Validando credenciais de ${selectedRole} no Portal da Ufac...`));
document.getElementById('btn-google-auth').addEventListener('click', () => alert('Sucesso: Conta Google vinculada ao perfil acadêmico!'));
document.getElementById('btn-gov-auth').addEventListener('click', () => alert('Sucesso: Token de autenticação Gov.br aceito!'));

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