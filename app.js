let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let titulo = document.querySelector(elemento);
  titulo.innerHTML = texto;
}

const verificarIntento = () => {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste en ${intentos} ${intentos === 1 ? "intento" : "intentos"}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }
    intentos += 1;
    limpiarCaja();
  }
};

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //Si ya sorteamos todos los números
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
  } else {
    //Si el número generado está incluído en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

const condicionesIniciales = () => {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Elige un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
};

const reiniciarJuego = () => {
  //limpiar la caja
  limpiarCaja();
  //Indicar mensaje de intérvalor de números
  condicionesIniciales();
  //Generar el número aleatorio
  numeroSecreto = generarNumeroSecreto();
  //Deshabilitar el botón
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  //Reiniciar el número de intentos
  intentos = 1;
};

condicionesIniciales();
