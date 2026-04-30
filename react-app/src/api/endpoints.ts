import { apiClient } from './client'
import type { ApiResponse, DropdownOption, FormularioInsert } from './types'

// === ENDPOINTS PARA DROPDOWNS ===
export const getPaises = () => apiClient<ApiResponse<DropdownOption[]>>('/catalog/paises')
export const getDepartamentos = (paisId?: string) => apiClient<ApiResponse<DropdownOption[]>>(`/catalog/departamentos?pais=${paisId || ''}`)
export const getCiudades = (deptId?: string) => apiClient<ApiResponse<DropdownOption[]>>(`/catalog/ciudades?dept=${deptId || ''}`)
export const getMunicipios = (ciudadId?: string) => apiClient<ApiResponse<DropdownOption[]>>(`/catalog/municipios?ciudad=${ciudadId || ''}`)
export const getParentescos = () => apiClient<ApiResponse<DropdownOption[]>>('/catalog/parentescos')
export const getNacionalidades = () => apiClient<ApiResponse<DropdownOption[]>>('/catalog/nacionalidades')
export const getProfesiones = () => apiClient<ApiResponse<DropdownOption[]>>('/catalog/profesiones')
export const getCargos = () => apiClient<ApiResponse<DropdownOption[]>>('/catalog/cargos')
export const getEnfermedades = () => apiClient<ApiResponse<DropdownOption[]>>('/catalog/enfermedades')

// === ENDPOINTS PARA FORMULARIO ===
export const insertFormulario = (data: FormularioInsert) => 
  apiClient<ApiResponse<void>>('/formulario', { method: 'POST', body: JSON.stringify(data) })

// TODO: Cambiar `unknown` por tipos específicos cuando el backend esté listo
export const updateFormulario = (telefonoOtp: string, step: number, data: Record<string, unknown>) => 
  apiClient<ApiResponse<void>>(`/formulario/${telefonoOtp}`, { method: 'PATCH', body: JSON.stringify({ step, data }) })
