/* === ELEMENTOS DO FORMULÁRIO === */
const form = document.getElementById("loginForm")


/* === EVENTO DE LOGIN === */

form.addEventListener("submit", function (event) {

  event.preventDefault()

  const usuario = document.getElementById("usuario").value
  const senha = document.getElementById("senha").value
  const mensagemErro = document.getElementById("mensagemErro")


  /* === CREDENCIAIS FIXAS === */
  const usuarioCorreto = "Debora Barros"
  const senhaCorreta = "sonsdosaber"


  /* === VALIDAÇÃO DE LOGIN === */

  if (usuario === usuarioCorreto && senha === senhaCorreta) {

    localStorage.setItem("autenticado", "true")

    window.location.href = "pages/home.html"

  } else {

    mensagemErro.textContent = "Usuário ou senha incorretos."
    mensagemErro.style.display = "block"

  }

})
