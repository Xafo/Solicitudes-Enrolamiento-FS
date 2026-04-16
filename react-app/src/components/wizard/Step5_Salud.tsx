import { useFormStore } from '../../store'
import { SelectField, Button } from '../ui'
import { siNoOptions } from '../../constants'
import { isShortHealthForm, isLongHealthForm } from '../../utils'
import type { QuestionRow, MedRow } from '../../types'

function QuestionCardComponent({
  question,
  row,
  onUpdate,
}: {
  question: { id: string; text: string }
  row: QuestionRow
  onUpdate: (id: string, key: keyof QuestionRow, value: string) => void
}) {
  return (
    <div className="question-card">
      <div className="field">
        <label className="font-semibold">{question.text}</label>
        <SelectField options={siNoOptions} value={row.answer} onChange={(e) => onUpdate(question.id, 'answer', e.target.value)} />
      </div>
      {row.answer === 'SI' && (
        <div className="question-detail">
          <div className="two-col">
            <div className="field">
              <label>Especifique enfermedad</label>
              <input className="input" value={row.enfermedad} onChange={(e) => onUpdate(question.id, 'enfermedad', e.target.value)} />
            </div>
            <div className="field">
              <label>Nombre y dirección del médico tratante</label>
              <input className="input" value={row.medico} onChange={(e) => onUpdate(question.id, 'medico', e.target.value)} />
            </div>
            <div className="field">
              <label>¿Cuándo?, duración, secuela?</label>
              <input className="input" value={row.cuando} onChange={(e) => onUpdate(question.id, 'cuando', e.target.value)} />
            </div>
            <div className="field">
              <label>Paciente/asegurado</label>
              <input className="input" value={row.paciente} onChange={(e) => onUpdate(question.id, 'paciente', e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ShortHealthForm() {
  const { shortHealthRows, updateShortQuestion, errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  return (
    <div className="card">
      <h3>Cuestionario corto (61/62)</h3>
      <div id="saludCortaPreguntas" className={hasError('saludCortaPreguntas') ? 'field-error-area' : ''}>
        {shortHealthRows.map((row) => (
          <QuestionCardComponent
            key={row.id}
            question={{ id: row.id, text: row.text }}
            row={row}
            onUpdate={updateShortQuestion}
          />
        ))}
      </div>
    </div>
  )
}

function LongHealthForm() {
  const { longHealthRows, updateLongQuestion, formData, updateForm, medRows, addMedRow, updateMedRow, removeMedRow, errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  const visibleQuestions = longHealthRows.filter((q) => !q.id.startsWith('q4') || formData.sexo === 'F')

  return (
    <div className="card">
      <h3>Ha tenido alguna vez o tiene usted, su cónyuque o sus hijos; alguna de las enfermedades o trastornos siguientes:</h3>
      <div id="saludLargaPreguntas" className={hasError('saludLargaPreguntas') ? 'field-error-area' : ''}>
        {visibleQuestions.map((question) => (
          <QuestionCardComponent
            key={question.id}
            question={{ id: question.id, text: question.text }}
            row={longHealthRows.find((r) => r.id === question.id) || question}
            onUpdate={updateLongQuestion}
          />
        ))}
      </div>

      <div className="field" style={{ marginTop: '16px' }}>
        <label>¿Está tomando medicamentos en la actualidad?</label>
        <SelectField options={siNoOptions} value={formData.tomaMedicamentos} onChange={(e) => updateForm('tomaMedicamentos', e.target.value)} />
      </div>

      {formData.tomaMedicamentos === 'SI' && (
        <div className="card">
          <h3>Detalle de medicamentos</h3>
          <div className="table-wrap">
            <table className="table-grid">
              <thead>
                <tr>
                  <th>Nombre del asegurado</th>
                  <th>Diagnóstico</th>
                  <th>Nombre del medicamento</th>
                  <th>Dosis</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="bodyMed" className={hasError('bodyMed') ? 'field-error-area' : ''}>
                {medRows.map((row: MedRow) => (
                  <tr key={row.id}>
                    <td><input className="input" value={row.asegurado} onChange={(e) => updateMedRow(row.id, 'asegurado', e.target.value)} /></td>
                    <td><input className="input" value={row.diagnostico} onChange={(e) => updateMedRow(row.id, 'diagnostico', e.target.value)} /></td>
                    <td><input className="input" value={row.medicamento} onChange={(e) => updateMedRow(row.id, 'medicamento', e.target.value)} /></td>
                    <td><input className="input" value={row.dosis} onChange={(e) => updateMedRow(row.id, 'dosis', e.target.value)} /></td>
                    <td><input type="date" className="input" value={row.desde} onChange={(e) => updateMedRow(row.id, 'desde', e.target.value)} /></td>
                    <td><input type="date" className="input" value={row.hasta} onChange={(e) => updateMedRow(row.id, 'hasta', e.target.value)} /></td>
                    <td><Button variant="light" size="small" onClick={() => removeMedRow(row.id)}>Quitar</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row-actions">
            <Button variant="light" size="small" onClick={addMedRow}>Agregar medicamento</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Step5_Salud() {
  const { formData } = useFormStore()

  if (formData.tipoFormulario === '101') return null

  return (
    <>
      <h2>Declaración de salud</h2>
      {isShortHealthForm(formData.tipoFormulario) && <ShortHealthForm />}
      {isLongHealthForm(formData.tipoFormulario) && <LongHealthForm />}
    </>
  )
}
