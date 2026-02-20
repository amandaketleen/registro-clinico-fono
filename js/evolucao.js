if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


const params = new URLSearchParams(window.location.search)
const pacienteId = Number(params.get('id'))

const pacientes =
  JSON.parse(localStorage.getItem('pacientes')) || []

const paciente = pacientes.find(p => p.id === pacienteId)

if (!paciente) {
  alert('Paciente não encontrado')
  window.location.href = 'pacientes.html'
}

const nomePacienteEl = document.getElementById('nomePaciente')
nomePacienteEl.textContent = paciente.nomeCompleto


let evolucoes = []

try {
  evolucoes = JSON.parse(localStorage.getItem('evolucoes')) || []
} catch (e) {
  evolucoes = []
}

const btnVoltar = document.getElementById('btn-voltar')

if (btnVoltar) {
  btnVoltar.addEventListener('click', () => {
    window.location.href = `paciente.html?id=${pacienteId}`
  })
}



const btnSalvar = document.getElementById('btnSalvar')
const lista = document.getElementById('listaEvolucoes')

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}/${ano}`
}


function renderizar() {
  lista.innerHTML = ''

  evolucoes
    .filter(e => e.pacienteId === pacienteId)
    .forEach(e => {
      const div = document.createElement('div')
      div.classList.add('item-evolucao')

      const p = document.createElement('p')
      p.textContent = e.texto

      const btnExcluir = document.createElement('button')
      btnExcluir.textContent = 'Excluir'
      btnExcluir.classList.add('btn-excluir')

      btnExcluir.addEventListener('click', () => {
        excluirEvolucao(e.id)
      })

      div.appendChild(p)
      div.appendChild(btnExcluir)
      lista.appendChild(div)
    })
}


function excluirEvolucao(id) {
  const confirmar = confirm('Deseja excluir esta evolução?')
  if (!confirmar) return

  const index = evolucoes.findIndex(e => e.id === id)

  if (index > -1) {
    evolucoes.splice(index, 1)
    localStorage.setItem('evolucoes', JSON.stringify(evolucoes))
    renderizar()
  }
}


btnSalvar.addEventListener('click', () => {
  const data = document.getElementById('dataEvolucao').value
  const estado = document.getElementById('estadoPaciente').value
  const r1 = document.getElementById('realizou1').value
  const r2 = document.getElementById('realizou2').value
  const obs = document.getElementById('observacoes').value

  if (!data || !estado) {
    alert('Preencha a data e o estado do paciente')
    return
  }

  let texto = `${formatarData(data)} – Paciente entrou ${estado}`

  if (r1 || r2) {
    texto += ', realizou'
    if (r1) texto += ` ${r1}`
    if (r2) texto += r1 ? ` e ${r2}` : ` ${r2}`
  }

  if (obs) {
    texto += `. Observações: ${obs}`
  }

  texto += '.'

  evolucoes.push({
    id: Date.now(),
    pacienteId,
    data,
    texto
  })

  localStorage.setItem('evolucoes', JSON.stringify(evolucoes))

  renderizar()
})

renderizar()
