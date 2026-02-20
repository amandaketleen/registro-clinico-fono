if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


// ================================
// FUNÇÕES
// ================================

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return '—'

  const nascimento = new Date(dataNascimento)
  if (isNaN(nascimento.getTime())) return '—'

  const hoje = new Date()
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }

  return idade
}

function formatarDataBR(dataISO) {
  if (!dataISO) return '—'

  const data = new Date(dataISO)
  if (isNaN(data.getTime())) return '—'

  return data.toLocaleDateString('pt-BR')
}

// ================================
// PEGAR ID DA URL
// ================================

const params = new URLSearchParams(window.location.search)
const pacienteId = Number(params.get('id'))

if (!pacienteId) {
  alert('Paciente inválido')
  window.location.href = 'pacientes.html'
}

// ================================
// BUSCAR PACIENTE
// ================================

const pacientes =
  JSON.parse(localStorage.getItem('pacientes')) || []

const paciente = pacientes.find(p => p.id === pacienteId)

if (!paciente) {
  alert('Paciente não encontrado')
  window.location.href = 'pacientes.html'
}

// ================================
// PREENCHER FICHA
// ================================

document.getElementById('nome-paciente').textContent =
  paciente.nomeCompleto || '—'

document.getElementById('nascimento-paciente').textContent =
  `${formatarDataBR(paciente.dataNascimento)} • ${calcularIdade(
    paciente.dataNascimento
  )} anos`

document.getElementById('sexo-paciente').textContent =
  paciente.sexo === 'F' ? 'Feminino' : 'Masculino'

document.getElementById('responsavel-paciente').textContent =
  paciente.responsavel || '—'

document.getElementById('atendimento-paciente').textContent =
  paciente.atendimento || '—'

document.getElementById('observacoes-paciente').textContent =
  paciente.observacoes || 'Nenhuma observação registrada'

// ================================
// LINKS DO PRONTUÁRIO
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const linkAnamnese = document.querySelector(
    '.link-prontuario[data-destino="anamnese"]'
  )

  if (linkAnamnese) {
    linkAnamnese.addEventListener('click', () => {
      const idade = calcularIdade(paciente.dataNascimento)

      const pagina =
        idade < 18
          ? 'anamnese-infantil.html'
          : 'anamnese-adulto.html'

      window.location.href = `${pagina}?id=${pacienteId}`
    })
  }

  const outrosLinks = document.querySelectorAll(
    '.link-prontuario:not([data-destino="anamnese"])'
  )

  outrosLinks.forEach(link => {
    const destino = link.dataset.destino
    link.href = `${destino}.html?id=${pacienteId}`
  })
})

