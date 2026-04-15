# Guía de demostración en vivo (10 a 12 minutos)

## Objetivo de la demo
Presentar, de forma clara y breve, el plan para migrar a React sin pérdida funcional respecto a `origin/main`.

## Mensaje inicial sugerido (30 segundos)
"Estamos modernizando la solución a React, pero sin cambiar el negocio. La meta es conservar exactamente el comportamiento actual y, una vez estable, optimizar la plataforma con menor riesgo."

## Guion recomendado

### 1) Contexto y problema (1 minuto)
- La plataforma actual funciona, pero tiene deuda técnica y limita la evolución.
- El riesgo principal de migración es perder comportamiento funcional.
- Por eso, el enfoque es paridad 1:1 antes de cualquier rediseño.

### 2) Enfoque de solución (2 minutos)
- Fuente de verdad: `origin/main`.
- Matriz de paridad para validar wizard, reglas, mensajes y condicionales.
- Metodología GSD para ejecutar rápido, con foco y trazabilidad.

### 3) Plan por fases (3 minutos)
- P0: línea base de paridad.
- P1: contrato funcional (DTO, sanitización, validación).
- P2: UI React con comportamiento equivalente.
- P3: pipeline y calidad continua.
- P4: regresión y cierre formal.

### 4) Gobernanza por roles (2 minutos)
- PO: alcance y aceptación.
- Dev: implementación por bloques.
- Dev Sr: arquitectura y control técnico.
- QA: certificación de paridad y salida.

### 5) Riesgos y mitigación (1 minuto)
- Reglas implícitas legacy -> port 1:1 + pruebas por caso.
- Diferencias cliente/servidor -> una fuente de verdad para reglas críticas.
- Dependencias no documentadas -> contratos explícitos y validación temprana.

### 6) Cierre y compromiso (1 a 2 minutos)
- Criterio de éxito: build y pruebas en verde, cero brechas críticas, aprobación PO/Dev Sr/QA.
- Resultado esperado: plataforma moderna, estable y lista para evolucionar.

## Preguntas frecuentes esperadas del jefe

### ¿Qué garantiza que no se romperá el negocio?
La matriz de paridad, la regresión formal y la aprobación cruzada de QA y PO.

### ¿Cómo controlamos tiempos y foco?
Con GSD: bloques cortos, un objetivo por bloque, evidencia obligatoria y WIP máximo de una tarea.

### ¿Cuándo diremos "estamos al 100%"?
Cuando no existan brechas críticas, todo el pipeline esté en verde y la funcionalidad sea equivalente a `main`.
