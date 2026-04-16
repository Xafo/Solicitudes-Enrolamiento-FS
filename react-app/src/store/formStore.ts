import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { FormData, Step, DynamicRow, DepRow, QuestionRow, MedRow, ValidationError } from '../types/index'
import { longQuestions, shortQuestions } from '../constants/questions'
import { newRowId, parseDecimal, hasAnyValue, isLongHealthForm, isShortHealthForm, hasDependents, normalizeDecimal, isFemaleQuestion } from '../utils'

const initialFormData: FormData = {
  tipoFormulario: '',
  nombreContratante: '',
  numeroPoliza: '',
  sumaAsegurada: '',
  primerApellido: '',
  segundoApellido: '',
  primerNombre: '',
  segundoNombre: '',
  tipoDocumento: '',
  numeroDocumento: '',
  lugarNacimiento: '',
  nacionalidad: '',
  profesionOficio: '',
  estaturaMetros: '',
  pesoLibras: '',
  sexo: '',
  cargoDesempena: '',
  sueldoMensual: '',
  pais: '',
  departamento: '',
  ciudad: '',
  municipio: '',
  calle: '',
  avenida: '',
  celular: '',
  email: '',
  tomaMedicamentos: '',
  aceptaDeclaracion: false,
  firmaSolicitante: '',
  firmaPatrono: '',
  fechaFirma: '',
  observacionesFinales: '',
}

const createQuestionRows = (questions: { id: string; text: string }[]): QuestionRow[] =>
  questions.map((q) => ({
    id: q.id,
    text: q.text,
    answer: '',
    enfermedad: '',
    medico: '',
    cuando: '',
    paciente: '',
  }))

const createDynamicRow = (): DynamicRow => ({ id: newRowId(), nombre: '', parentesco: '', fecha: '', porcentaje: '' })
const createDepRow = (): DepRow => ({ id: newRowId(), nombre: '', parentesco: '', genero: '', fecha: '', peso: '', estatura: '' })
const createMedRow = (): MedRow => ({ id: newRowId(), asegurado: '', diagnostico: '', medicamento: '', dosis: '', desde: '', hasta: '' })

interface FormStore {
  formData: FormData
  step: Step
  vidaRows: DynamicRow[]
  contRows: DynamicRow[]
  depRows: DepRow[]
  shortHealthRows: QuestionRow[]
  longHealthRows: QuestionRow[]
  medRows: MedRow[]
  errors: ValidationError[]
  message: string
  messageClass: 'ok' | 'error'

  updateForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  setStep: (step: Step) => void
  goNext: () => void
  goPrev: () => void
  resetForm: () => void
  
  addVidaRow: () => void
  updateVidaRow: (id: string, key: keyof DynamicRow, value: string) => void
  removeVidaRow: (id: string) => void
  
  addContRow: () => void
  updateContRow: (id: string, key: keyof DynamicRow, value: string) => void
  removeContRow: (id: string) => void
  
  addDepRow: () => void
  updateDepRow: (id: string, key: keyof DepRow, value: string) => void
  removeDepRow: (id: string) => void
  
  updateShortQuestion: (id: string, key: keyof QuestionRow, value: string) => void
  updateLongQuestion: (id: string, key: keyof QuestionRow, value: string) => void
  
  addMedRow: () => void
  updateMedRow: (id: string, key: keyof MedRow, value: string) => void
  removeMedRow: (id: string) => void
  
  setErrors: (errors: ValidationError[]) => void
  clearErrors: () => void
  setMessage: (message: string, type: 'ok' | 'error') => void
  clearMessage: () => void
  
  validate: () => ValidationError[]
  getVisibleSteps: () => Step[]
  getVisibleLongQuestions: () => { id: string; text: string }[]
  getSerializedData: () => Record<string, string>
}

export const useFormStore = create<FormStore>()(
  subscribeWithSelector((set, get) => ({
    formData: initialFormData,
    step: 1,
    vidaRows: [createDynamicRow()],
    contRows: [createDynamicRow()],
    depRows: [createDepRow()],
    shortHealthRows: createQuestionRows(shortQuestions),
    longHealthRows: createQuestionRows(longQuestions),
    medRows: [createMedRow()],
    errors: [],
    message: '',
    messageClass: 'ok',

    updateForm: (key, value) => set((state) => ({ formData: { ...state.formData, [key]: value } })),

    setStep: (step) => set({ step }),

    goNext: () => {
      const { step, getVisibleSteps } = get()
      const visibleSteps = getVisibleSteps()
      const index = visibleSteps.indexOf(step)
      if (index >= 0 && index < visibleSteps.length - 1) {
        set({ step: visibleSteps[index + 1] })
      }
    },

    goPrev: () => {
      const { step, getVisibleSteps } = get()
      const visibleSteps = getVisibleSteps()
      const index = visibleSteps.indexOf(step)
      if (index > 0) {
        set({ step: visibleSteps[index - 1] })
      }
    },

    resetForm: () => set({
      formData: initialFormData,
      step: 1,
      vidaRows: [createDynamicRow()],
      contRows: [createDynamicRow()],
      depRows: [createDepRow()],
      shortHealthRows: createQuestionRows(shortQuestions),
      longHealthRows: createQuestionRows(longQuestions),
      medRows: [createMedRow()],
      errors: [],
      message: '',
    }),

    addVidaRow: () => set((state) => ({ vidaRows: [...state.vidaRows, createDynamicRow()] })),
    updateVidaRow: (id, key, value) => set((state) => ({
      vidaRows: state.vidaRows.map((row) => row.id === id ? { ...row, [key]: value } : row)
    })),
    removeVidaRow: (id) => set((state) => {
      if (state.vidaRows.length === 1) return state
      return { vidaRows: state.vidaRows.filter((row) => row.id !== id) }
    }),

    addContRow: () => set((state) => ({ contRows: [...state.contRows, createDynamicRow()] })),
    updateContRow: (id, key, value) => set((state) => ({
      contRows: state.contRows.map((row) => row.id === id ? { ...row, [key]: value } : row)
    })),
    removeContRow: (id) => set((state) => {
      if (state.contRows.length === 1) return state
      return { contRows: state.contRows.filter((row) => row.id !== id) }
    }),

    addDepRow: () => set((state) => ({ depRows: [...state.depRows, createDepRow()] })),
    updateDepRow: (id, key, value) => set((state) => ({
      depRows: state.depRows.map((row) => row.id === id ? { ...row, [key]: value } : row)
    })),
    removeDepRow: (id) => set((state) => {
      if (state.depRows.length === 1) return state
      return { depRows: state.depRows.filter((row) => row.id !== id) }
    }),

    updateShortQuestion: (id, key, value) => set((state) => ({
      shortHealthRows: state.shortHealthRows.map((row) => {
        if (row.id !== id) return row
        if (key === 'answer' && value !== 'SI') {
          return { ...row, answer: value, enfermedad: '', medico: '', cuando: '', paciente: '' }
        }
        return { ...row, [key]: value }
      })
    })),

    updateLongQuestion: (id, key, value) => set((state) => ({
      longHealthRows: state.longHealthRows.map((row) => {
        if (row.id !== id) return row
        if (key === 'answer' && value !== 'SI') {
          return { ...row, answer: value, enfermedad: '', medico: '', cuando: '', paciente: '' }
        }
        return { ...row, [key]: value }
      })
    })),

    addMedRow: () => set((state) => ({ medRows: [...state.medRows, createMedRow()] })),
    updateMedRow: (id, key, value) => set((state) => ({
      medRows: state.medRows.map((row) => row.id === id ? { ...row, [key]: value } : row)
    })),
    removeMedRow: (id) => set((state) => {
      if (state.medRows.length === 1) return state
      return { medRows: state.medRows.filter((row) => row.id !== id) }
    }),

    setErrors: (errors) => set({ errors }),
    clearErrors: () => set({ errors: [] }),
    setMessage: (message, type) => set({ message, messageClass: type }),
    clearMessage: () => set({ message: '' }),

    getVisibleSteps: () => {
      const { tipoFormulario } = get().formData
      const steps: Step[] = [1, 2, 3, 4, 6]
      if (tipoFormulario !== '101') {
        steps.splice(4, 0, 5)
      }
      return steps
    },

    getVisibleLongQuestions: () => {
      const { longHealthRows, formData } = get()
      return longHealthRows.filter((q) => !isFemaleQuestion(q.id) || formData.sexo === 'F')
    },

    getSerializedData: () => {
      const { vidaRows, contRows, depRows, shortHealthRows, longHealthRows, medRows } = get()
      return {
        vida: JSON.stringify(vidaRows.filter((row) => hasAnyValue(row)).map((row) => ({
          nombre: row.nombre.trim(),
          parentesco: row.parentesco,
          fecha: row.fecha,
          porcentaje: normalizeDecimal(row.porcentaje),
        }))),
        cont: JSON.stringify(contRows.filter((row) => hasAnyValue(row)).map((row) => ({
          nombre: row.nombre.trim(),
          parentesco: row.parentesco,
          fecha: row.fecha,
          porcentaje: normalizeDecimal(row.porcentaje),
        }))),
        dep: JSON.stringify(depRows.filter((row) => hasAnyValue(row)).map((row) => ({
          nombre: row.nombre.trim(),
          parentesco: row.parentesco,
          genero: row.genero,
          fecha: row.fecha,
          peso: normalizeDecimal(row.peso),
          estatura: normalizeDecimal(row.estatura),
        }))),
        shortHealth: JSON.stringify(shortHealthRows),
        longHealth: JSON.stringify(longHealthRows),
        meds: JSON.stringify(medRows.filter((row) => hasAnyValue(row)).map((row) => ({
          asegurado: row.asegurado.trim(),
          diagnostico: row.diagnostico.trim(),
          medicamento: row.medicamento.trim(),
          dosis: row.dosis.trim(),
          desde: row.desde,
          hasta: row.hasta,
        }))),
      }
    },

    validate: () => {
      const errors: ValidationError[] = []
      const { formData, vidaRows, contRows, depRows, shortHealthRows, longHealthRows, medRows, getVisibleLongQuestions } = get()
      const visibleLongQuestions = getVisibleLongQuestions()
      const visibleLongQuestionIds = visibleLongQuestions.map((q) => q.id)

      // Step 1
      if (!formData.tipoFormulario) errors.push({ message: 'Seleccione tipo de formulario.', fieldId: 'ddlTipoFormulario', stepNumber: 1 })
      if (!formData.nombreContratante.trim()) errors.push({ message: 'Ingrese nombre del contratante.', fieldId: 'txtNombreContratante', stepNumber: 1 })
      if (!formData.numeroPoliza.trim()) errors.push({ message: 'Ingrese número de póliza.', fieldId: 'txtNumeroPoliza', stepNumber: 1 })
      if (parseDecimal(formData.sumaAsegurada) <= 0) errors.push({ message: 'Ingrese suma asegurada válida.', fieldId: 'txtSumaAsegurada', stepNumber: 1 })

      // Step 2
      if (!formData.primerApellido.trim()) errors.push({ message: 'Ingrese primer apellido.', fieldId: 'txtPrimerApellido', stepNumber: 2 })
      if (!formData.primerNombre.trim()) errors.push({ message: 'Ingrese primer nombre.', fieldId: 'txtPrimerNombre', stepNumber: 2 })
      if (!formData.tipoDocumento) errors.push({ message: 'Seleccione tipo de documento.', fieldId: 'ddlTipoDocumento', stepNumber: 2 })
      if (!formData.numeroDocumento.trim()) errors.push({ message: 'Ingrese número de identificación.', fieldId: 'txtNumeroDocumento', stepNumber: 2 })
      if (!formData.lugarNacimiento.trim()) errors.push({ message: 'Ingrese lugar de nacimiento.', fieldId: 'txtLugarNacimiento', stepNumber: 2 })
      if (!formData.nacionalidad.trim()) errors.push({ message: 'Ingrese nacionalidad.', fieldId: 'txtNacionalidad', stepNumber: 2 })
      if (!formData.profesionOficio.trim()) errors.push({ message: 'Ingrese profesión u oficio.', fieldId: 'txtProfesionOficio', stepNumber: 2 })
      if (parseDecimal(formData.estaturaMetros) < 0.5 || parseDecimal(formData.estaturaMetros) > 2.5) errors.push({ message: 'Estatura debe estar entre 0.50 y 2.50 metros.', fieldId: 'txtEstaturaMetros', stepNumber: 2 })
      if (parseDecimal(formData.pesoLibras) < 20 || parseDecimal(formData.pesoLibras) > 600) errors.push({ message: 'Peso debe estar entre 20 y 600 libras.', fieldId: 'txtPesoLibras', stepNumber: 2 })
      if (!formData.sexo) errors.push({ message: 'Seleccione sexo.', fieldId: 'ddlSexo', stepNumber: 2 })
      if (!formData.cargoDesempena.trim()) errors.push({ message: 'Ingrese cargo que desempeña.', fieldId: 'txtCargoDesempena', stepNumber: 2 })
      if (parseDecimal(formData.sueldoMensual) <= 0) errors.push({ message: 'Sueldo mensual inválido.', fieldId: 'txtSueldoMensual', stepNumber: 2 })

      // Step 3
      if (!formData.pais) errors.push({ message: 'Seleccione país.', fieldId: 'ddlPais', stepNumber: 3 })
      if (!formData.departamento) errors.push({ message: 'Seleccione departamento.', fieldId: 'ddlDepartamento', stepNumber: 3 })
      if (!formData.ciudad) errors.push({ message: 'Seleccione ciudad.', fieldId: 'ddlCiudad', stepNumber: 3 })
      if (!formData.municipio) errors.push({ message: 'Seleccione municipio.', fieldId: 'ddlMunicipio', stepNumber: 3 })
      if (!formData.celular.trim()) errors.push({ message: 'Ingrese celular.', fieldId: 'txtCelular', stepNumber: 3 })
      if (formData.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.push({ message: 'E-mail inválido.', fieldId: 'txtEmail', stepNumber: 3 })

      // Step 4 - Beneficiaries
      const nonEmptyVida = vidaRows.filter((row) => hasAnyValue(row))
      const nonEmptyCont = contRows.filter((row) => hasAnyValue(row))
      if (nonEmptyVida.length === 0) errors.push({ message: 'Agregue al menos un beneficiario de vida.', fieldId: 'bodyVida', stepNumber: 4 })
      if (nonEmptyCont.length === 0) errors.push({ message: 'Agregue al menos un beneficiario de contingencia.', fieldId: 'bodyCont', stepNumber: 4 })
      const totalVida = vidaRows.reduce((acc, row) => acc + parseDecimal(row.porcentaje), 0)
      const totalCont = contRows.reduce((acc, row) => acc + parseDecimal(row.porcentaje), 0)
      if (Number(totalVida.toFixed(2)) !== 100) errors.push({ message: 'Beneficiarios de vida deben sumar 100%.', fieldId: 'hfTotalVida', stepNumber: 4 })
      if (Number(totalCont.toFixed(2)) !== 100) errors.push({ message: 'Beneficiarios de contingencia deben sumar 100%.', fieldId: 'hfTotalCont', stepNumber: 4 })

      // Step 4 - Dependents
      if (hasDependents(formData.tipoFormulario)) {
        depRows.forEach((row) => {
          if (!hasAnyValue(row)) return
          if (!row.nombre.trim()) errors.push({ message: 'Dependiente con nombre vacío no es válido.', fieldId: 'bodyDep', stepNumber: 4 })
          if (!row.genero) errors.push({ message: 'Debe seleccionar género M/F para cada dependiente.', fieldId: 'bodyDep', stepNumber: 4 })
        })
      }

      // Step 5 - Short Health (61/62)
      if (isShortHealthForm(formData.tipoFormulario)) {
        shortHealthRows.forEach((row) => {
          if (!row.answer) {
            errors.push({ message: 'Todas las preguntas del cuestionario corto son obligatorias.', fieldId: 'saludCortaPreguntas', stepNumber: 5 })
          } else if (row.answer === 'SI' && (!row.enfermedad.trim() || !row.medico.trim() || !row.cuando.trim() || !row.paciente.trim())) {
            errors.push({ message: 'Complete el detalle para respuestas "Sí" en cuestionario corto.', fieldId: 'saludCortaPreguntas', stepNumber: 5 })
          }
        })
      }

      // Step 5 - Long Health (63/64)
      if (isLongHealthForm(formData.tipoFormulario)) {
        visibleLongQuestionIds.forEach((id) => {
          const row = longHealthRows.find((r) => r.id === id)
          if (!row?.answer) {
            errors.push({ message: 'Todas las preguntas del cuestionario largo son obligatorias.', fieldId: 'saludLargaPreguntas', stepNumber: 5 })
          } else if (row.answer === 'SI' && (!row.enfermedad.trim() || !row.medico.trim() || !row.cuando.trim() || !row.paciente.trim())) {
            errors.push({ message: 'Complete el detalle para respuestas "Sí" en cuestionario largo.', fieldId: 'saludLargaPreguntas', stepNumber: 5 })
          }
        })

        if (formData.tomaMedicamentos === 'SI') {
          const nonEmptyMeds = medRows.filter((row) => hasAnyValue(row))
          if (nonEmptyMeds.length === 0) errors.push({ message: 'Agregue al menos un medicamento.', fieldId: 'bodyMed', stepNumber: 5 })
          nonEmptyMeds.forEach((row) => {
            if (!row.asegurado.trim() || !row.diagnostico.trim() || !row.medicamento.trim() || !row.dosis.trim()) {
              errors.push({ message: 'Complete todos los campos de cada medicamento.', fieldId: 'bodyMed', stepNumber: 5 })
            }
            if (!row.desde || !row.hasta) {
              errors.push({ message: 'Fechas de medicamento inválidas.', fieldId: 'bodyMed', stepNumber: 5 })
            } else if (new Date(row.hasta) < new Date(row.desde)) {
              errors.push({ message: 'En medicamentos, "Hasta" no puede ser menor que "Desde".', fieldId: 'bodyMed', stepNumber: 5 })
            }
          })
        }
      }

      // Step 6
      if (!formData.aceptaDeclaracion) errors.push({ message: 'Debe aceptar la declaración legal.', fieldId: 'chkAceptaDeclaracion', stepNumber: 6 })
      if (!formData.firmaSolicitante.trim()) errors.push({ message: 'Ingrese firma del solicitante.', fieldId: 'txtFirmaSolicitante', stepNumber: 6 })
      if (!formData.firmaPatrono.trim()) errors.push({ message: 'Ingrese firma del patrono/contratante.', fieldId: 'txtFirmaPatrono', stepNumber: 6 })
      if (!formData.fechaFirma) errors.push({ message: 'Ingrese fecha de firma.', fieldId: 'txtFechaFirma', stepNumber: 6 })

      return errors
    },
  }))
)
