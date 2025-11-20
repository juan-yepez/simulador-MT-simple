# Simulador de Máquina de Turing Simple
*Estudiantes:* Juan José Yepez,nicolas valle roman 
*Curso:* Gramáticas y Lenguajes Formales  
*Proyecto:* Simulador de Máquina de Turing (a|b)+

### Regex elegido
`(a|b)+`  
Acepta cadenas formadas por una o más letras `a` o `b`.

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

### Sustentación
- La cinta es el arreglo `tape[]`.
- El cabezal es la variable `head`.
- El estado es la variable `state`.
- La función de transición está dentro de `step()`.

Ejemplos:
- ✅ "abbaab" → válida  
- ❌ "abc" → inválida
