import { useFormStore } from '../../store'
import { InputField, Card } from '../ui'

export function Step6_Consentimiento() {
  const { formData, updateForm, errors } = useFormStore()

  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  return (
    <section className="border border-gray-200 rounded-xl p-6 mb-4">
      <h2 className="text-lg font-semibold text-ficohsa-blue mb-4">Consentimiento y firma</h2>
      
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="chkAceptaDeclaracion"
            checked={formData.aceptaDeclaracion}
            onChange={(e) => updateForm('aceptaDeclaracion', e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-ficohsa-blue focus:ring-ficohsa-blue"
          />
          <label htmlFor="chkAceptaDeclaracion" className="font-semibold">
            Acepto la declaración legal <span className="text-ficohsa-red">*</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-sm text-gray-700">Observaciones</label>
            <textarea
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 resize-y"
              rows={3}
              value={formData.observacionesFinales}
              onChange={(e) => updateForm('observacionesFinales', e.target.value)}
            />
          </div>
        </div>
      </Card>
    </section>
  )
}
