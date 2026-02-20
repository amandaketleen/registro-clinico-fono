if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


// ================================
// PEGAR ID DO PACIENTE
// ================================
const params = new URLSearchParams(window.location.search)
const pacienteId = Number(params.get('id'))

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

// nome do paciente no HTML
document.getElementById('nomePaciente').textContent =
  paciente.nomeCompleto

// ================================
// BOTÃO VOLTAR
// ================================
document.getElementById(
  'btn-voltar'
).href = `paciente.html?id=${pacienteId}`

// ================================
// ELEMENTOS
// ================================
const inputArquivo = document.getElementById('arquivo')
const btnAnexar = document.getElementById('btnAnexar')
const listaArquivos = document.getElementById('listaArquivos')

// ================================
// BUSCAR DEVOLUTIVAS
// ================================
let devolutivas =
  JSON.parse(localStorage.getItem('devolutivas')) || []

// ================================
// RENDERIZAR LISTA
// ================================
function renderizar() {
  listaArquivos.innerHTML = ''

  const arquivosPaciente = devolutivas.filter(
    d => d.pacienteId === pacienteId
  )

  if (arquivosPaciente.length === 0) {
    listaArquivos.innerHTML =
      '<li>Nenhum arquivo anexado.</li>'
    return
  }

  arquivosPaciente.forEach((item, index) => {
    const li = document.createElement('li')

    const nome = document.createElement('span')
    nome.textContent = item.nomeArquivo

    const acoes = document.createElement('div')
    acoes.classList.add('acoes-arquivo')

    const btnBaixar = document.createElement('button')
    btnBaixar.textContent = 'Baixar'
    btnBaixar.onclick = () => baixarArquivo(item)

    const btnExcluir = document.createElement('button')
    btnExcluir.textContent = 'Excluir'
    btnExcluir.onclick = () => excluirArquivo(index)

    acoes.appendChild(btnBaixar)
    acoes.appendChild(btnExcluir)

    li.appendChild(nome)
    li.appendChild(acoes)

    listaArquivos.appendChild(li)
  })
}

// ================================
// ANEXAR ARQUIVO
// ================================
btnAnexar.addEventListener('click', () => {
  const file = inputArquivo.files[0]

  if (!file) {
    alert('Selecione um arquivo')
    return
  }

  const reader = new FileReader()

  reader.onload = function () {
    devolutivas.push({
      pacienteId,
      nomeArquivo: file.name,
      tipo: file.type,
      conteudo: reader.result
    })

    localStorage.setItem(
      'devolutivas',
      JSON.stringify(devolutivas)
    )

    inputArquivo.value = ''
    renderizar()
  }

  reader.readAsDataURL(file)
})

// ================================
// BAIXAR ARQUIVO
// ================================
function baixarArquivo(item) {
  const link = document.createElement('a')
  link.href = item.conteudo
  link.download = item.nomeArquivo
  link.click()
}

// ================================
// EXCLUIR ARQUIVO
// ================================
function excluirArquivo(index) {
  if (!confirm('Deseja excluir este arquivo?')) return

  const arquivosPaciente = devolutivas.filter(
    d => d.pacienteId === pacienteId
  )

  const arquivoExcluir = arquivosPaciente[index]

  devolutivas = devolutivas.filter(
    d => d !== arquivoExcluir
  )

  localStorage.setItem(
    'devolutivas',
    JSON.stringify(devolutivas)
  )

  renderizar()
}

// ================================
// INICIALIZAR
// ================================
renderizar()
