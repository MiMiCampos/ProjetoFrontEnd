// Aguarda a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Se a página tiver a lista de chamada, constrói a chamada
    if (document.getElementById('lista-chamada')) {
        renderizarChamada();
    }
    // Se a página tiver a lista de notas, constrói as notas
    if (document.getElementById('lista-notas')) {
        renderizarNotas('N1');
    }
    // Se a página tiver a lista geral de alunos, constrói a listagem
    if (document.getElementById('lista-alunos-geral')) {
        renderizarListaAlunos();
    }
});

// Lista de nomes base para alimentar o protótipo
const nomesBase = [
    "Ana Beatriz Silva", "Bruno Henrique Costa", "Carla Miranda Souza",
    "Daniel Vieira", "Edmundo Alves", "Élida Campos", "Paula Fernandes",
    "Pedro Henrique", "Pietro Machado", "Rafaela Mendes"
];

// ==========================================
// LÓGICA DA LISTA DE ALUNOS GERAL
// ==========================================
function renderizarListaAlunos() {
    const container = document.getElementById('lista-alunos-geral');
    if (!container) return;

    let htmlCompleto = '';

    for (let i = 1; i <= 42; i++) {
        let nomeAluno = nomesBase[i - 1] || `Aluno(a) Matriculado ${i}`;
        // Gera um número de matrícula sequencial fictício
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
        </div>
        `;
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
    for (let i = 1; i <= 42; i++) {
        let nomeAluno = nomesBase[i - 1] || `Aluno(a) Matriculado ${i}`;
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
        </div>
        `;
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
}

function salvarChamada() {
    alert("✅ Sucesso! A chamada foi salva e registrada no sistema.");
    // Corrigido para a sua página no plural
    window.location.href = './prof_disciplinas.html';
}

// ==========================================
// LÓGICA DA TELA DE NOTAS
// ==========================================
function mudarAba(abaSelecionada) {
    document.querySelectorAll('.btn-aba').forEach(btn => {
        btn.classList.remove('active-aba');
    });
    const idMap = { 'N1': 'tab-n1', 'N2': 'tab-n2', 'Final': 'tab-final' };
    document.getElementById(idMap[abaSelecionada]).classList.add('active-aba');
    renderizarNotas(abaSelecionada);
}

function renderizarNotas(aba) {
    const container = document.getElementById('lista-notas');
    if (!container) return;

    let htmlCompleto = '';
    for (let i = 1; i <= 42; i++) {
        let nomeAluno = nomesBase[i - 1] || `Aluno(a) Matriculado ${i}`;
        let notaSimulada = (Math.random() * 5 + 5).toFixed(1); 
        
        htmlCompleto += `
        <div class="student-row">
            <div class="student-name">${nomeAluno}</div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="number" id="nota-${i}" class="grade-input" value="${notaSimulada}" step="0.1" min="0" max="10" oninput="atualizarCorMedia(${i})">
                <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #1a6ced; cursor: pointer;">
                <div id="badge-${i}" class="grade-avg">Média: ${notaSimulada}</div>
            </div>
        </div>
        `;
    }
    container.innerHTML = htmlCompleto;

    for (let i = 1; i <= 42; i++) {
        atualizarCorMedia(i);
    }
}

function atualizarCorMedia(alunoId) {
    const inputNota = document.getElementById(`nota-${alunoId}`);
    const badgeMedia = document.getElementById(`badge-${alunoId}`);
    
    if (!inputNota || !badgeMedia) return;

    let valorDigitado = parseFloat(inputNota.value);
    
    if (isNaN(valorDigitado)) valorDigitado = 0;
    if (valorDigitado > 10) { valorDigitado = 10; inputNota.value = 10; }
    if (valorDigitado < 0) { valorDigitado = 0; inputNota.value = 0; }

    badgeMedia.textContent = `Média: ${valorDigitado.toFixed(1)}`;

    if (valorDigitado >= 7.0) {
        badgeMedia.style.backgroundColor = '#d4edda';
        badgeMedia.style.color = '#28a745';
    } else {
        badgeMedia.style.backgroundColor = '#f8d7da';
        badgeMedia.style.color = '#dc3545';
    }
}

function publicarNotas() {
    const abaAtual = document.querySelector('.active-aba').innerText;
    alert(`✅ Sucesso! As notas da etapa [${abaAtual}] foram publicadas no sistema.`);
    // Corrigido para a sua página no plural e sem a pasta /html/
    window.location.href = './prof_disciplinas.html';
}