var botaoAdicionar = document.querySelector("#buscar-paciente");
botaoAdicionar.addEventListener("click", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
  xhr.addEventListener("load", function () {
    if (xhr.status == 200) {
      var resposta = xhr.responseText;
      var pacientes = JSON.parse(resposta);
      pacientes.forEach(function (paciente) {
        adicionarPacienteNaTabela(paciente);
      });
    } else {
      console.log(xhr.status);
      console.log(xhr.response);
      var erroAjax = document.querySelector("#erro-ajax");
      erroAjax.classList.remove("invisivel");
    }
  });
  xhr.send();
});
