if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


function gerarNovoId() {
  const pacientesBase = [
    1, 2, 3, 4, 5, 6, 7
  ]

  const pacientesSalvos =
    JSON.parse(localStorage.getItem('pacientes')) || []

  const idsSalvos = pacientesSalvos.map(p => p.id)

  const todosIds = [...pacientesBase, ...idsSalvos]

  const maiorId = todosIds.length > 0 ? Math.max(...todosIds) : 0

  return maiorId + 1
}




// ================================
// FORMULÁRIO - NOVO PACIENTE
// ================================

const form = document.querySelector('.form-paciente')

function dataNascimentoValida(dataNascimento) {
  const nascimento = new Date(dataNascimento)
  const hoje = new Date()

  if (isNaN(nascimento.getTime())) return false

  const ano = nascimento.getFullYear()

  if (ano < 1900) return false
  if (nascimento > hoje) return false

  return true
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-paciente')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const nomeCompleto = document.querySelector('#nome').value
   const dataNascimento = document.querySelector('#dataNascimento').value

if (!dataNascimentoValida(dataNascimento)) {
  alert('Data de nascimento inválida! Verifique o ano informado.')
  return
}



    
    const sexo = document.querySelector('input[name="sexo"]:checked').value
    const atendimento = document.querySelector('#atendimento').value
    const responsavel = document.querySelector('#responsavel').value
    const observacoes = document.querySelector('#observacoes').value

    const paciente = {
      id: gerarNovoId(),
      nomeCompleto,
      dataNascimento,
      sexo,
      atendimento,
      responsavel,
      observacoes
    }

    const pacientes =
      JSON.parse(localStorage.getItem('pacientes')) || []

    pacientes.push(paciente)
    localStorage.setItem('pacientes', JSON.stringify(pacientes))

    alert('Paciente cadastrado com sucesso!')
    window.location.href = 'pacientes.html'
  })
})


  const observacoes = document.querySelector('#observacoes').value


