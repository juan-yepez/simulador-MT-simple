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
Estados:
- q0: inicio
- q1: aceptación
- q_rechaza: rechazo

| Estado | Símbolo | Nuevo estado |
|--------|----------|---------------|
| q0 | a | q1 |
| q0 | b | q1 |
| q1 | a | q1 |
| q1 | b | q1 |
| q0 o q1 | otro símbolo | q_rechaza |

### MT Equivalente

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
###*2¿Dónde está el cabezal?

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
