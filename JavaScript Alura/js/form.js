var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (event) {
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");
  var paciente = obtenPacienteDoForm(form);
  var pacienteTr = montaTr(paciente);
  var erros = validaPaciente(paciente);

  if (erros.length > 0) {
    exibeMensagemDeErro(erros);
    return;
  }
  //adicionando paciente na tabela
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);

  adicionarPacienteNaTabela(paciente);

  form.reset();
  var mensagemErro = document.querySelector("#mensagem-erro");
  mensagemErro.innerHTML = "";
});

function adicionarPacienteNaTabela(paciente) {
  var pacienteTr = montaTr(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}

function exibeMensagemDeErro(erros) {
  var ul = document.querySelector("#mensagem-erro");
  ul.innerHTML = "";
  erros.forEach(function (erro) {
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
}

// Le o form
function obtenPacienteDoForm(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value),
  };
  return paciente;
}
//Monta o paciente e add tag TR do html
function montaTr(paciente) {
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}
//add a tag TD do html
function montaTd(dado, classe) {
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}
function validaPaciente(paciente) {
  var erros = [];
  if (!validaPeso(paciente.peso)) {
    erros.push("Peso eh invalido");
  }
  if (!validaAltura(paciente.altura)) {
    erros.push("Altura eh invalido");
  }
  if (paciente.gordura.length == 0) {
    erros.push("A gordura nao pode ser em branco");
  }
  if (paciente.altura.length == 0) {
    erros.push("A altura nao pode ser em branco");
  }
  if (paciente.peso.length == 0) {
    erros.push("O peso nao pode ser em branco");
  }
  if (paciente.nome.length == 0) {
    erros.push("O nome nao pode ser em branco");
  }
  return erros;
}
