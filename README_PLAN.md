# Solicitudes Enrolamiento FS

## Estado actual
- Flujo unico WebForms con validaciones por formulario `101/61/62/63/64`.
- Sin flujo de borrador; solo envio final.
- Beneficiarios y dependientes dinamicos con reglas de negocio.

## Documentacion clave
- `01_analisis/matriz_campos_v1.md`
- `02_diseno_funcional/flujo_wizard.md`
- `03_webforms_net451/SolicitudElectronica.aspx`
- `03_webforms_net451/App_Code/Solicitudes/ClassSolicitudValidacion.vb`
- `05_pruebas/matriz_validaciones/resultado_validacion_pantallas.md`
- `05_pruebas/matriz_validaciones/casos_regresion_extendidos.md`
- `06_documentacion/security_hardening.md`

## Reglas implementadas
- Campos obligatorios con `*`.
- Tooltips RT por campo.
- Salud oculta para formulario `101`.
- Vida y contingencia con suma exacta `100%`.
- Dependientes con genero `M/F`.
- Fecha con selector sin edicion manual por teclado.
- Decimales normalizados para estatura, peso y sueldo.
