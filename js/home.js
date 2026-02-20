function logout() {
  localStorage.removeItem("autenticado");
  window.location.href = "login.html";
}

    if (localStorage.getItem("autenticado") !== "true") {
  window.location.href = "login.html";
}