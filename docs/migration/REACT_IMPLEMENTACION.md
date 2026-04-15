# Implementación React ejecutada

## Estado actual
Se creó una aplicación React funcional en `react-app` que replica el wizard principal de `main` con enfoque de paridad funcional.

## Alcance implementado
- Wizard de 6 pasos con navegación por stepper, botón anterior y botón siguiente.
- Reglas condicionales por tipo de formulario:
  - Formulario `101` oculta paso de salud.
  - Formularios `61` y `62` muestran cuestionario corto.
  - Formularios `63` y `64` muestran cuestionario largo y medicamentos.
  - Dependientes visibles para `101`, `63` y `64`.
- Filas dinámicas para:
  - Beneficiarios de vida.
  - Beneficiarios de contingencia.
  - Dependientes económicos.
  - Medicamentos.
- Cálculo de totales de vida y contingencia con validación de suma exacta de 100%.
- Validación funcional principal por pasos (mensajes y enfoque al primer error).
- Serialización JSON equivalente a los hidden fields legacy (`vida`, `cont`, `dep`, salud y medicamentos).

## Pipeline GitHub
Se agregó el flujo `react-ci` en `.github/workflows/react-ci.yml` con:
- Instalación de dependencias.
- Lint.
- Build.

## Cómo ejecutar en local
```bash
cd react-app
npm install
npm run dev
```

## Verificación ejecutada
```bash
npm run lint
npm run build
```

Ambos comandos finalizaron correctamente.

## Siguientes pasos recomendados
1. Expandir validaciones para cubrir el 100% de casos de regresión documentados en `05_pruebas/matriz_validaciones`.
2. Incorporar pruebas automatizadas de interfaz para paridad (Playwright o Cypress).
3. Integrar persistencia backend real para el envío de solicitud.
