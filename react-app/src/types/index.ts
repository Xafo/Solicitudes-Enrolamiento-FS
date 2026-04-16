export type Step = 1 | 2 | 3 | 4 | 5 | 6

export type ValidationError = {
  message: string
  fieldId: string
  stepNumber: number
}

export type DynamicRow = {
  id: string
  nombre: string
  parentesco: string
  fecha: string
  porcentaje: string
}

export type DepRow = {
  id: string
  nombre: string
  parentesco: string
  genero: string
  fecha: string
  peso: string
  estatura: string
}

export type QuestionRow = {
  id: string
  text: string
  answer: string
  enfermedad: string
  medico: string
  cuando: string
  paciente: string
}

export type MedRow = {
  id: string
  asegurado: string
  diagnostico: string
  medicamento: string
  dosis: string
  desde: string
  hasta: string
}

export type FormData = {
  tipoFormulario: string
  nombreContratante: string
  numeroPoliza: string
  sumaAsegurada: string
  primerApellido: string
  segundoApellido: string
  primerNombre: string
  segundoNombre: string
  tipoDocumento: string
  numeroDocumento: string
  lugarNacimiento: string
  nacionalidad: string
  profesionOficio: string
  estaturaMetros: string
  pesoLibras: string
  sexo: string
  cargoDesempena: string
  sueldoMensual: string
  pais: string
  departamento: string
  ciudad: string
  municipio: string
  calle: string
  avenida: string
  celular: string
  email: string
  tomaMedicamentos: string
  aceptaDeclaracion: boolean
  firmaSolicitante: string
  firmaPatrono: string
  fechaFirma: string
  observacionesFinales: string
}

export type FormOption = {
  value: string
  label: string
}

export type Question = {
  id: string
  text: string
}
