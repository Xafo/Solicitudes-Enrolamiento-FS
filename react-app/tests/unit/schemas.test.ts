import { describe, it, expect } from 'vitest'
import { step1Schema, step2Schema, step3Schema, step6Schema } from '../../src/domain/schemas'

describe('Zod Schemas', () => {
  describe('step1Schema', () => {
    it('should validate valid step 1 data', () => {
      const validData = {
        tipoFormulario: '101',
        nombreContratante: 'Test Company',
        numeroPoliza: 'POL123',
        sumaAsegurada: '100000',
      }
      
      const result = step1Schema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject empty tipoFormulario', () => {
      const invalidData = {
        tipoFormulario: '',
        nombreContratante: 'Test',
        numeroPoliza: 'POL123',
        sumaAsegurada: '100',
      }
      
      const result = step1Schema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject zero or negative sumaAsegurada', () => {
      const invalidData = {
        tipoFormulario: '101',
        nombreContratante: 'Test',
        numeroPoliza: 'POL123',
        sumaAsegurada: '0',
      }
      
      const result = step1Schema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('step2Schema', () => {
    it('should validate valid step 2 data', () => {
      const validData = {
        primerApellido: 'Perez',
        primerNombre: 'Juan',
        tipoDocumento: 'DNI',
        numeroDocumento: '12345678',
        lugarNacimiento: 'Tegucigalpa',
        nacionalidad: 'Honduras',
        profesionOficio: 'Ingeniero',
        estaturaMetros: '1.70',
        pesoLibras: '180',
        sexo: 'M',
        cargoDesempena: 'Desarrollador',
        sueldoMensual: '50000',
      }
      
      const result = step2Schema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid estatura', () => {
      const invalidData = {
        primerApellido: 'Perez',
        primerNombre: 'Juan',
        tipoDocumento: 'DNI',
        numeroDocumento: '12345678',
        lugarNacimiento: 'Tegucigalpa',
        nacionalidad: 'Honduras',
        profesionOficio: 'Ingeniero',
        estaturaMetros: '3.00',
        pesoLibras: '180',
        sexo: 'M',
        cargoDesempena: 'Dev',
        sueldoMensual: '50000',
      }
      
      const result = step2Schema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject invalid peso', () => {
      const invalidData = {
        primerApellido: 'Perez',
        primerNombre: 'Juan',
        tipoDocumento: 'DNI',
        numeroDocumento: '12345678',
        lugarNacimiento: 'Tegucigalpa',
        nacionalidad: 'Honduras',
        profesionOficio: 'Ingeniero',
        estaturaMetros: '1.70',
        pesoLibras: '10',
        sexo: 'M',
        cargoDesempena: 'Dev',
        sueldoMensual: '50000',
      }
      
      const result = step2Schema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('step3Schema', () => {
    it('should validate valid step 3 data', () => {
      const validData = {
        pais: 'HN',
        departamento: 'FM',
        ciudad: 'TGU',
        municipio: 'DC',
        celular: '99999999',
        email: '',
      }
      
      const result = step3Schema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidData = {
        pais: 'HN',
        departamento: 'FM',
        ciudad: 'TGU',
        municipio: 'DC',
        celular: '99999999',
        email: 'invalid-email',
      }
      
      const result = step3Schema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('step6Schema', () => {
    it('should validate valid step 6 data', () => {
      const validData = {
        aceptaDeclaracion: true,
        firmaSolicitante: 'Juan Perez',
        firmaPatrono: 'Empresa ABC',
        fechaFirma: '2024-01-15',
      }
      
      const result = step6Schema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject when declaracion not accepted', () => {
      const invalidData = {
        aceptaDeclaracion: false,
        firmaSolicitante: 'Juan Perez',
        firmaPatrono: 'Empresa ABC',
        fechaFirma: '2024-01-15',
      }
      
      const result = step6Schema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
