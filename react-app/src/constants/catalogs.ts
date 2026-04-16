import type { FormOption } from '../types'

export const tiposFormulario: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: '101', label: 'SPN-F.GTP-101' },
  { value: '61', label: 'SPN-F.GTP-61' },
  { value: '62', label: 'SPN-F.GTP-62' },
  { value: '63', label: 'SPN-F.GTP-63' },
  { value: '64', label: 'SPN-F.GTP-64' },
]

export const tiposDocumento: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'DNI', label: 'DNI' },
  { value: 'CR', label: 'Carnet residencia' },
  { value: 'PAS', label: 'Pasaporte' },
]

export const siNoOptions: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'SI', label: 'Sí' },
  { value: 'NO', label: 'No' },
]

export const paises: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'HN', label: 'Honduras' },
]

export const departamentos: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'FM', label: 'Francisco Morazán' },
  { value: 'CT', label: 'Cortés' },
]

export const ciudades: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'TGU', label: 'Tegucigalpa' },
  { value: 'SPS', label: 'San Pedro Sula' },
]

export const municipios: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'DC', label: 'Distrito Central' },
  { value: 'SPS', label: 'San Pedro Sula' },
]

export const parentescos: string[] = ['Conyuge', 'Hijo', 'Padre', 'Madre', 'Hermano']

export const generos: FormOption[] = [
  { value: '', label: 'Seleccione...' },
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
]
