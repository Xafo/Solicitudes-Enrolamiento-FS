import { useMemo } from 'react'
import { useFormStore } from '../../store'
import { InputField, SelectField, Button } from '../ui'
import { parentescos, generos } from '../../constants'
import { hasDependents, parseDecimal, normalizeDecimal } from '../../utils'
import type { DynamicRow, DepRow } from '../../types'

function BeneficiaryTable({
  title,
  rows,
  onAdd,
  onRemove,
  onUpdate,
  bodyId,
  totalClass,
}: {
  title: string
  rows: DynamicRow[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, key: keyof DynamicRow, value: string) => void
  bodyId: string
  totalClass: string
}) {
  const { errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  const total = useMemo(
    () => rows.reduce((acc, row) => acc + parseDecimal(row.porcentaje), 0),
    [rows]
  )

  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table className="table-grid">
          <thead>
            <tr>
              <th>Nombre completo</th>
              <th>Parentesco</th>
              <th>Fecha nacimiento</th>
              <th>Porcentaje*</th>
              <th></th>
            </tr>
          </thead>
          <tbody id={bodyId} className={hasError(bodyId) ? 'field-error-area' : ''}>
            {rows.map((row) => (
              <tr key={row.id}>
                <td><InputField value={row.nombre} onChange={(e) => onUpdate(row.id, 'nombre', e.target.value)} /></td>
                <td>
                  <SelectField
                    options={[{ value: '', label: 'Seleccione...' }, ...parentescos.map((p) => ({ value: p, label: p }))]}
                    value={row.parentesco}
                    onChange={(e) => onUpdate(row.id, 'parentesco', e.target.value)}
                  />
                </td>
                <td>
                  <input type="date" className="input" value={row.fecha} onChange={(e) => onUpdate(row.id, 'fecha', e.target.value)} />
                </td>
                <td>
                  <InputField
                    type="text" inputMode="decimal" value={row.porcentaje}
                    onChange={(e) => onUpdate(row.id, 'porcentaje', e.target.value)}
                    onBlur={(e) => onUpdate(row.id, 'porcentaje', normalizeDecimal(e.target.value))}
                  />
                </td>
                <td><Button variant="light" size="small" onClick={() => onRemove(row.id)}>Quitar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row-actions">
        <Button variant="light" size="small" onClick={onAdd}>Agregar beneficiario</Button>
        <p className={`total${hasError(totalClass) ? ' field-error-text' : ''}`}>
          Total: {total.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

function DependentsTable() {
  const { formData, depRows, addDepRow, updateDepRow, removeDepRow, errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  if (!hasDependents(formData.tipoFormulario)) return null

  return (
    <div className="card">
      <h3>Dependientes económicos</h3>
      <div className="table-wrap">
        <table className="table-grid">
          <thead>
            <tr>
              <th>Nombre completo</th>
              <th>Parentesco</th>
              <th>Género</th>
              <th>Fecha nacimiento</th>
              <th>Peso (Lbs)</th>
              <th>Estatura (m)</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="bodyDep" className={hasError('bodyDep') ? 'field-error-area' : ''}>
            {depRows.map((row: DepRow) => (
              <tr key={row.id}>
                <td><InputField value={row.nombre} onChange={(e) => updateDepRow(row.id, 'nombre', e.target.value)} /></td>
                <td>
                  <SelectField
                    options={[{ value: '', label: 'Seleccione...' }, ...parentescos.map((p) => ({ value: p, label: p }))]}
                    value={row.parentesco}
                    onChange={(e) => updateDepRow(row.id, 'parentesco', e.target.value)}
                  />
                </td>
                <td>
                  <SelectField options={generos} value={row.genero} onChange={(e) => updateDepRow(row.id, 'genero', e.target.value)} />
                </td>
                <td><input type="date" className="input" value={row.fecha} onChange={(e) => updateDepRow(row.id, 'fecha', e.target.value)} /></td>
                <td>
                  <InputField type="text" inputMode="decimal" value={row.peso}
                    onChange={(e) => updateDepRow(row.id, 'peso', e.target.value)}
                    onBlur={(e) => updateDepRow(row.id, 'peso', normalizeDecimal(e.target.value))}
                  />
                </td>
                <td>
                  <InputField type="text" inputMode="decimal" value={row.estatura}
                    onChange={(e) => updateDepRow(row.id, 'estatura', e.target.value)}
                    onBlur={(e) => updateDepRow(row.id, 'estatura', normalizeDecimal(e.target.value))}
                  />
                </td>
                <td><Button variant="light" size="small" onClick={() => removeDepRow(row.id)}>Quitar</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row-actions">
        <Button variant="light" size="small" onClick={addDepRow}>Agregar dependiente</Button>
      </div>
    </div>
  )
}

export function Step4_Beneficiarios() {
  const { vidaRows, contRows, addVidaRow, updateVidaRow, removeVidaRow, addContRow, updateContRow, removeContRow } = useFormStore()

  return (
    <>
      <h2>Beneficiarios y dependientes</h2>
      <BeneficiaryTable
        title="Beneficiarios del seguro de vida"
        rows={vidaRows}
        onAdd={addVidaRow}
        onRemove={removeVidaRow}
        onUpdate={updateVidaRow}
        bodyId="bodyVida"
        totalClass="hfTotalVida"
      />
      <BeneficiaryTable
        title="Beneficiarios de contingencia"
        rows={contRows}
        onAdd={addContRow}
        onRemove={removeContRow}
        onUpdate={updateContRow}
        bodyId="bodyCont"
        totalClass="hfTotalCont"
      />
      <DependentsTable />
    </>
  )
}
