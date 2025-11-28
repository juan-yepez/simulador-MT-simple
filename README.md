# Simulador de Máquina de Turing Simple
*Estudiantes:* Juan José Yepez, nicolas valle roman 
*Curso:* Gramáticas y Lenguajes Formales  
*Proyecto:* Simulador de Máquina de Turing (a|b)+

##Descripción del proyecto
Este proyecto implementa un simulador de Máquina de Turing (MT) que emula un Autómata Finito Determinista (AFD) para el lenguaje definido por la expresión regular
Fue desarrollado con HTML, CSS y JavaScript, y publicado en GitHub Pages.

### Regex elegido
`(a|b)+`  
Representa cadenas formadas únicamente por los símbolos a y b, con al menos un carácter.`a` o `b`.

##  ¿Por qué elegí el Regex (a|b)+?

Elegí la expresión regular (a|b)+ porque cumple perfectamente con los objetivos del taller y permite una implementación clara tanto en teoría como en práctica.

### 1. Es fácil de modelar con un AFD
Solo requiere dos estados principales:
- q0 (inicio)
- q1 (aceptación)

Esto hace que el autómata sea visualmente sencillo y didáctico.

### 2. Tiene una aplicación práctica
Podría usarse, por ejemplo, para validar un campo de texto en un formulario web que solo acepte letras a y b.

### 3. Cumple con los requisitos del proyecto
El taller pedía usar una expresión regular *manejable y representativa de un lenguaje regular*.  
Evita complejidades innecesarias (como correos electrónicos o contraseñas completas) y permite centrarse en la teoría de autómatas.

### 4. Facilita la conversión a Máquina de Turing
Gracias a su estructura simple, es muy fácil demostrar cómo una Máquina de Turing puede emular un AFD:  
- Solo se mueve a la derecha.  
- No sobrescribe la cinta.  
- Acepta o rechaza según el estado final.

---

### AFD

 AFD = (Q, Σ, δ, q0, F)*

Donde:
- *Q:* Conjunto finito de estados  
  Q = { q0, q1, q_rechaza }

- *Σ:* Alfabeto de entrada  
  Σ = { a, b }

- *δ:* Función de transición (definida más abajo)

- *q0:* Estado inicial  
  q0

- *F:* Conjunto de estados de aceptación  
  F = { q1 }

  
###  *δ: Función de transición*

| Estado | Símbolo | Nuevo estado |
|--------|----------|---------------|
| q0 | a | q1 |
| q0 | b | q1 |
| q1 | a | q1 |
| q1 | b | q1 |
| q0 o q1 | otro símbolo | q_rechaza |

### MT Equivalente
 MT = (Q, Σ, Γ, δ, q0, q_acepta, q_rechaza)*

Donde:

- *Q:* Conjunto finito de estados  
  Q = { q0, q1, q_acepta, q_rechaza }

- *Σ:* Alfabeto de entrada (símbolos válidos del lenguaje)  
  Σ = { a, b }

- *Γ:* Alfabeto de la cinta (símbolos que la máquina puede leer o escribir)  
  Γ = { a, b, _ }  
  El símbolo _ representa el *espacio en blanco* de la cinta.

- *q0:* Estado inicial  
  q0

- *q_acepta:* Estado de aceptación (la cadena pertenece al lenguaje)  
  q_acepta

- *q_rechaza:* Estado de rechazo (la cadena no pertenece al lenguaje)  
  q_rechaza

---

### *funcion de Transición

| Estado | Símbolo leído | Símbolo escrito | Movimiento | Nuevo estado |
|---------|----------------|------------------|-------------|----------------|
| q0 | a | a | → | q1 |
| q0 | b | b | → | q1 |
| q1 | a | a | → | q1 |
| q1 | b | b | → | q1 |
| q1 | `_` | `_` | * | q_acepta |
| otro | otro | mismo | → | q_rechaza |

Ejemplos:
- ✅ "abbaab" → válida  
- ❌ "abc" → inválida


## Preguntas de la Sustentación Análisis (El Código script.js ):

A continuación se responden las preguntas clave del proyecto, mostrando las partes exactas del código JavaScript que implementan cada concepto teórico.

---

### * 1 ¿Dónde está la cinta de su MT?*
La *cinta* está representada en el código por un arreglo llamado tape.  
Este arreglo guarda los símbolos ingresados por el usuario (por ejemplo: a, b, _).

```javascript
// Cinta de la Máquina de Turing
let tape = [];  // Aquí se almacena la cadena ingresada por el usuario
let inputString = "";  // Cadena original escrita en el campo de texto

function loadTape() {
  const input = document.getElementById("inputString").value.trim();
  inputString = input;
  tape = input.split(""); // convierte la cadena en un arreglo de caracteres
  tape.push("_"); // símbolo en blanco al final de la cinta
  head = 0; // reinicia la posición del cabezal
  state = "q0"; // vuelve al estado inicial
  updateDisplay();
}
```
### *2¿Dónde está el cabezal?

El cabezal es la parte de la máquina que se mueve sobre la cinta.
Está representado por la variable head, la cual indica la posición actual de lectura.

```javascript
// Posición del cabezal
let head = 0;

// Movimiento del cabezal durante la ejecución
function step() {
  const symbol = tape[head]; // lee el símbolo actual
  // ...
  head++; // mueve el cabezal una posición a la derecha
  updateDisplay(); // actualiza la interfaz visual
}
```
### *3️ ¿Dónde está el registro de estado?

El estado actual de la máquina se guarda en la variable state.
Indica en qué punto del autómata se encuentra la ejecución (q0, q1, q_acepta, q_rechaza).

```javascript
// Estado actual de la Máquina de Turing
let state = "q0"; // Estado inicial

function step() {
  const symbol = tape[head];
  
  if (state === "q0") {
    if (symbol === "a" || symbol === "b") {
      state = "q1"; // transición al siguiente estado
      head++;
    } else {
      state = "q_rechaza";
    }
  }
  else if (state === "q1") {
    if (symbol === "a" || symbol === "b") {
      head++;
    } else if (symbol === "_") {
      state = "q_acepta"; // estado final
    } else {
      state = "q_rechaza";
    }
```

### *4 ¿Dónde está la función de transición (tabla de reglas)?

La función de transición está implementada dentro de la función step().
Define las reglas de cómo la máquina pasa de un estado a otro según el símbolo leído.

```javascript

function step() {
  const symbol = tape[head];

  if (state === "q0") {
    if (symbol === "a" || symbol === "b") {
      state = "q1"; // transición al estado q1
      head++; // avanza el cabezal
    } else {
      state = "q_rechaza"; // símbolo inválido
    }
  } 
  else if (state === "q1") {
    if (symbol === "a" || symbol === "b") {
      head++;
    } 
    else if (symbol === "_") {
      state = "q_acepta"; // llegó al final con cadena válida
    } 
    else {
      state = "q_rechaza"; // símbolo no permitido
    }
  }

  updateDisplay();
}
```
### *5 ¿Qué parte del código es el motor que ejecuta una regla?

El motor principal está en la función run().
Esta función llama repetidamente a step() hasta que la máquina llega a un estado final.

```javascript
// Función principal que ejecuta toda la Máquina de Turing
function run() {
  // Mientras la máquina no haya llegado a un estado final (aceptación o rechazo)...
  while (state !== "q_acepta" && state !== "q_rechaza") {
    // ...ejecuta un paso de la máquina según las reglas definidas en step()
    step();
  }
  
  // Cuando la máquina sale del ciclo, significa que llegó a un estado final.
  // Aquí se muestra el resultado al usuario dependiendo del estado final alcanzado:

  if (state === "q_acepta") {
    // Si el estado final es "q_acepta", la cadena pertenece al lenguaje
    document.getElementById("result").innerText = "✅ Cadena válida";
  } else {
    // Si el estado final es "q_rechaza", la cadena NO pertenece al lenguaje
    document.getElementById("result").innerText = "❌ Cadena no válida";
  }
}
```
### *6️ Su MT emula un AFD. ¿Qué tendría que cambiar para que resolviera un problema que un AFD no puede?
Para que la máquina se convirtiera en una Máquina de Turing completa (y no solo un AFD emulado), sería necesario modificar su comportamiento así:

```javascript
// Función step() conceptual: representa un solo paso de la Máquina de Turing completa
function step() {
  // Lee el símbolo actual en la posición del cabezal
  const symbol = tape[head];

  // Ejemplo de transición para un estado qX
  // En una MT completa, la máquina puede decidir moverse a la derecha o izquierda
  if (state === "qX") {
    if (symbol === "a") {
      tape[head] = "x"; // Reescribe el símbolo 'a' por 'x' en la cinta
      head--;            // Mueve el cabezal *una posición hacia la izquierda*
      state = "qY";      // Cambia al nuevo estado qY según la función de transición
    }
  }
}
```
### Conclusión del Proyecto

Este proyecto permitió comprender cómo una Máquina de Turing puede emular el funcionamiento de un Autómata Finito Determinista (AFD).
Mediante la expresión regular (a|b)+, se logró construir un simulador capaz de:
	•	Leer una cinta de entrada símbolo por símbolo.
	•restirngir y Mover un cabezal de lectura unicamente  hacia la derecha limitando asi gran parte del poder  de una mt.
	•	Cambiar de estado según las reglas de transición.
	•	Determinar si la cadena pertenece o no al lenguaje definido.

La implementación en HTML, CSS y JavaScript permitió visualizar de forma práctica los conceptos teóricos de la materia, uniendo lenguajes formales y desarrollo web en una sola aplicación funcional.

---

##  Enlaces del Proyecto

-  *Repositorio en GitHub:*  
  [https://github.com/Juan-Yepez/simulador-MT-simple](https://github.com/Juan-Yepez/simulador-MT-simple)

-  *Simulador en línea (GitHub Pages):*  
  [https://juan-yepez.github.io/simulador-MT-simple/](https://juan-yepez.github.io/simulador-MT-simple/)

---



  


