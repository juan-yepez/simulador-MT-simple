let tape = [];
let head = 0;
let state = "q0";
const finalStates = ["q1"];

function loadTape() {
  const input = document.getElementById("inputString").value;
  tape = input.split("");
  tape.push("_"); // símbolo blanco
  head = 0;
  state = "q0";
  drawTape();
  document.getElementById("result").textContent = "";
}

function drawTape() {
  const container = document.getElementById("tapeContainer");
  container.innerHTML = "";
  tape.forEach((symbol, i) => {
    const cell = document.createElement("div");
    cell.className = "cell" + (i === head ? " head" : "");
    cell.textContent = symbol;
    container.appendChild(cell);
  });
}

function step() {
  const symbol = tape[head];
  if (state === "q0") {
    if (symbol === "a" || symbol === "b") { state = "q1"; head++; }
    else state = "q_rechaza";
  }
  else if (state === "q1") {
    if (symbol === "a" || symbol === "b") { head++; }
    else if (symbol === "_") { state = "q_acepta"; }
    else { state = "q_rechaza"; }
  }

  drawTape();
  checkEnd();
}

function checkEnd() {
  if (state === "q_acepta") {
    document.getElementById("result").textContent = "✅ Cadena válida";
  } else if (state === "q_rechaza") {
    document.getElementById("result").textContent = "❌ Cadena inválida";
  }
}

function run() {
  while (state !== "q_acepta" && state !== "q_rechaza") {
    step();
  }
}

function reset() {
  tape = [];
  head = 0;
  state = "q0";
  document.getElementById("tapeContainer").innerHTML = "";
  document.getElementById("result").textContent = "";
}