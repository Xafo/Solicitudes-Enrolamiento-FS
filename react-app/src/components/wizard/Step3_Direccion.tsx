import { useFormStore } from '../../store'
import { InputField, SelectField } from '../ui'
import { paises, departamentos, ciudades, municipios } from '../../constants'

export function Step3_Direccion() {
  const { formData, updateForm, errors } = useFormStore()

  const hasError = (fieldId: string) => errors.some((e) => e.fieldId === fieldId)

  return (
    <section className="border border-gray-200 rounded-xl p-6 mb-4">
      <h2 className="text-lg font-semibold text-ficohsa-blue mb-4">Dirección del asegurado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="País"
          options={paises}
          value={formData.pais}
          onChange={(e) => updateForm('pais', e.target.value)}
          error={hasError('ddlPais')}
          required
        />
        <SelectField
          label="Departamento"
          options={departamentos}
          value={formData.departamento}
          onChange={(e) => updateForm('departamento', e.target.value)}
          error={hasError('ddlDepartamento')}
          required
        />
        <SelectField
          label="Ciudad"
          options={ciudades}
          value={formData.ciudad}
          onChange={(e) => updateForm('ciudad', e.target.value)}
          error={hasError('ddlCiudad')}
          required
        />
        <SelectField
          label="Municipio"
          options={municipios}
          value={formData.municipio}
          onChange={(e) => updateForm('municipio', e.target.value)}
          error={hasError('ddlMunicipio')}
          required
        />
        <InputField
          label="Calle"
          value={formData.calle}
          onChange={(e) => updateForm('calle', e.target.value)}
          maxLength={120}
        />
        <InputField
          label="Avenida"
          value={formData.avenida}
          onChange={(e) => updateForm('avenida', e.target.value)}
          maxLength={120}
        />
        <InputField
          label="Celular"
          value={formData.celular}
          onChange={(e) => updateForm('celular', e.target.value)}
          maxLength={20}
          error={hasError('txtCelular')}
          required
        />
        <InputField
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={(e) => updateForm('email', e.target.value)}
          maxLength={120}
          error={hasError('txtEmail')}
        />
      </div>
    </section>
  )
}
