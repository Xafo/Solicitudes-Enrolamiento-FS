# Matriz de campos v1 - Solicitudes electronicas

## Alcance
Formularios: `SPN-F.GTP-101`, `SPN-F.GTP-61`, `SPN-F.GTP-62`, `SPN-F.GTP-63`, `SPN-F.GTP-64`.

## Reglas globales cerradas
- Campos obligatorios se muestran con `*`.
- Comentarios RT se implementan solo como tooltip (icono de ayuda).
- Cuando la nota diga "segmentado", se interpreta como `dropdown` cargado al iniciar la pantalla.
- `apellidoCasada` se elimina en todos los formularios.
- `email` del asegurado es opcional.
- Direccion separada en `ciudad`, `municipio`, `calle`, `avenida`.
- Beneficiarios de vida deben sumar `100%`.
- Beneficiarios de contingencia deben sumar `100%`.
- Dependientes economicos incluyen columna `genero` (`M/F`).

## Matriz maestra
| Seccion | Campo tecnico | Etiqueta UI | Tipo UI | Obligatorio | Formularios | Validacion |
|---|---|---|---|---|---|---|
| Encabezado | tipoFormulario | Tipo de formulario* | Dropdown | Si | 101/61/62/63/64 | Valor en catalogo |
| Encabezado | nombreContratante | Nombre del contratante* | Textbox | Si | Todos | Longitud 3-120 |
| Encabezado | numeroPoliza | No. de Poliza* | Textbox | Si | Todos | Alfanumerico |
| Encabezado | sumaAsegurada | Suma asegurada* | Decimal | Si | Todos | > 0 |
| Encabezado | categoriaEmpleado | Categoria del empleado | Textbox | Segun formato | 101/61/62 | Longitud 1-80 |
| Encabezado | categoriaMaxVitalicio | Categoria/Maximo vitalicio | Textbox | Segun formato | 63/64 | Longitud 1-120 |
| Encabezado | seguroVidaOpcional | Seguro de vida opcional | Radio | No | 63/64 | Si/No |
| Encabezado | sumaAseguradaOpcional | Suma asegurada opcional | Decimal | Condicional | 63/64 | Requerido si seguroVidaOpcional=Si |
| Asegurado | primerApellido | Primer apellido* | Textbox | Si | Todos | Solo letras y simbolos permitidos |
| Asegurado | segundoApellido | Segundo apellido | Textbox | No | Todos | Opcional |
| Asegurado | primerNombre | Primer nombre* | Textbox | Si | Todos | Solo letras y simbolos permitidos |
| Asegurado | segundoNombre | Segundo nombre | Textbox | No | Todos | Opcional |
| Asegurado | tipoDocumento | Tipo de documento* | Dropdown | Si | Todos | DNI/Carnet/Pasaporte |
| Asegurado | numeroDocumento | No. identificacion* | Textbox | Si | Todos | Formato segun tipoDocumento |
| Asegurado | lugarNacimiento | Lugar de nacimiento* | Textbox | Si | Todos | Longitud 2-120 |
| Asegurado | nacionalidad | Nacionalidad* | Dropdown/Textbox | Si | Todos | Valor valido |
| Asegurado | fechaNacimiento | Fecha de nacimiento* | Date | Si | Todos | Fecha valida, no futura |
| Asegurado | edad | Edad* | Numero | Si | Todos | >= 0 y <= 120 |
| Asegurado | sexo | Sexo* | Dropdown | Si | Todos | M/F |
| Asegurado | estadoCivil | Estado civil* | Dropdown | Si | Todos | Valor en catalogo |
| Asegurado | profesionOficio | Profesion u oficio* | Textbox | Si | Todos | Longitud 2-120 |
| Asegurado | estaturaMetros | Estatura en metros* | Decimal | Si | 61/62/63/64 | Rango 0.5-2.5 |
| Asegurado | pesoLibras | Peso en libras* | Decimal | Si | 61/62/63/64 | Rango 20-600 |
| Asegurado | cargoDesempena | Cargo que desempena* | Textbox | Si | Todos | Longitud 2-120 |
| Asegurado | departamentoLaboral | Departamento | Textbox | No | 61/62 | Opcional |
| Asegurado | sucursal | Sucursal | Textbox | No | Todos | Opcional |
| Asegurado | fechaIngresoCompania | Fecha de ingreso/empleo | Date | Si | Todos | Fecha valida |
| Asegurado | sueldoMensual | Sueldo mensual* | Decimal | Si | Todos | >= 0 |
| Asegurado | afiliacionSeguroSocial | Numero afiliacion seguro social | Textbox | No | 61/62 | Opcional |
| Conyuge | nombreConyuge | Nombre | Textbox | No | 101/61/62 | Opcional |
| Conyuge | empresaConyuge | Empresa donde labora | Textbox | No | 101/61/62 | Opcional |
| Conyuge | celularConyuge | Celular | Textbox | No | 101/61/62 | Opcional |
| Conyuge | emailConyuge | E-mail | Textbox | No | 101/61/62 | Opcional |
| Direccion | pais | Pais* | Dropdown | Si | Todos | Catalogo pais |
| Direccion | departamento | Departamento* | Dropdown | Si | Todos | Catalogo por pais |
| Direccion | ciudad | Ciudad* | Dropdown | Si | Todos | Catalogo por departamento |
| Direccion | municipio | Municipio* | Dropdown | Si | Todos | Catalogo por departamento |
| Direccion | colonia | Colonia | Dropdown/Textbox | No | Todos | Opcional |
| Direccion | calle | Calle | Textbox | No | Todos | Opcional |
| Direccion | avenida | Avenida | Textbox | No | Todos | Opcional |
| Direccion | bloque | Bloque | Textbox | No | Todos | Opcional |
| Direccion | casaNo | Casa No. | Textbox | No | Todos | Opcional |
| Direccion | telefono | Telefono | Textbox | No | Todos | Opcional |
| Direccion | celular | Celular* | Textbox | Si | Todos | Formato telefono |
| Direccion | email | E-mail | Textbox | No | Todos | Formato email |
| Beneficiarios Vida | vida.nombreCompleto | Nombre completo* | Textbox | Si | Todos | Repetible |
| Beneficiarios Vida | vida.parentesco | Parentesco* | Dropdown | Si | Todos | Catalogo parentesco |
| Beneficiarios Vida | vida.fechaNacimiento | Fecha de nacimiento* | Date | Si | Todos | Fecha valida |
| Beneficiarios Vida | vida.porcentaje | Porcentaje* | Decimal | Si | Todos | 0 < x <= 100 |
| Beneficiarios Vida | vida.totalPorcentaje | Total porcentaje | Regla | Si | Todos | Suma exacta = 100 |
| Beneficiarios Contingencia | cont.nombreCompleto | Nombre completo* | Textbox | Si | Todos | Repetible |
| Beneficiarios Contingencia | cont.parentesco | Parentesco* | Dropdown | Si | Todos | Catalogo parentesco |
| Beneficiarios Contingencia | cont.fechaNacimiento | Fecha de nacimiento* | Date | Si | Todos | Fecha valida |
| Beneficiarios Contingencia | cont.porcentaje | Porcentaje* | Decimal | Si | Todos | 0 < x <= 100 |
| Beneficiarios Contingencia | cont.totalPorcentaje | Total porcentaje | Regla | Si | Todos | Suma exacta = 100 |
| Dependientes | dep.nombreCompleto | Nombre completo | Textbox | No | 101/63/64 | Repetible |
| Dependientes | dep.parentesco | Parentesco | Dropdown | No | 101/63/64 | Catalogo parentesco |
| Dependientes | dep.genero | Genero | Dropdown | No | 101/63/64 | M/F |
| Dependientes | dep.fechaNacimiento | Fecha de nacimiento | Date | No | 101/63/64 | Fecha valida |
| Dependientes | dep.pesoLibras | Peso (Libras) | Decimal | No | 63/64 | Opcional |
| Dependientes | dep.estaturaMetros | Estatura (Metros) | Decimal | No | 63/64 | Opcional |
| Salud 61/62 | saludCorta.p1..p4 | Preguntas salud corta | Si/No | Si | 61/62 | Si responde Si, requiere detalle |
| Salud 63/64 | saludLarga.q1..q5 | Cuestionario salud largo | Si/No | Si | 63/64 | Si responde Si, requiere detalle |
| Salud 63/64 | saludDetalle[] | Detalle preguntas afirmativas | Grid | Condicional | 63/64 | Requerido si hay respuesta Si |
| Salud 63/64 | medicamentosTiene | Toma medicamentos | Si/No | Si | 63/64 | Si=Si, requiere detalle |
| Salud 63/64 | medicamentos[] | Detalle medicamentos | Grid | Condicional | 63/64 | Al menos 1 fila si medicamentosTiene=Si |
| Consentimiento | aceptaDeclaracion | Aceptacion declaracion* | Checkbox | Si | Todos | Debe estar marcado |
| Consentimiento | firmaSolicitante | Firma solicitante* | Firma | Si | Todos | Requerido |
| Consentimiento | firmaPatrono | Firma y sello patrono* | Firma | Si | Todos | Requerido |
| Consentimiento | fechaFirma | Fecha* | Date | Si | Todos | Fecha valida |

## Tooltips base por RT (resumen)
- `numeroDocumento`: validar segun tipo de documento seleccionado.
- `ciudad` y `municipio`: mantener campos separados.
- `calle` y `avenida`: mantener campos separados.
- Campos obligatorios marcados en RT: mantener `*` y bloqueo de envio.

## Nota de implementacion
- Los textos finales de tooltip se centralizan en `catalogo_tooltips.md` y se consumen por clave de campo.
