/* === VERIFICAÇÃO DE AUTENTICAÇÃO (redireciona para a tela de login caso o usuário não esteja autenticado no sistema) === */
if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


/* === IDENTIFICAR PACIENTE PELA ID === */

const params = new URLSearchParams(window.location.search);
const pacienteId = Number(params.get('id'));

const pacientes =
  JSON.parse(localStorage.getItem('pacientes')) || [];

const paciente = pacientes.find(p => p.id === pacienteId);

if (!paciente) {
  alert('Paciente não encontrado');
  window.location.href = 'pacientes.html';
}


/* === FUNÇÃO CALCULAR IDADE === */

function calcularIdade(dataNascimento) {

  const nascimento = new Date(dataNascimento);
  if (isNaN(nascimento)) return null;

  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;

}

const idade = calcularIdade(paciente.dataNascimento);


/* === VALIDAÇÃO DE TIPO DE ANAMNESE
   (redireciona automaticamente para versão correta da anamnese (infantil ou adulto) === */

const paginaAtual = window.location.pathname;

if (idade < 18 && paginaAtual.includes('anamnese-adulto')) {
  window.location.href = `anamnese-infantil.html?id=${pacienteId}`;
}

if (idade >= 18 && paginaAtual.includes('anamnese-infantil')) {
  window.location.href = `anamnese-adulto.html?id=${pacienteId}`;
}


/* === BOTÃO VOLTAR === */

const btnVoltar = document.getElementById('btn-voltar');

if (btnVoltar) {
  btnVoltar.href = `paciente.html?id=${pacienteId}`;
}


/* === ELEMENTOS DO FORMULÁRIO === */

const form = document.querySelector('.form-anamnese');


/* === BUSCAR ANAMNESES SALVAS === */

const anamneses =
  JSON.parse(localStorage.getItem('anamneses')) || [];

const anamneseExistente = anamneses.find(
  a => a.pacienteId === pacienteId
);


/* === PREENCHER FORMULÁRIO (CASO JA EXISTA ANAMNESE) === */
 
if (anamneseExistente) {

  const dados = anamneseExistente.dados;

  Object.keys(dados).forEach(campo => {

    const input = form.querySelector(`[name="${campo}"]`);
    if (!input) return;

    if (input.type === 'radio') {

      const radio = form.querySelector(
        `[name="${campo}"][value="${dados[campo]}"]`
      );

      if (radio) radio.checked = true;

    } else {

      input.value = dados[campo];

    }

  });

}


/* === SALVAR ANAMNESE === */

form.addEventListener('submit', function (e) {

  e.preventDefault();

  const dadosAnamnese = {};

  const campos = form.querySelectorAll('input, textarea, select');

  campos.forEach(campo => {

    if (!campo.name) return;

    if (campo.type === 'radio') {

      if (campo.checked) {
        dadosAnamnese[campo.name] = campo.value;
      }

    } else {

      dadosAnamnese[campo.name] = campo.value;

    }

  });

  const index = anamneses.findIndex(
    a => a.pacienteId === pacienteId
  );

  if (index >= 0) {

    // atualizar existente
    anamneses[index].dados = dadosAnamnese;

  } else {

    // criar nova anamnese
    anamneses.push({
      pacienteId,
      dados: dadosAnamnese
    });

  }

  localStorage.setItem('anamneses', JSON.stringify(anamneses));

  alert('Anamnese salva com sucesso 💜');

});