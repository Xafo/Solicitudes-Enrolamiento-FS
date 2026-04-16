import { useFormStore } from '../../store'
import { SelectField, Button, Card } from '../ui'
import { siNoOptions } from '../../constants'
import { isShortHealthForm, isLongHealthForm } from '../../utils'
import type { QuestionRow, MedRow } from '../../types'

function QuestionCard({
  question,
  row,
  onUpdate,
}: {
  question: { id: string; text: string }
  row: QuestionRow
  onUpdate: (id: string, key: keyof QuestionRow, value: string) => void
}) {
  return (
    <div className="bg-slate-50 border border-gray-200 rounded-xl p-3 mb-3">
      <div className="flex flex-col gap-1.5">
        <label className="font-semibold text-sm">{question.text}</label>
        <SelectField
          options={siNoOptions}
          value={row.answer}
          onChange={(e) => onUpdate(question.id, 'answer', e.target.value)}
        />
      </div>
      
      {row.answer === 'SI' && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Especifique enfermedad</label>
              <input
                className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                value={row.enfermedad}
                onChange={(e) => onUpdate(question.id, 'enfermedad', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Nombre y dirección del médico tratante</label>
              <input
                className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                value={row.medico}
                onChange={(e) => onUpdate(question.id, 'medico', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">¿Cuándo?, duración, secuela?</label>
              <input
                className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                value={row.cuando}
                onChange={(e) => onUpdate(question.id, 'cuando', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Paciente/asegurado</label>
              <input
                className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                value={row.paciente}
                onChange={(e) => onUpdate(question.id, 'paciente', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ShortHealthForm() {
  const { shortHealthRows, updateShortQuestion } = useFormStore()

  return (
    <Card title="Cuestionario corto (61/62)">
      {shortHealthRows.map((row) => (
        <QuestionCard
          key={row.id}
          question={{ id: row.id, text: row.text }}
          row={row}
          onUpdate={updateShortQuestion}
        />
      ))}
    </Card>
  )
}

function LongHealthForm() {
  const { longHealthRows, updateLongQuestion, formData, updateForm, medRows, addMedRow, updateMedRow, removeMedRow, errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  const visibleQuestions = longHealthRows.filter(
    (q) => !q.id.startsWith('q4') || formData.sexo === 'F'
  )

  return (
    <Card title="Cuestionario largo (63/64)">
      {visibleQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          question={{ id: question.id, text: question.text }}
          row={longHealthRows.find((r) => r.id === question.id) || question}
          onUpdate={updateLongQuestion}
        />
      ))}

      <div className="mt-4">
        <SelectField
          label="¿Está tomando medicamentos en la actualidad?"
          options={siNoOptions}
          value={formData.tomaMedicamentos}
          onChange={(e) => updateForm('tomaMedicamentos', e.target.value)}
        />
      </div>

      {formData.tomaMedicamentos === 'SI' && (
        <Card title="Detalle de medicamentos" className="mt-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[800px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-gray-200 px-2 py-2 text-left">Nombre</th>
                  <th className="border border-gray-200 px-2 py-2 text-left">Diagnóstico</th>
                  <th className="border border-gray-200 px-2 py-2 text-left">Medicamento</th>
                  <th className="border border-gray-200 px-2 py-2 text-left">Dosis</th>
                  <th className="border border-gray-200 px-2 py-2 text-left">Desde</th>
                  <th className="border border-gray-200 px-2 py-2 text-left">Hasta</th>
                  <th className="border border-gray-200 px-2 py-2 w-16"></th>
                </tr>
              </thead>
              <tbody id="bodyMed" className={hasError('bodyMed') ? 'outline-2 outline-red-200' : ''}>
                {medRows.map((row: MedRow) => (
                  <tr key={row.id}>
                    <td className="border border-gray-200 p-1">
                      <input
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        value={row.asegurado}
                        onChange={(e) => updateMedRow(row.id, 'asegurado', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-1">
                      <input
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        value={row.diagnostico}
                        onChange={(e) => updateMedRow(row.id, 'diagnostico', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-1">
                      <input
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        value={row.medicamento}
                        onChange={(e) => updateMedRow(row.id, 'medicamento', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-1">
                      <input
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        value={row.dosis}
                        onChange={(e) => updateMedRow(row.id, 'dosis', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-1">
                      <input
                        type="date"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        value={row.desde}
                        onChange={(e) => updateMedRow(row.id, 'desde', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-1">
                      <input
                        type="date"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        value={row.hasta}
                        onChange={(e) => updateMedRow(row.id, 'hasta', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-1">
                      <Button variant="light" size="small" onClick={() => removeMedRow(row.id)}>
                        Quitar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2">
            <Button variant="light" size="small" onClick={addMedRow}>
              Agregar medicamento
            </Button>
          </div>
        </Card>
      )}
    </Card>
  )
}

export function Step5_Salud() {
  const { formData } = useFormStore()

  if (formData.tipoFormulario === '101') return null

  return (
    <section className="border border-gray-200 rounded-xl p-6 mb-4">
      <h2 className="text-lg font-semibold text-ficohsa-blue mb-4">Declaración de salud</h2>
      
      {isShortHealthForm(formData.tipoFormulario) && <ShortHealthForm />}
      {isLongHealthForm(formData.tipoFormulario) && <LongHealthForm />}
    </section>
  )
}
