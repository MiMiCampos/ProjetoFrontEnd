// Aguarda a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Funções existentes
    if (document.getElementById('lista-chamada')) { renderizarChamada(); }
    if (document.getElementById('lista-notas')) { renderizarNotas('N1'); }
    if (document.getElementById('lista-alunos-geral')) { renderizarListaAlunos(); }

    // NOVA LÓGICA: Gerenciamento de Navegação dos Menus (RU e Biblioteca)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const texto = item.textContent.toLowerCase();
            
            if (texto.includes('cardápio ru')) {
                e.preventDefault();
                window.location.href = 'tela_restaurante.html';
            } 
            else if (texto.includes('biblioteca')) {
                e.preventDefault();
                window.location.href = 'tela_biblioteca1.html';
            }
            // Se tiver um href válido no HTML, o link padrão funcionará normalmente
        });
    });
});

// ==========================================
// LÓGICA DA LISTA DE ALUNOS GERAL
// ==========================================
const nomesBase = [
    "Ana Beatriz Silva", "Bruno Henrique Costa", "Carla Miranda Souza",
    "Daniel Vieira", "Edmundo Alves", "Élida Campos", "Paula Fernandes",
    "Pedro Henrique", "Pietro Machado", "Rafaela Mendes"
];

function renderizarListaAlunos() {
    const container = document.getElementById('lista-alunos-geral');
    if (!container) return;

    let htmlCompleto = '';
    for (let i = 1; i <= 10; i++) {
        let nomeAluno = nomesBase[i - 1];
        let matriculaSimulada = 202601000 + i;

        htmlCompleto += `
        <div class="student-row">
            <div class="student-name">
                <div class="student-avatar" style="background: #e2eefe; color: #1a6ced;">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div>
                    <span>${nomeAluno}</span><br>
                    <small style="color: #888;">Matrícula: ${matriculaSimulada}</small>
                </div>
            </div>
            <i class="fa-solid fa-message" style="color: #1a6ced; cursor: pointer;" onclick="alert('Abrindo chat privado com: ${nomeAluno}')"></i>
        </div>`;
    }
    container.innerHTML = htmlCompleto;
}

// ==========================================
// LÓGICA DA TELA DE CHAMADA
// ==========================================
function renderizarChamada() {
    const container = document.getElementById('lista-chamada');
    if (!container) return; 

    let htmlCompleto = '';
    for (let i = 1; i <= 10; i++) {
        let nomeAluno = nomesBase[i - 1];
        htmlCompleto += `
        <div class="student-row">
            <div class="student-name">
                <div class="student-avatar" style="background: #e2eefe; color: #1a6ced;"><i class="fa-solid fa-user"></i></div>
                ${nomeAluno}
            </div>
            <div class="toggle-group">
                <button id="pres-${i}" class="btn-toggle active present" onclick="setAttendance(${i}, 'present')">Presente</button>
                <button id="abs-${i}" class="btn-toggle" onclick="setAttendance(${i}, 'absent')">Ausente</button>
            </div>
        </div>`;
    }
    container.innerHTML = htmlCompleto;
}

function setAttendance(studentId, status) {
    const btnPresent = document.getElementById(`pres-${studentId}`);
    const btnAbsent = document.getElementById(`abs-${studentId}`);
    
    if (status === 'present') {
        btnPresent.classList.add('active', 'present');
        btnAbsent.classList.remove('active', 'absent');
    } else {
        btnAbsent.classList.add('active', 'absent');
        btnPresent.classList.remove('active', 'present');
    }
    
    // Atualiza contadores
    const contPres = document.getElementById('contador-presentes');
    const contAus = document.getElementById('contador-ausentes');
    if (contPres) contPres.innerText = document.querySelectorAll('.btn-toggle.present.active').length;
    if (contAus) contAus.innerText = document.querySelectorAll('.btn-toggle.absent.active').length;
}

function salvarChamada() {
    alert("✅ Sucesso! A chamada foi salva.");
    window.location.href = 'prof_turmas.html';
}

// ==========================================
// LÓGICA DA TELA DE NOTAS
// ==========================================
function mudarAba(abaSelecionada) {
    document.querySelectorAll('.btn-aba-pill').forEach(btn => {
        btn.classList.remove('active-aba');
    });
    // Identifica o botão clicado e aplica a classe ativa
    event.target.classList.add('active-aba');
    renderizarNotas(abaSelecionada);
}

function renderizarNotas(aba) {
    const container = document.getElementById('lista-notas');
    if (!container) return;

    let htmlCompleto = '';
    for (let i = 1; i <= 10; i++) {
        let nomeAluno = nomesBase[i - 1];
        let notaSimulada = (Math.random() * 5 + 5).toFixed(1); 
        
        htmlCompleto += `
        <div class="student-row">
            <div class="student-name">${nomeAluno}</div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="number" id="nota-${i}" class="grade-input" value="${notaSimulada}" step="0.1" min="0" max="10" oninput="atualizarCorMedia(${i})">
                <div id="badge-${i}" class="grade-avg">Média: ${notaSimulada}</div>
            </div>
        </div>`;
    }
    container.innerHTML = htmlCompleto;
    for (let i = 1; i <= 10; i++) atualizarCorMedia(i);
}

function atualizarCorMedia(alunoId) {
    const inputNota = document.getElementById(`nota-${alunoId}`);
    const badgeMedia = document.getElementById(`badge-${alunoId}`);
    if (!inputNota || !badgeMedia) return;

    let valor = parseFloat(inputNota.value) || 0;
    badgeMedia.textContent = `Média: ${valor.toFixed(1)}`;
    badgeMedia.classList.remove('grade-avg-success', 'grade-avg-danger');
    badgeMedia.classList.add(valor >= 7.0 ? 'grade-avg-success' : 'grade-avg-danger');
}

function publicarNotas() {
    alert("✅ Sucesso! Notas publicadas.");
    window.location.href = 'prof_turmas.html';
}