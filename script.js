const camposJogo         = document.querySelectorAll("[data-cell]");
const Tabuleiro          = document.querySelector("[data-board]");
const mensagemGanhouText = document.querySelector("[data-winning-message-text]");
const mensagemGanhou     = document.querySelector("[data-winning-message]");
const botaoRestart       = document.querySelector("[data-restart-button]");

let vezDoCirculo;

const combinacoesParaGanhar = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const comecaJogo = () => {
  vezDoCirculo = false;

  for (const campo of camposJogo) {
    campo.classList.remove("circle");
    campo.classList.remove("x");
    campo.addEventListener("click", clicou, { once: true });
  }

  resetarMarcaTabuleiro();
  mensagemGanhou.classList.remove("show-winning-message");
};

const finalizaJogo = (empate) => {
  if (empate) {
    mensagemGanhouText.innerText = "Empate!";
  } else {
    mensagemGanhouText.innerText = vezDoCirculo
      ? "O Venceu!"
      : "X Venceu!";
  }

  mensagemGanhou.classList.add("show-winning-message");
};

const checarVitoria = (jogadorAtual) => {
  return combinacoesParaGanhar.some((combinacao) => {
    return combinacao.every((index) => {
      return camposJogo[index].classList.contains(jogadorAtual);
    });
  });
};

const checarEmpate = () => {
  return [...camposJogo].every((campo) => {
    return campo.classList.contains("x") || campo.classList.contains("circle");
  });
};

const colocarNoCampo = (campo, classeParaAdicionar) => {
  campo.classList.add(classeParaAdicionar);
};

const resetarMarcaTabuleiro = () => {
  Tabuleiro.classList.remove("circle");
  Tabuleiro.classList.remove("x");

  if (vezDoCirculo) {
    Tabuleiro.classList.add("circle");
  } else {
    Tabuleiro.classList.add("x");
  }
};

const trocarTurno = () => {
  vezDoCirculo = !vezDoCirculo;

  resetarMarcaTabuleiro();
};

const clicou = (e) => {
  // Colocar a marca (X ou Círculo)
  const campo = e.target;
  let classeParaAdicionar;

  if (vezDoCirculo) {
    classeParaAdicionar = 'circle';
  }   else {
    classeParaAdicionar = 'x';
  }

  colocarNoCampo(campo, classeParaAdicionar);

  // Verificar por vitória
  const vitoria = checarVitoria(classeParaAdicionar);

  // Verificar por empate
  const empate = checarEmpate();

  if (vitoria) {
    finalizaJogo(false);
  } else if (empate) {
    finalizaJogo(true);
  } else {
    // Mudar símbolo
    trocarTurno();
  }
};

comecaJogo();

botaoRestart.addEventListener("click", comecaJogo);