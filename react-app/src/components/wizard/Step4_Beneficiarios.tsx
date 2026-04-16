import { useMemo } from 'react'
import { useFormStore } from '../../store'
import { InputField, SelectField, Button, Card } from '../ui'
import { parentescos, generos } from '../../constants'
import { hasDependents, parseDecimal, normalizeDecimal } from '../../utils'
import type { DynamicRow, DepRow } from '../../types'

function BeneficiaryTable({
  title,
  rows,
  onAdd,
  onRemove,
  onUpdate,
}: {
  title: string
  rows: DynamicRow[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, key: keyof DynamicRow, value: string) => void
  totalField: 'hfTotalVida' | 'hfTotalCont'
}) {
  const { errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  const total = useMemo(
    () => rows.reduce((acc, row) => acc + parseDecimal(row.porcentaje), 0),
    [rows]
  )

  const parentId = title.includes('vida') ? 'bodyVida' : 'bodyCont'

  return (
    <Card title={title}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-[700px]">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-gray-200 px-2 py-2 text-left">Nombre completo</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Parentesco</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Fecha nacimiento</th>
              <th className="border border-gray-200 px-2 py-2 text-left w-24">Porcentaje*</th>
              <th className="border border-gray-200 px-2 py-2 w-16"></th>
            </tr>
          </thead>
          <tbody id={parentId} className={hasError(parentId) ? 'outline-2 outline-red-200' : ''}>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-200 p-1">
                  <InputField
                    value={row.nombre}
                    onChange={(e) => onUpdate(row.id, 'nombre', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <SelectField
                    options={[{ value: '', label: 'Seleccione...' }, ...parentescos.map((p) => ({ value: p, label: p }))]}
                    value={row.parentesco}
                    onChange={(e) => onUpdate(row.id, 'parentesco', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                    value={row.fecha}
                    onChange={(e) => onUpdate(row.id, 'fecha', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <InputField
                    type="text"
                    inputMode="decimal"
                    value={row.porcentaje}
                    onChange={(e) => onUpdate(row.id, 'porcentaje', e.target.value)}
                    onBlur={(e) => onUpdate(row.id, 'porcentaje', normalizeDecimal(e.target.value))}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <Button variant="light" size="small" onClick={() => onRemove(row.id)}>
                    Quitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <Button variant="light" size="small" onClick={onAdd}>
          Agregar beneficiario
        </Button>
        <p className={`text-sm font-bold ${Number(total.toFixed(2)) !== 100 ? 'text-ficohsa-red' : 'text-green-600'}`}>
          Total: {total.toFixed(2)}%
        </p>
      </div>
    </Card>
  )
}

function DependentsTable() {
  const { formData, depRows, addDepRow, updateDepRow, removeDepRow, errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  if (!hasDependents(formData.tipoFormulario)) return null

  return (
    <Card title="Dependientes económicos">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-[900px]">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-gray-200 px-2 py-2 text-left">Nombre completo</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Parentesco</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Género</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Fecha nacimiento</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Peso (Lbs)</th>
              <th className="border border-gray-200 px-2 py-2 text-left">Estatura (m)</th>
              <th className="border border-gray-200 px-2 py-2 w-16"></th>
            </tr>
          </thead>
          <tbody id="bodyDep" className={hasError('bodyDep') ? 'outline-2 outline-red-200' : ''}>
            {depRows.map((row: DepRow) => (
              <tr key={row.id}>
                <td className="border border-gray-200 p-1">
                  <InputField
                    value={row.nombre}
                    onChange={(e) => updateDepRow(row.id, 'nombre', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <SelectField
                    options={[{ value: '', label: 'Seleccione...' }, ...parentescos.map((p) => ({ value: p, label: p }))]}
                    value={row.parentesco}
                    onChange={(e) => updateDepRow(row.id, 'parentesco', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <SelectField
                    options={generos}
                    value={row.genero}
                    onChange={(e) => updateDepRow(row.id, 'genero', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                    value={row.fecha}
                    onChange={(e) => updateDepRow(row.id, 'fecha', e.target.value)}
                  />
                </td>
                <td className="border border-gray-200 p-1 w-24">
                  <InputField
                    type="text"
                    inputMode="decimal"
                    value={row.peso}
                    onChange={(e) => updateDepRow(row.id, 'peso', e.target.value)}
                    onBlur={(e) => updateDepRow(row.id, 'peso', normalizeDecimal(e.target.value))}
                  />
                </td>
                <td className="border border-gray-200 p-1 w-24">
                  <InputField
                    type="text"
                    inputMode="decimal"
                    value={row.estatura}
                    onChange={(e) => updateDepRow(row.id, 'estatura', e.target.value)}
                    onBlur={(e) => updateDepRow(row.id, 'estatura', normalizeDecimal(e.target.value))}
                  />
                </td>
                <td className="border border-gray-200 p-1">
                  <Button variant="light" size="small" onClick={() => removeDepRow(row.id)}>
                    Quitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <Button variant="light" size="small" onClick={addDepRow}>
          Agregar dependiente
        </Button>
      </div>
    </Card>
  )
}

export function Step4_Beneficiarios() {
  const {
    vidaRows,
    contRows,
    addVidaRow,
    updateVidaRow,
    removeVidaRow,
    addContRow,
    updateContRow,
    removeContRow,
  } = useFormStore()

  return (
    <section className="border border-gray-200 rounded-xl p-6 mb-4">
      <h2 className="text-lg font-semibold text-ficohsa-blue mb-4">Beneficiarios y dependientes</h2>
      
      <BeneficiaryTable
        title="Beneficiarios del seguro de vida"
        rows={vidaRows}
        onAdd={addVidaRow}
        onRemove={removeVidaRow}
        onUpdate={updateVidaRow}
        totalField="hfTotalVida"
      />
      
      <BeneficiaryTable
        title="Beneficiarios de contingencia"
        rows={contRows}
        onAdd={addContRow}
        onRemove={removeContRow}
        onUpdate={updateContRow}
        totalField="hfTotalCont"
      />
      
      <DependentsTable />
    </section>
  )
}
