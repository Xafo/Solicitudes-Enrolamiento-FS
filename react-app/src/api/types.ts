// Tipos para respuestas del API
export interface DropdownOption {
  value: string
  label: string
}

// Respuesta genérica del API
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Datos para INSERT inicial (Paso 1)
export interface FormularioInsert {
  telefonoOtp: string
  tipoFormulario: string
  nombreContratante: string
  numeroPoliza: string
  sumaAsegurada: string
}

// Datos para UPDATE (Pasos 2-6)
// TODO: Cambiar `unknown` por tipos específicos cuando el backend esté listo
export interface FormularioUpdate {
  telefonoOtp: string
  step: number
  data: Record<string, unknown>
}
