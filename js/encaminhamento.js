if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


// ================================
// PARAMS + PACIENTE
// ================================

const params = new URLSearchParams(window.location.search)
const pacienteId = Number(params.get('id'))

const pacientes =
  JSON.parse(localStorage.getItem('pacientes')) || []

const paciente = pacientes.find(p => p.id === pacienteId)
console.log('Paciente encontrado:', paciente)


if (!paciente) {
  alert('Paciente não encontrado')
  window.location.href = 'pacientes.html'
}

// ================================
// ELEMENTOS
// ================================

const nomePaciente = document.getElementById('nomePaciente')
const inputArquivo = document.getElementById('arquivo')
const btnSalvar = document.getElementById('btnSalvar')
const lista = document.getElementById('listaEncaminhamentos')
const btnVoltar = document.getElementById('btn-voltar')

// ================================
// MOSTRAR NOME DO PACIENTE
// ================================

nomePaciente.textContent = paciente.nomeCompleto


// ================================
// BOTÃO VOLTAR
// ================================

btnVoltar.href = `paciente.html?id=${pacienteId}`

// ================================
// BUSCAR ENCAMINHAMENTOS
// ================================

const encaminhamentos =
  JSON.parse(localStorage.getItem('encaminhamentos')) || []

// ================================
// RENDERIZAR LISTA
// ================================

function renderizar() {
  lista.innerHTML = ''

  encaminhamentos
    .filter(e => e.pacienteId === pacienteId)
    .forEach((e, index) => {
      const li = document.createElement('li')

      const nome = document.createElement('span')
      nome.textContent = e.nomeArquivo

      const btnExcluir = document.createElement('button')
      btnExcluir.textContent = 'Excluir'
      btnExcluir.style.cursor = 'pointer'

      btnExcluir.addEventListener('click', () => {
        if (!confirm('Deseja excluir este anexo?')) return

        encaminhamentos.splice(index, 1)
        localStorage.setItem(
          'encaminhamentos',
          JSON.stringify(encaminhamentos)
        )

        renderizar()
      })

      li.appendChild(nome)
      li.appendChild(btnExcluir)
      lista.appendChild(li)
    })
}

// ================================
// SALVAR ARQUIVO
// ================================

btnSalvar.addEventListener('click', () => {
  const arquivo = inputArquivo.files[0]

  if (!arquivo) {
    alert('Selecione um arquivo')
    return
  }

  const reader = new FileReader()

  reader.onload = function () {
    encaminhamentos.push({
      pacienteId,
      nomeArquivo: arquivo.name,
      arquivo: reader.result,
      data: new Date().toISOString()
    })

    localStorage.setItem(
      'encaminhamentos',
      JSON.stringify(encaminhamentos)
    )

    inputArquivo.value = ''
    renderizar()
  }

  reader.readAsDataURL(arquivo)
})

// ================================
// INICIAR
// ================================

renderizar()
