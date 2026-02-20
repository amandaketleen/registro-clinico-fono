const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const mensagemErro = document.getElementById("mensagemErro");

  // Usuário e senha fixos 
  const usuarioCorreto = "Debora Barros";
  const senhaCorreta = "sonsdosaber";

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    localStorage.setItem("autenticado", "true");
    window.location.href = "pages/home.html"; // ou dashboard.html
  } else {
    mensagemErro.textContent = "Usuário ou senha incorretos.";
    mensagemErro.style.display = "block";
  }
});
