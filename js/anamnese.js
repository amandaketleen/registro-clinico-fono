if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


// ================================
// VALIDAR TIPO DE ANAMNESE
// ================================

const params = new URLSearchParams(window.location.search)
const pacienteId = Number(params.get('id'))

const pacientes =
  JSON.parse(localStorage.getItem('pacientes')) || []

const paciente = pacientes.find(p => p.id === pacienteId)

if (!paciente) {
  alert('Paciente não encontrado')
  window.location.href = 'pacientes.html'
}

function calcularIdade(dataNascimento) {
  const nascimento = new Date(dataNascimento)
  if (isNaN(nascimento)) return null

  const hoje = new Date()
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }

  return idade
}

const idade = calcularIdade(paciente.dataNascimento)

// nome do arquivo atual
const paginaAtual = window.location.pathname

// 👉 regras de redirecionamento
if (idade < 18 && paginaAtual.includes('anamnese-adulto')) {
  window.location.href = `anamnese-infantil.html?id=${pacienteId}`
}

if (idade >= 18 && paginaAtual.includes('anamnese-infantil')) {
  window.location.href = `anamnese-adulto.html?id=${pacienteId}`
}




// ================================
// BOTÃO VOLTAR
// ================================

const btnVoltar = document.getElementById('btn-voltar')

if (btnVoltar) {
  btnVoltar.href = `paciente.html?id=${pacienteId}`
}


// ================================
// ELEMENTOS
// ================================
const form = document.querySelector('.form-anamnese')

// ================================
// BUSCAR ANAMNESES SALVAS
// ================================
const anamneses =
  JSON.parse(localStorage.getItem('anamneses')) || []

const anamneseExistente = anamneses.find(
  a => a.pacienteId === pacienteId
)

// ================================
// PREENCHER FORM (SE EXISTIR)
// ================================
if (anamneseExistente) {
  const dados = anamneseExistente.dados

  Object.keys(dados).forEach(campo => {
    const input = form.querySelector(`[name="${campo}"]`)
    if (!input) return

    if (input.type === 'radio') {
      const radio = form.querySelector(
        `[name="${campo}"][value="${dados[campo]}"]`
      )
      if (radio) radio.checked = true
    } else {
      input.value = dados[campo]
    }
  })
}
'1'
// ================================
// SALVAR ANAMNESE
// ================================
form.addEventListener('submit', function (e) {
  e.preventDefault()

  const dadosAnamnese = {}

  const campos = form.querySelectorAll('input, textarea, select')

  campos.forEach(campo => {
    if (!campo.name) return

    if (campo.type === 'radio') {
      if (campo.checked) {
        dadosAnamnese[campo.name] = campo.value
      }
    } else {
      dadosAnamnese[campo.name] = campo.value
    }
  })

  const index = anamneses.findIndex(
    a => a.pacienteId === pacienteId
  )

  if (index >= 0) {
    // atualiza
    anamneses[index].dados = dadosAnamnese
  } else {
    // cria nova
    anamneses.push({
      pacienteId,
      dados: dadosAnamnese
    })
  }

  localStorage.setItem('anamneses', JSON.stringify(anamneses))

  alert('Anamnese salva com sucesso 💜')
})
