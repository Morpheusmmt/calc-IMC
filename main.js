// Capturar evento de submit do formulário
const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = e.target.querySelector("#altura");

  const peso = parseFloat(inputPeso.value.trim());
  const altura = parseFloat(inputAltura.value.trim());

  if (!isValidNumber(peso)) {
    setResultado("Por favor, insira um peso válido (em kg).", false);
    return;
  }

  if (!isValidNumber(altura)) {
    setResultado("Por favor, insira uma altura válida (em metros).", false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);

  const msg = `Seu IMC é ${imc} (${nivelImc}).`;
  setResultado(msg, true);
});

function isValidNumber(value) {
  return !isNaN(value) && value > 0;
}

function getNivelImc(imc) {
  const niveis = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3",
  ];
  if (imc >= 39.9) return niveis[5];
  if (imc >= 34.9) return niveis[4];
  if (imc >= 29.9) return niveis[3];
  if (imc >= 24.9) return niveis[2];
  if (imc >= 18.5) return niveis[1];
  return niveis[0];
}

function getImc(peso, altura) {
  const imc = peso / (altura ** 2);
  return imc.toFixed(2);
}

function criaP() {
  const p = document.createElement("p");
  return p;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";

  const p = criaP();
  p.classList.add(isValid ? "paragrafo-resultado" : "bad");
  p.innerHTML = msg;
  resultado.appendChild(p);
}
