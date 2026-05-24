// Lógica para alternar Presente/Ausente na tela de Chamada
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