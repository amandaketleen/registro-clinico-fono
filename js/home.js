/* === VERIFICAÇÃO DE AUTENTICAÇÃO === */

if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}


/* === LOGOUT DA PÁGINA === */

function logout() {

  localStorage.removeItem("autenticado")

  window.location.href = "login.html"

}