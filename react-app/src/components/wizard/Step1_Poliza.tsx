import { useFormStore } from '../../store'
import { InputField, SelectField } from '../ui'
import { tiposFormulario } from '../../constants'

export function Step1_Poliza() {
  const { formData, updateForm, errors } = useFormStore()

  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  return (
    <section className="border border-gray-200 rounded-xl p-6 mb-4">
      <h2 className="text-lg font-semibold text-ficohsa-blue mb-4">Datos de la Póliza</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Tipo de formulario"
          options={tiposFormulario}
          value={formData.tipoFormulario}
          onChange={(e) => updateForm('tipoFormulario', e.target.value)}
          error={hasError('ddlTipoFormulario')}
          required
        />
        <InputField
          label="Nombre del contratante"
          value={formData.nombreContratante}
          onChange={(e) => updateForm('nombreContratante', e.target.value)}
          maxLength={120}
          error={hasError('txtNombreContratante')}
          required
        />
        <InputField
          label="No. de póliza"
          value={formData.numeroPoliza}
          onChange={(e) => updateForm('numeroPoliza', e.target.value)}
          maxLength={40}
          error={hasError('txtNumeroPoliza')}
          required
        />
        <InputField
          label="Suma asegurada"
          type="text"
          inputMode="decimal"
          value={formData.sumaAsegurada}
          onChange={(e) => updateForm('sumaAsegurada', e.target.value)}
          onBlur={(e) => {
            const normalized = e.target.value.replace(',', '.').replace(/[^0-9.-]/g, '')
            const parsed = parseFloat(normalized)
            if (!isNaN(parsed)) {
              updateForm('sumaAsegurada', parsed.toFixed(2))
            }
          }}
          error={hasError('txtSumaAsegurada')}
          required
        />
      </div>
    </section>
  )
}
