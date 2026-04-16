import { useFormStore } from '../../store'
import { InputField } from '../ui'

export function Step6_Consentimiento() {
  const { formData, updateForm, errors } = useFormStore()
  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  return (
    <>
      <h2>Consentimiento y firma</h2>
      <div className="card">
        <div className="field" style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="chkAceptaDeclaracion"
              checked={formData.aceptaDeclaracion}
              onChange={(e) => updateForm('aceptaDeclaracion', e.target.checked)}
            />
            <span className="font-semibold">Acepto la declaración legal <span className="required">*</span></span>
          </label>
        </div>

        <div className="two-col">
          <InputField
            label="Firma solicitante (nombre completo)"
            value={formData.firmaSolicitante}
            onChange={(e) => updateForm('firmaSolicitante', e.target.value)}
            maxLength={120}
            error={hasError('txtFirmaSolicitante')}
            required
          />
          <InputField
            label="Firma y sello patrono/contratante (nombre completo)"
            value={formData.firmaPatrono}
            onChange={(e) => updateForm('firmaPatrono', e.target.value)}
            maxLength={120}
            error={hasError('txtFirmaPatrono')}
            required
          />
          <InputField
            label="Fecha de firma"
            type="date"
            value={formData.fechaFirma}
            onChange={(e) => updateForm('fechaFirma', e.target.value)}
            error={hasError('txtFechaFirma')}
            required
          />
          <div className="field">
            <label>Observaciones</label>
            <textarea
              className="input"
              rows={3}
              value={formData.observacionesFinales}
              onChange={(e) => updateForm('observacionesFinales', e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
