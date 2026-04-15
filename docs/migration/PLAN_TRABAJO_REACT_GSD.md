# Plan de trabajo: migración funcional a React (metodología GSD)

## Resumen ejecutivo
Este plan propone migrar la solución actual a React sin perder funcionalidad respecto a `origin/main`.
La estrategia es de **paridad funcional 1:1**: primero replicamos comportamiento y reglas de negocio; después optimizamos arquitectura y experiencia.

## Objetivo principal
Modernizar el frontend a React, manteniendo el mismo flujo funcional, las mismas validaciones y los mismos mensajes que hoy existen en WebForms (.NET 4.5.1).

## Alcance
- Migración del wizard de 6 pasos a React.
- Paridad de reglas por formulario (`101`, `61`, `62`, `63`, `64`).
- Paridad de validaciones de campos, mensajes y enfoque en errores.
- Paridad de comportamiento dinámico: beneficiarios, dependientes, salud y medicamentos.
- Pipeline de integración continua para validar build y pruebas en cada cambio.

## Fuera de alcance (por ahora)
- Rediseño visual profundo de la interfaz.
- Cambios de reglas de negocio existentes.
- Replanteamiento de flujos funcionales aprobados en `main`.

## Principios de ejecución
1. **Paridad primero, mejora después**.
2. **Una sola fuente de verdad**: `origin/main`.
3. **Cero ambigüedad en aceptación**: matriz de paridad y criterios por paso.
4. **Evidencia por bloque**: cada avance deja trazabilidad.

## Metodología GSD (GetShitDone)
- Bloques de 60 a 90 minutos.
- Un objetivo por bloque.
- WIP máximo: una tarea en `Doing`.
- Cierre obligatorio por bloque:
  - Qué se hizo.
  - Qué falta.
  - Qué bloquea.
  - Siguiente acción concreta.
- Semáforo diario:
  - Verde: ejecutable.
  - Amarillo: riesgo.
  - Rojo: bloqueo externo.

## Tablero operativo sugerido
`Inbox -> Next -> Doing -> Verify -> Done -> Blocked`

Etiquetas recomendadas: `arch`, `web`, `validation`, `data`, `ops`, `risk`.

## Fases de trabajo

### Fase P0: línea base de paridad
**Objetivo**: congelar el contrato funcional actual.

Entregables:
- `PARITY_MATRIX_REACT.md` con reglas no negociables.
- Criterios de aceptación por cada paso del wizard.
- Registro de riesgos iniciales con dueño.

### Fase P1: traslado del contrato funcional
**Objetivo**: portar a C# moderno el contrato funcional existente.

Entregables:
- DTO equivalente al legado.
- Sanitización y parseo equivalentes.
- Validaciones equivalentes a `ClassSolicitudValidacion.vb`.

### Fase P2: implementación de UI React con paridad 1:1
**Objetivo**: replicar comportamiento del frontend legacy.

Entregables:
- Wizard React de 6 pasos.
- Navegación por stepper (clic y teclado).
- Reglas condicionales por tipo de formulario.
- Filas dinámicas de beneficiarios, dependientes y medicamentos.
- Totales de vida y contingencia con suma exacta de 100%.
- Serialización JSON equivalente a hidden fields.

### Fase P3: integración técnica y pipeline
**Objetivo**: asegurar calidad técnica continua.

Entregables:
- Pipeline GitHub para `REACT` y PR a `main`.
- Jobs mínimos: `restore/install`, `build`, `test`.
- Validación automática de calidad antes de merge.

### Fase P4: regresión y cierre
**Objetivo**: certificar que no hubo pérdida funcional.

Entregables:
- Ejecución de matriz de regresión completa.
- Cierre de defectos críticos y altos.
- Acta de aprobación conjunta (PO + QA + Dev Sr).

## Roles y responsabilidades (subagentes)

### PO (Product Owner)
- Define alcance y criterios de aceptación.
- Prioriza backlog y aprueba cierres funcionales.
- Decide excepciones de negocio, si existieran.

### Dev
- Implementa la migración por bloques GSD.
- Mantiene paridad funcional y evidencia técnica.
- Corrige defectos reportados por QA.

### Dev Sr
- Define arquitectura, estándares y guardrails.
- Revisa cambios críticos y habilita paso a QA.
- Desbloquea decisiones técnicas de alto impacto.

### QA
- Diseña y ejecuta regresión funcional.
- Certifica paridad contra `main` con evidencia.
- Habilita salida a producción según criterios definidos.

## Pipeline GitHub propuesto
- Trigger en `push` a `REACT`.
- Trigger en `pull_request` hacia `main`.
- Etapas mínimas:
  - Restauración de dependencias.
  - Build.
  - Pruebas unitarias e integración.
  - (Opcional) smoke de paridad funcional.

## Criterios de éxito (definición de 100%)
- Build y pruebas en verde.
- Cero brechas críticas en la matriz de paridad.
- Flujo React funcionalmente equivalente a `origin/main`.
- Aprobación formal de PO, Dev Sr y QA.

## Riesgos clave y mitigación
- **Reglas implícitas del frontend legacy**.
  - Mitigación: port directo del comportamiento y pruebas por caso.
- **Desfase entre validación cliente y servidor**.
  - Mitigación: una única fuente de verdad para reglas críticas.
- **Dependencias de datos no documentadas**.
  - Mitigación: contratos explícitos y pruebas tempranas.

## Próximos pasos inmediatos
1. Crear y validar `PARITY_MATRIX_REACT.md` con PO y QA.
2. Configurar pipeline base de CI para la rama `REACT`.
3. Iniciar sprint de port del wizard con bloques GSD.
