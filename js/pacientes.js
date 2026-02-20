if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


// PACIENTES BASE (JÁ VÊM NO SISTEMA)

const pacientesBase = [
  {
    id: 1,
    nomeCompleto: "Gabriel Bessa Pórfiro",
    dataNascimento: "2021/11/06",
    sexo: "M",
    responsavel: "Pai - Adriano Aparecido Pórfirio",
    atendimento: "Terça-feira e Quarta-feira • 14h"
  },
  {
    id: 2,
    nomeCompleto: "Eduardo Lira de Oliveira",
    dataNascimento: "2020/04/08",
    sexo: "M",
    responsavel: "Mãe - Joseana Pereira Lira",
    atendimento: "Terça-feira • 16h - Quinta-feira • 15h "
  }, 
   {
    id: 3,
    nomeCompleto: "Larissa de Alencar Bezerra",
    dataNascimento: "2021/03/14",
    sexo: "F",
    responsavel: "Mãe - Sandra Rocha de Alencar",
    atendimento: "Terça-feira • 17h"
  }, 
    {
    id: 4,
    nomeCompleto: "José Heitor Fernandes Feijão",
    dataNascimento: "2018/08/08",
    sexo: "M",
    responsavel: "Mãe - Francisca Rayana Fernandes Cavalcante",
    atendimento: "Quarta-feira • 15h"
  },
  {
    id: 5,
    nomeCompleto: "Joaquim Sotero de Sousa",
    dataNascimento: "2020/12/07",
    sexo: "M",
    responsavel: "Mãe - Samia Mendes Sotero de Sousa",
    atendimento: "Quarta-feira • 17h - Quinta-feira • 16h"
  },
  {
    id: 6,
    nomeCompleto: "Lucca Almeida de Oliveira",
    dataNascimento: "2019/03/19",
    sexo: "M",
    responsavel: "Mãe - Laviane de Brito Oliveira",
    atendimento: "Quinta-feira • 14h"
  },
    {
    id: 7,
    nomeCompleto: "Guilherme Alves Marques",
    dataNascimento: "2020/11/21",
    sexo: "M",
    responsavel: "Mãe - Antônia Elany Alves Marques",
    atendimento: "Quinta-feira • 17h"
  },
  
]

// ================================
// INICIALIZAR LOCALSTORAGE
// ================================

const pacientesSalvos =
  JSON.parse(localStorage.getItem('pacientes')) || []

if (pacientesSalvos.length === 0) {
  localStorage.setItem(
    'pacientes',
    JSON.stringify(pacientesBase)
  )
}

// ================================
// POPULAR LOCALSTORAGE (1ª VEZ)
// ================================

if (!localStorage.getItem('pacientes')) {
  localStorage.setItem('pacientes', JSON.stringify(pacientesBase))
}

// ================================
// FUNÇÕES AUXILIARES
// ================================

function abreviarNome(nomeCompleto) {
  if (!nomeCompleto) return ''

  const partes = nomeCompleto.trim().split(' ')
  if (partes.length === 1) return partes[0]

  return `${partes[0]} ${partes[partes.length - 1]}`
}

function calcularIdade(dataNascimento) {
  const nascimento = new Date(dataNascimento)
  if (isNaN(nascimento)) return '—'

  const hoje = new Date()
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }

  return idade
}

// ================================
// LISTAGEM
// ================================

const listaPacientes = document.querySelector('.lista-pacientes')

function criarCardPaciente(paciente) {
  const card = document.createElement('div')
  card.classList.add('card-paciente')

  card.innerHTML = `
    <h3>${abreviarNome(paciente.nomeCompleto)}</h3>
    <p>${calcularIdade(paciente.dataNascimento)} anos • ${paciente.sexo}</p>
  `

  card.addEventListener('click', () => {
    window.location.href = `paciente.html?id=${paciente.id}`
  })

  listaPacientes.appendChild(card)
}

function carregarPacientes() {
  listaPacientes.innerHTML = ''

  const pacientes =
    JSON.parse(localStorage.getItem('pacientes')) || []

  pacientes.forEach(criarCardPaciente)
}

carregarPacientes()


