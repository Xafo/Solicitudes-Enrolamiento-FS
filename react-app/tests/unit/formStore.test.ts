import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '../../src/store'

describe('FormStore', () => {
  beforeEach(() => {
    useFormStore.getState().resetForm()
  })

  describe('updateForm', () => {
    it('should update form data fields', () => {
      const { updateForm } = useFormStore.getState()
      
      updateForm('tipoFormulario', '101')
      expect(useFormStore.getState().formData.tipoFormulario).toBe('101')

      updateForm('nombreContratante', 'Test Company')
      expect(useFormStore.getState().formData.nombreContratante).toBe('Test Company')

      updateForm('sexo', 'F')
      expect(useFormStore.getState().formData.sexo).toBe('F')
    })

    it('should update boolean fields', () => {
      const { updateForm } = useFormStore.getState()
      
      updateForm('aceptaDeclaracion', true)
      expect(useFormStore.getState().formData.aceptaDeclaracion).toBe(true)
    })
  })

  describe('step navigation', () => {
    it('should navigate to next step', () => {
      const { goNext, step } = useFormStore.getState()
      const initialStep = step
      
      goNext()
      expect(useFormStore.getState().step).toBe(initialStep + 1)
    })

    it('should navigate to previous step', () => {
      const store = useFormStore.getState()
      store.setStep(3 as 1 | 2 | 3 | 4 | 5 | 6)
      
      store.goPrev()
      expect(useFormStore.getState().step).toBe(2)
    })

    it('should not go before first step', () => {
      const { goPrev, step } = useFormStore.getState()
      const initialStep = step
      
      goPrev()
      expect(useFormStore.getState().step).toBe(initialStep)
    })

    it('should respect visible steps', () => {
      const { updateForm, getVisibleSteps } = useFormStore.getState()
      
      updateForm('tipoFormulario', '101')
      const visibleSteps = getVisibleSteps()
      
      expect(visibleSteps).not.toContain(5)
      
      updateForm('tipoFormulario', '63')
      const visibleStepsWithHealth = getVisibleSteps()
      expect(visibleStepsWithHealth).toContain(5)
    })
  })

  describe('beneficiary rows', () => {
    it('should add vida row', () => {
      const { vidaRows, addVidaRow } = useFormStore.getState()
      const initialCount = vidaRows.length
      
      addVidaRow()
      expect(useFormStore.getState().vidaRows.length).toBe(initialCount + 1)
    })

    it('should remove vida row', () => {
      const { addVidaRow, removeVidaRow } = useFormStore.getState()
      
      addVidaRow()
      addVidaRow()
      const idToRemove = useFormStore.getState().vidaRows[1].id
      
      removeVidaRow(idToRemove)
      expect(useFormStore.getState().vidaRows.length).toBe(2)
    })

    it('should not remove last vida row', () => {
      const vidaRows = useFormStore.getState().vidaRows
      const { removeVidaRow } = useFormStore.getState()
      const lastRowId = vidaRows[0].id
      
      removeVidaRow(lastRowId)
      expect(useFormStore.getState().vidaRows.length).toBe(1)
    })
  })

  describe('validation', () => {
    it('should return errors for empty required fields', () => {
      const { validate } = useFormStore.getState()
      const errors = validate()
      
      expect(errors.length).toBeGreaterThan(0)
      expect(errors.some(e => e.fieldId === 'ddlTipoFormulario')).toBe(true)
      expect(errors.some(e => e.stepNumber === 1)).toBe(true)
    })

    it('should validate sex field when on health forms', () => {
      const { updateForm, validate } = useFormStore.getState()
      
      updateForm('tipoFormulario', '63')
      updateForm('primerApellido', 'Test')
      updateForm('primerNombre', 'User')
      updateForm('tipoDocumento', 'DNI')
      updateForm('numeroDocumento', '12345678')
      updateForm('lugarNacimiento', 'Honduras')
      updateForm('nacionalidad', 'Honduras')
      updateForm('profesionOficio', 'Engineer')
      updateForm('estaturaMetros', '1.70')
      updateForm('pesoLibras', '150')
      updateForm('sexo', '')
      updateForm('cargoDesempena', 'Developer')
      updateForm('sueldoMensual', '50000')
      updateForm('pais', 'HN')
      updateForm('departamento', 'FM')
      updateForm('ciudad', 'TGU')
      updateForm('municipio', 'DC')
      updateForm('celular', '99999999')
      updateForm('aceptaDeclaracion', true)
      updateForm('firmaSolicitante', 'Test')
      updateForm('firmaPatrono', 'Company')
      updateForm('fechaFirma', '2024-01-01')

      const errors = validate()
      expect(errors.some(e => e.fieldId === 'ddlSexo')).toBe(true)
    })

    it('should include female questions only when sexo is F', () => {
      const { updateForm, getVisibleLongQuestions } = useFormStore.getState()
      
      updateForm('tipoFormulario', '63')
      updateForm('sexo', 'M')
      
      let questions = getVisibleLongQuestions()
      expect(questions.filter(q => q.id.startsWith('q4')).length).toBe(0)
      
      updateForm('sexo', 'F')
      questions = getVisibleLongQuestions()
      expect(questions.filter(q => q.id.startsWith('q4')).length).toBe(4)
    })
  })

  describe('resetForm', () => {
    it('should reset all form data to initial state', () => {
      const { updateForm, addVidaRow, resetForm } = useFormStore.getState()
      
      updateForm('tipoFormulario', '101')
      updateForm('nombreContratante', 'Test Company')
      addVidaRow()
      addVidaRow()
      
      resetForm()
      
      const { formData, vidaRows } = useFormStore.getState()
      expect(formData.tipoFormulario).toBe('')
      expect(formData.nombreContratante).toBe('')
      expect(vidaRows.length).toBe(1)
    })
  })
})
