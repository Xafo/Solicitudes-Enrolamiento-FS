import { useFormStore } from '../../store'
import { InputField, SelectField } from '../ui'
import { tiposDocumento, generos } from '../../constants'
import { normalizeDecimal } from '../../utils'

export function Step2_Asegurado() {
  const { formData, updateForm, errors } = useFormStore()

  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  return (
    <section className="border border-gray-200 rounded-xl p-6 mb-4">
      <h2 className="text-lg font-semibold text-ficohsa-blue mb-4">Datos generales del asegurado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Primer apellido"
          value={formData.primerApellido}
          onChange={(e) => updateForm('primerApellido', e.target.value)}
          maxLength={60}
          error={hasError('txtPrimerApellido')}
          required
        />
        <InputField
          label="Segundo apellido"
          value={formData.segundoApellido}
          onChange={(e) => updateForm('segundoApellido', e.target.value)}
          maxLength={60}
        />
        <InputField
          label="Primer nombre"
          value={formData.primerNombre}
          onChange={(e) => updateForm('primerNombre', e.target.value)}
          maxLength={60}
          error={hasError('txtPrimerNombre')}
          required
        />
        <InputField
          label="Segundo nombre"
          value={formData.segundoNombre}
          onChange={(e) => updateForm('segundoNombre', e.target.value)}
          maxLength={60}
        />
        <SelectField
          label="Tipo documento"
          options={tiposDocumento}
          value={formData.tipoDocumento}
          onChange={(e) => updateForm('tipoDocumento', e.target.value)}
          error={hasError('ddlTipoDocumento')}
          required
        />
        <InputField
          label="No. identificación"
          value={formData.numeroDocumento}
          onChange={(e) => updateForm('numeroDocumento', e.target.value)}
          maxLength={30}
          error={hasError('txtNumeroDocumento')}
          required
        />
        <InputField
          label="Lugar de nacimiento"
          value={formData.lugarNacimiento}
          onChange={(e) => updateForm('lugarNacimiento', e.target.value)}
          maxLength={120}
          error={hasError('txtLugarNacimiento')}
          required
        />
        <InputField
          label="Nacionalidad"
          value={formData.nacionalidad}
          onChange={(e) => updateForm('nacionalidad', e.target.value)}
          maxLength={80}
          error={hasError('txtNacionalidad')}
          required
        />
        <InputField
          label="Profesión u oficio"
          value={formData.profesionOficio}
          onChange={(e) => updateForm('profesionOficio', e.target.value)}
          maxLength={120}
          error={hasError('txtProfesionOficio')}
          required
        />
        <InputField
          label="Estatura en metros"
          type="text"
          inputMode="decimal"
          value={formData.estaturaMetros}
          onChange={(e) => updateForm('estaturaMetros', e.target.value)}
          onBlur={(e) => updateForm('estaturaMetros', normalizeDecimal(e.target.value))}
          maxLength={10}
          error={hasError('txtEstaturaMetros')}
          required
        />
        <InputField
          label="Peso en libras"
          type="text"
          inputMode="decimal"
          value={formData.pesoLibras}
          onChange={(e) => updateForm('pesoLibras', e.target.value)}
          onBlur={(e) => updateForm('pesoLibras', normalizeDecimal(e.target.value))}
          maxLength={10}
          error={hasError('txtPesoLibras')}
          required
        />
        <SelectField
          label="Sexo"
          options={generos}
          value={formData.sexo}
          onChange={(e) => updateForm('sexo', e.target.value)}
          error={hasError('ddlSexo')}
          required
        />
        <InputField
          label="Cargo que desempeña"
          value={formData.cargoDesempena}
          onChange={(e) => updateForm('cargoDesempena', e.target.value)}
          maxLength={120}
          error={hasError('txtCargoDesempena')}
          required
        />
        <InputField
          label="Sueldo mensual"
          type="text"
          inputMode="decimal"
          value={formData.sueldoMensual}
          onChange={(e) => updateForm('sueldoMensual', e.target.value)}
          onBlur={(e) => updateForm('sueldoMensual', normalizeDecimal(e.target.value))}
          maxLength={18}
          error={hasError('txtSueldoMensual')}
          required
        />
      </div>
    </section>
  )
}
