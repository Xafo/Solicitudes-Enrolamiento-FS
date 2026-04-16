import { z } from 'zod'

export const stringRequired = () => z.string().min(1, 'Este campo es requerido')

export const decimalSchema = () =>
  stringRequired().refine((val) => !isNaN(parseFloat(val)), 'Debe ser un número válido')

export const emailSchema = () =>
  z.string().refine(
    (val) => !val || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val),
    'E-mail inválido'
  )

export const step1Schema = z.object({
  tipoFormulario: stringRequired(),
  nombreContratante: stringRequired().max(120),
  numeroPoliza: stringRequired().max(40),
  sumaAsegurada: z.string().refine((val) => {
    const num = parseFloat(val.replace(',', '.'))
    return !isNaN(num) && num > 0
  }, 'La suma asegurada debe ser mayor a 0'),
})

export const step2Schema = z.object({
  primerApellido: stringRequired(),
  segundoApellido: z.string().optional(),
  primerNombre: stringRequired(),
  segundoNombre: z.string().optional(),
  tipoDocumento: stringRequired(),
  numeroDocumento: stringRequired(),
  lugarNacimiento: stringRequired(),
  nacionalidad: stringRequired(),
  profesionOficio: stringRequired(),
  estaturaMetros: z.string().refine((val) => {
    const num = parseFloat(val.replace(',', '.'))
    return !isNaN(num) && num >= 0.5 && num <= 2.5
  }, 'Estatura debe estar entre 0.50 y 2.50 metros'),
  pesoLibras: z.string().refine((val) => {
    const num = parseFloat(val.replace(',', '.'))
    return !isNaN(num) && num >= 20 && num <= 600
  }, 'Peso debe estar entre 20 y 600 libras'),
  sexo: stringRequired(),
  cargoDesempena: stringRequired(),
  sueldoMensual: z.string().refine((val) => {
    const num = parseFloat(val.replace(',', '.'))
    return !isNaN(num) && num > 0 && num <= 99999999
  }, 'Sueldo mensual inválido'),
})

export const step3Schema = z.object({
  pais: stringRequired(),
  departamento: stringRequired(),
  ciudad: stringRequired(),
  municipio: stringRequired(),
  celular: stringRequired(),
  email: emailSchema(),
  calle: z.string().optional(),
  avenida: z.string().optional(),
})

export const step6Schema = z.object({
  aceptaDeclaracion: z.boolean().refine((val) => val === true, 'Debe aceptar la declaración legal'),
  firmaSolicitante: stringRequired(),
  firmaPatrono: stringRequired(),
  fechaFirma: stringRequired(),
})
