// TODO: API - Descomentar useEffect cuando el backend esté listo
// import { useEffect } from 'react'
import { useMemo, useState, type Dispatch, type FormEventHandler, type SetStateAction } from 'react'
import ficohsaSegurosLogo from './assets/logo-ficohsa-seguros.svg'
// TODO: API - Descomentar cuando el backend esté listo
// import { getPaises, getDepartamentos, getCiudades, getMunicipios, getParentescos, getNacionalidades, getProfesiones, getCargos, getEnfermedades, insertFormulario, updateFormulario } from './api/endpoints'

type Step = 1 | 2 | 3 | 4 | 5 | 6

function ToggleControl({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const isSi = value === 'SI'
  return (
    <div className="toggle-control">
      <span className={`toggle-label${!isSi ? ' active' : ''}`}>NO</span>
      <div className="toggle-wrapper">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isSi}
            onChange={(e) => onChange(e.target.checked ? 'SI' : 'NO')}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
      <span className={`toggle-label${isSi ? ' active' : ''}`}>SÍ</span>
    </div>
  )
}

function getNombreAsegurado(formData: FormData): string {
  const nombre = [formData.primerNombre, formData.segundoNombre].filter(Boolean).join(' ')
  const apellido = [formData.primerApellido, formData.segundoApellido].filter(Boolean).join(' ')
  return [nombre, apellido].filter(Boolean).join(' ') || 'Asegurado'
}

function getOpcionesPaciente(formData: FormData, depRows: DepRow[]): { value: string; label: string }[] {
  const opciones: { value: string; label: string }[] = []
  
  const nombreAsegurado = getNombreAsegurado(formData)
  opciones.push({ value: nombreAsegurado, label: nombreAsegurado })
  
  depRows.forEach((dep) => {
    if (dep.nombre.trim()) {
      opciones.push({ value: dep.nombre.trim(), label: dep.nombre.trim() })
    }
  })
  
  return opciones
}

function PacienteSelect({
  value,
  onChange,
  opciones,
  disabled,
}: {
  value: string
  onChange: (val: string) => void
  opciones: { value: string; label: string }[]
  disabled?: boolean
}) {
  return (
    <select 
      className="input" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Seleccione...</option>
      {opciones.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

type QuestionDetailRow = {
  id: string
  enfermedad: string
  medico: string
  cuando: string
  paciente: string
}

type DynamicRow = {
  id: string
  nombre: string
  parentesco: string
  fecha: string
  porcentaje: string
}

type DepRow = {
  id: string
  nombre: string
  parentesco: string
  genero: string
  fecha: string
  peso: string
  estatura: string
}

type QuestionRow = {
  id: string
  text: string
  answer: string
  detalles: QuestionDetailRow[]
}

type MedRow = {
  id: string
  asegurado: string
  diagnostico: string
  medicamento: string
  dosis: string
  desde: string
  hasta: string
}

type ValidationError = {
  message: string
  fieldId: string
  stepNumber: Step
}

type FormData = {
  tipoFormulario: string
  nombreContratante: string
  numeroPoliza: string
  sumaAsegurada: string
  telefonoOtp: string
  otpCodigo: string
  otpEnviado: boolean
  otpVerificado: boolean
  primerApellido: string
  segundoApellido: string
  primerNombre: string
  segundoNombre: string
  tipoDocumento: string
  numeroDocumento: string
  lugarNacimiento: string
  nacionalidad: string
  profesionOficio: string
  estaturaMetros: string
  pesoLibras: string
  cargoDesempena: string
  sueldoMensual: string
  pais: string
  departamento: string
  ciudad: string
  municipio: string
  calle: string
  avenida: string
  celular: string
  email: string
  tomaMedicamentos: string
  aceptaDeclaracion: boolean
  firmaSolicitante: string
  firmaPatrono: string
  fechaFirma: string
  observacionesFinales: string
  sexo: string // 'M' || 'F'
}

const parentescos = ['Conyuge', 'Hijo', 'Padre', 'Madre', 'Hermano']
const generos = ['M', 'F']

const tiposFormulario = [
  { value: '', label: 'Seleccione...' },
  { value: '101', label: 'SPN-F.GTP-101 ' },
  { value: '61', label: 'SPN-F.GTP-61' },
  { value: '62', label: 'SPN-F.GTP-62' },
  { value: '63', label: 'SPN-F.GTP-63' },
  { value: '64', label: 'SPN-F.GTP-64' },
]

const tiposDocumento = [
  { value: '', label: 'Seleccione...' },
  { value: 'DNI', label: 'DNI' },
  { value: 'CR', label: 'Carnet residencia' },
  { value: 'PAS', label: 'Pasaporte' },
]

const siNoOptions = [
  { value: '', label: 'Seleccione...' },
  { value: 'SI', label: 'Sí' },
  { value: 'NO', label: 'No' },
]

const paises = [
  { value: '', label: 'Seleccione...' },
  { value: 'HN', label: 'Honduras' },
]

const departamentos = [
  { value: '', label: 'Seleccione...' },
  { value: 'FM', label: 'Francisco Morazán' },
  { value: 'CT', label: 'Cortés' },
]

const ciudades = [
  { value: '', label: 'Seleccione...' },
  { value: 'TGU', label: 'Tegucigalpa' },
  { value: 'SPS', label: 'San Pedro Sula' },
]

const municipios = [
  { value: '', label: 'Seleccione...' },
  { value: 'DC', label: 'Distrito Central' },
  { value: 'SPS', label: 'San Pedro Sula' },
]

const shortQuestions = [
  { id: 's1', text: '¿Ha sido víctima de accidente?' },
  { id: 's2', text: '¿Ha sido sometido a intervención quirúrgica?' },
  { id: 's3', text: '¿Su capacidad de trabajo ha sido reducida?' },
  { id: 's4', text: '¿Usa drogas de prescripción médica?' },
]

const longQuestions = [
  { id: 'q1a', text: '¿Enfermedades del corazón?' },
  { id: 'q1b', text: '¿Hipertensión arterial o circulatoria?' },
  { id: 'q1c', text: '¿Diabetes o problemas endocrinos?' },
  { id: 'q1d', text: '¿Enfermedades respiratorias crónicas?' },
  { id: 'q1e', text: '¿Trastornos neurológicos?' },
  { id: 'q1f', text: '¿Enfermedades renales o urinarias?' },
  { id: 'q1g', text: '¿Enfermedades digestivas crónicas?' },
  { id: 'q1h', text: '¿Enfermedades autoinmunes?' },
  { id: 'q1i', text: '¿Cáncer o tumores?' },
  { id: 'q1j', text: '¿Enfermedades de la sangre?' },
  { id: 'q1k', text: '¿Trastornos musculoesqueléticos graves?' },
  { id: 'q1l', text: '¿otra enfermedad relevante?' },
  { id: 'q2a', text: '¿Ha sido hospitalizado en los últimos 5 años?' },
  { id: 'q2b', text: '¿Se ha sometido a cirugías en los últimos 5 años?' },
  { id: 'q3', text: '¿Está actualmente bajo evaluación médica?' },
  { id: 'q4a', text: '¿Está embarazada actualmente?' },
  { id: 'q4b', text: '¿Tiene complicaciones ginecológicas?' },
  { id: 'q4c', text: '¿Ha tenido parto o aborto reciente?' },
  { id: 'q4d', text: '¿Tiene tratamiento hormonal actual?' },
  { id: 'q5', text: '¿Ha tenido diagnóstico positivo o secuelas por COVID-19?' },
]

const shortQuestionIds = ['s1', 's2', 's3', 's4']

const initialForm: FormData = {
  tipoFormulario: '',
  nombreContratante: '',
  numeroPoliza: '',
  sumaAsegurada: '',
  telefonoOtp: '',
  otpCodigo: '',
  otpEnviado: false,
  otpVerificado: false,
  primerApellido: '',
  segundoApellido: '',
  primerNombre: '',
  segundoNombre: '',
  tipoDocumento: '',
  numeroDocumento: '',
  lugarNacimiento: '',
  nacionalidad: '',
  profesionOficio: '',
  estaturaMetros: '',
  pesoLibras: '',
  cargoDesempena: '',
  sueldoMensual: '',
  pais: '',
  departamento: '',
  ciudad: '',
  municipio: '',
  calle: '',
  avenida: '',
  celular: '',
  email: '',
  tomaMedicamentos: '',
  aceptaDeclaracion: false,
  firmaSolicitante: '',
  firmaPatrono: '',
  fechaFirma: '',
  observacionesFinales: '',
  sexo: '',
}

const newRowId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const newDynamicRow = (): DynamicRow => ({
  id: newRowId(),
  nombre: '',
  parentesco: '',
  fecha: '',
  porcentaje: '',
})

const newDepRow = (): DepRow => ({
  id: newRowId(),
  nombre: '',
  parentesco: '',
  genero: '',
  fecha: '',
  peso: '',
  estatura: '',
})

const newQuestionRows = (questions: { id: string; text: string }[]): QuestionRow[] =>
  questions.map((question) => ({
    id: question.id,
    text: question.text,
    answer: 'NO',
    detalles: [],
  }))

const newQuestionDetailRow = (paciente = ''): QuestionDetailRow => ({
  id: newRowId(),
  enfermedad: '',
  medico: '',
  cuando: '',
  paciente,
})

const newMedRow = (): MedRow => ({
  id: newRowId(),
  asegurado: '',
  diagnostico: '',
  medicamento: '',
  dosis: '',
  desde: '',
  hasta: '',
})

const normalizeDecimal = (raw: string): string => {
  if (!raw) {
    return ''
  }

  const cleaned = raw.replace(/,/g, '.').replace(/[^0-9.-]/g, '')
  const parsed = Number(cleaned)
  return Number.isNaN(parsed) ? '' : parsed.toFixed(2)
}

const allowLettersExtended = (raw: string): string => raw.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s.,'\-/]/g, '')

const allowNumericDecimal = (raw: string): string => {
  const cleaned = raw.replace(/[^0-9.,]/g, '')
  const normalized = cleaned.replace(/,/g, '.')
  const [first, ...rest] = normalized.split('.')
  return rest.length > 0 ? `${first}.${rest.join('')}` : first
}

const allowPhoneDigits = (raw: string): string => raw.replace(/\D/g, '').slice(0, 15)

const applyDniMask = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 13)
  if (digits.length <= 4) return digits
  if (digits.length <= 8) return `${digits.slice(0, 4)}-${digits.slice(4)}`
  return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`
}

const normalizeEstatura = (raw: string): string => {
  const numeric = allowNumericDecimal(raw)
  if (!numeric) return ''
  const parsed = Number.parseFloat(numeric)
  if (Number.isNaN(parsed)) return ''
  const meters = parsed > 2.5 && parsed <= 250 ? parsed / 100 : parsed
  return meters.toFixed(2)
}

const parseDecimal = (raw: string): number => {
  if (!raw.trim()) {
    return 0
  }

  const normalized = raw.replace(',', '.')
  const parsed = Number.parseFloat(normalized)
  return Number.isNaN(parsed) ? 0 : Number(parsed.toFixed(2))
}

const isLongHealthForm = (formType: string) => formType === '63' || formType === '64'
const isShortHealthForm = (formType: string) => formType === '61' || formType === '62'
const hasDependents = (formType: string) => formType === '101' || formType === '63' || formType === '64'

const hasAnyValue = (obj: Record<string, string>) =>
  Object.values(obj).some((value) => value.trim() !== '')

function App() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [step, setStep] = useState<Step>(1)
  const [vidaRows, setVidaRows] = useState<DynamicRow[]>([newDynamicRow()])
  const [contRows, setContRows] = useState<DynamicRow[]>([newDynamicRow()])
  const [depRows, setDepRows] = useState<DepRow[]>([newDepRow()])
  const [shortHealthRows, setShortHealthRows] = useState<QuestionRow[]>(
    newQuestionRows(shortQuestions),
  )
  const [longHealthRows, setLongHealthRows] = useState<QuestionRow[]>(
    newQuestionRows(longQuestions),
  )
  const [medRows, setMedRows] = useState<MedRow[]>([newMedRow()])
  const [message, setMessage] = useState<string>('')
  const [messageClass, setMessageClass] = useState<'message ok' | 'message error'>('message ok')
  const [errors, setErrors] = useState<ValidationError[]>([])

  // TODO: API - Estados para dropdowns dinámicos (descomentar cuando el backend esté listo)
  // const [paisesOptions, setPaisesOptions] = useState<{ value: string; label: string }[]>([])
  // const [departamentosOptions, setDepartamentosOptions] = useState<{ value: string; label: string }[]>([])
  // const [ciudadesOptions, setCiudadesOptions] = useState<{ value: string; label: string }[]>([])
  // const [municipiosOptions, setMunicipiosOptions] = useState<{ value: string; label: string }[]>([])
  // const [parentescosOptions, setParentescosOptions] = useState<{ value: string; label: string }[]>([])
  // const [nacionalidadesOptions, setNacionalidadesOptions] = useState<{ value: string; label: string }[]>([])
  // const [profesionesOptions, setProfesionesOptions] = useState<{ value: string; label: string }[]>([])
  // const [cargosOptions, setCargosOptions] = useState<{ value: string; label: string }[]>([])
  // const [enfermedadesOptions, setEnfermedadesOptions] = useState<{ value: string; label: string }[]>([])

  // TODO: API - Cargar dropdowns al montar el componente (descomentar cuando el backend esté listo)
  // useEffect(() => {
  //   const loadDropdowns = async () => {
  //     try {
  //       const [paises, depts, ciudades, munis, parentescos, nacs, profs, cargos, enf] = await Promise.all([
  //         getPaises(),
  //         getDepartamentos(),
  //         getCiudades(),
  //         getMunicipios(),
  //         getParentescos(),
  //         getNacionalidades(),
  //         getProfesiones(),
  //         getCargos(),
  //         getEnfermedades(),
  //       ])
  //       setPaisesOptions(paises.data)
  //       setDepartamentosOptions(depts.data)
  //       setCiudadesOptions(ciudades.data)
  //       setMunicipiosOptions(munis.data)
  //       setParentescosOptions(parentescos.data)
  //       setNacionalidadesOptions(nacs.data)
  //       setProfesionesOptions(profs.data)
  //       setCargosOptions(cargos.data)
  //       setEnfermedadesOptions(enf.data)
  //     } catch (error) {
  //       console.error('Error cargando dropdowns:', error)
  //     }
  //   }
  //   loadDropdowns()
  // }, [])

  const totalVida = useMemo(
    () => vidaRows.reduce((acc, row) => acc + parseDecimal(row.porcentaje), 0),
    [vidaRows],
  )

  const totalCont = useMemo(
    () => contRows.reduce((acc, row) => acc + parseDecimal(row.porcentaje), 0),
    [contRows],
  )

  const visibleSteps = useMemo<Step[]>(() => {
    const steps: Step[] = [1, 2, 3, 4, 6]
    if (formData.tipoFormulario !== '101') {
      steps.splice(4, 0, 5)
    }
    return steps
  }, [formData.tipoFormulario])

  const fieldErrorSet = useMemo(() => new Set(errors.map((error) => error.fieldId)), [errors])

  const visibleLongQuestions = useMemo(() => {
    return longQuestions.filter((q) => !q.id.startsWith('q4') || formData.sexo === 'F')
  }, [formData.sexo])

  const visibleLongQuestionIds = useMemo(() => visibleLongQuestions.map((q) => q.id), [visibleLongQuestions])

  const applyFormTypeRules = (nextType: string) => {
    if (nextType === '101') {
      setShortHealthRows(newQuestionRows(shortQuestions))
      setLongHealthRows(newQuestionRows(longQuestions))
      setMedRows([newMedRow()])
      setFormData((current) => ({ ...current, tomaMedicamentos: '' }))
    }

    if (nextType === '61' || nextType === '62') {
      setLongHealthRows(newQuestionRows(longQuestions))
      setMedRows([newMedRow()])
      setFormData((current) => ({ ...current, tomaMedicamentos: '' }))
    }

    if (!hasDependents(nextType)) {
      setDepRows([newDepRow()])
    }

    if (!visibleSteps.includes(step)) {
      setStep(1)
    }
  }

  const goNext = () => {
    if (step === 1 && !formData.otpVerificado) {
      return
    }
    
    // TODO: API - UPDATE en base de datos antes de navegar
    // Llave primaria: formData.telefonoOtp
    // Endpoint: PATCH /api/formulario/:telefonoOtp
    // Enviar datos del paso actual
    // try {
    //   await updateFormulario(formData.telefonoOtp, step, getCurrentStepData())
    // } catch (error) {
    //   setMessageClass('message error')
    //   setMessage('Error al guardar datos del paso ' + step)
    //   return // No avanzar si hay error
    // }
    
    const index = visibleSteps.indexOf(step)
    if (index >= 0 && index < visibleSteps.length - 1) {
      setStep(visibleSteps[index + 1])
    }
  }

  const goPrev = () => {
    const index = visibleSteps.indexOf(step)
    if (index > 0) {
      setStep(visibleSteps[index - 1])
    }
  }

  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }))
  }

  const updateRow = (
    rows: DynamicRow[],
    setRows: Dispatch<SetStateAction<DynamicRow[]>>,
    id: string,
    key: keyof DynamicRow,
    value: string,
  ) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)))
  }

  const updateDepRow = (id: string, key: keyof DepRow, value: string) => {
    setDepRows(depRows.map((row) => (row.id === id ? { ...row, [key]: value } : row)))
  }

  const updateQuestionAnswer = (
    rows: QuestionRow[],
    setRows: Dispatch<SetStateAction<QuestionRow[]>>,
    id: string,
    value: string,
  ) => {
    const nombreAsegurado = getNombreAsegurado(formData)
    setRows(
      rows.map((row) => {
        if (row.id !== id) {
          return row
        }
        if (value === 'SI') {
          return {
            ...row,
            answer: 'SI',
            detalles: row.detalles.length > 0 ? row.detalles : [newQuestionDetailRow(nombreAsegurado)],
          }
        }
        return {
          ...row,
          answer: 'NO',
          detalles: [],
        }
      }),
    )
  }

  const addQuestionDetailRow = (
    rows: QuestionRow[],
    setRows: Dispatch<SetStateAction<QuestionRow[]>>,
    id: string,
  ) => {
    const nombreAsegurado = getNombreAsegurado(formData)
    setRows(rows.map((row) => (row.id === id
      ? { ...row, detalles: [...row.detalles, newQuestionDetailRow(nombreAsegurado)] }
      : row)))
  }

  const updateQuestionDetailRow = (
    rows: QuestionRow[],
    setRows: Dispatch<SetStateAction<QuestionRow[]>>,
    questionId: string,
    detailId: string,
    key: keyof QuestionDetailRow,
    value: string,
  ) => {
    setRows(rows.map((row) => {
      if (row.id !== questionId) {
        return row
      }
      return {
        ...row,
        detalles: row.detalles.map((detail) => (detail.id === detailId ? { ...detail, [key]: value } : detail)),
      }
    }))
  }

  const removeQuestionDetailRow = (
    rows: QuestionRow[],
    setRows: Dispatch<SetStateAction<QuestionRow[]>>,
    questionId: string,
    detailId: string,
  ) => {
    setRows(rows.map((row) => {
      if (row.id !== questionId) {
        return row
      }
      if (row.detalles.length === 1) {
        return row
      }
      return {
        ...row,
        detalles: row.detalles.filter((detail) => detail.id !== detailId),
      }
    }))
  }

  const updateMedRow = (id: string, key: keyof MedRow, value: string) => {
    setMedRows(medRows.map((row) => (row.id === id ? { ...row, [key]: value } : row)))
  }

  const removeItem = <T extends { id: string }>(
    rows: T[],
    setRows: Dispatch<SetStateAction<T[]>>,
    id: string,
    fallback: () => T,
  ) => {
    if (rows.length === 1) {
      return
    }
    setRows(rows.filter((row) => row.id !== id))
    if (rows.length === 2) {
      setRows((current) => (current.length === 0 ? [fallback()] : current))
    }
  }

  const serializeRows = () => ({
    vida: JSON.stringify(
      vidaRows
        .map((row) => ({
          nombre: row.nombre.trim(),
          parentesco: row.parentesco,
          fecha: row.fecha,
          porcentaje: normalizeDecimal(row.porcentaje),
        }))
        .filter((row) => hasAnyValue(row)),
    ),
    cont: JSON.stringify(
      contRows
        .map((row) => ({
          nombre: row.nombre.trim(),
          parentesco: row.parentesco,
          fecha: row.fecha,
          porcentaje: normalizeDecimal(row.porcentaje),
        }))
        .filter((row) => hasAnyValue(row)),
    ),
    dep: JSON.stringify(
      depRows
        .map((row) => ({
          nombre: row.nombre.trim(),
          parentesco: row.parentesco,
          genero: row.genero,
          fecha: row.fecha,
          peso: normalizeDecimal(row.peso),
          estatura: normalizeDecimal(row.estatura),
        }))
        .filter((row) => hasAnyValue(row)),
    ),
    shortHealth: JSON.stringify(shortHealthRows),
    longHealth: JSON.stringify(longHealthRows),
    meds: JSON.stringify(
      medRows
        .map((row) => ({
          asegurado: row.asegurado.trim(),
          diagnostico: row.diagnostico.trim(),
          medicamento: row.medicamento.trim(),
          dosis: row.dosis.trim(),
          desde: row.desde,
          hasta: row.hasta,
        }))
        .filter((row) => hasAnyValue(row)),
    ),
  })

  const validate = (): ValidationError[] => {
    const validationErrors: ValidationError[] = []
    const lettersPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.,'\-/]+$/

    if (!formData.tipoFormulario) {
      validationErrors.push({ message: 'Seleccione tipo de formulario.', fieldId: 'ddlTipoFormulario', stepNumber: 1 })
    }
    if (!formData.nombreContratante.trim()) {
      validationErrors.push({ message: 'Ingrese nombre del contratante.', fieldId: 'txtNombreContratante', stepNumber: 1 })
    }
    if (!formData.numeroPoliza.trim()) {
      validationErrors.push({ message: 'Ingrese número de póliza.', fieldId: 'txtNumeroPoliza', stepNumber: 1 })
    }
    if (parseDecimal(formData.sumaAsegurada) <= 0) {
      validationErrors.push({ message: 'Ingrese suma asegurada válida.', fieldId: 'txtSumaAsegurada', stepNumber: 1 })
    }
    if (!formData.telefonoOtp.trim() || formData.telefonoOtp.length < 8) {
      validationErrors.push({ message: 'Ingrese número de teléfono para OTP.', fieldId: 'txtTelefonoOtp', stepNumber: 1 })
    }
    if (!formData.otpVerificado) {
      if (formData.otpEnviado) {
        validationErrors.push({ message: 'Ingrese y verifique el código OTP recibido.', fieldId: 'txtOtpCodigo', stepNumber: 1 })
      } else {
        validationErrors.push({ message: 'Debe enviar OTP para certificar y cerrar el formulario.', fieldId: 'btnEnviarOtp', stepNumber: 1 })
      }
    }

    if (!formData.primerApellido.trim()) {
      validationErrors.push({ message: 'Ingrese primer apellido.', fieldId: 'txtPrimerApellido', stepNumber: 2 })
    } else if (!lettersPattern.test(formData.primerApellido.trim())) {
      validationErrors.push({ message: 'Primer apellido solo admite letras y caracteres permitidos.', fieldId: 'txtPrimerApellido', stepNumber: 2 })
    }
    if (!formData.primerNombre.trim()) {
      validationErrors.push({ message: 'Ingrese primer nombre.', fieldId: 'txtPrimerNombre', stepNumber: 2 })
    } else if (!lettersPattern.test(formData.primerNombre.trim())) {
      validationErrors.push({ message: 'Primer nombre solo admite letras y caracteres permitidos.', fieldId: 'txtPrimerNombre', stepNumber: 2 })
    }
    if (!formData.tipoDocumento) {
      validationErrors.push({ message: 'Seleccione tipo de documento.', fieldId: 'ddlTipoDocumento', stepNumber: 2 })
    }
    if (!formData.numeroDocumento.trim()) {
      validationErrors.push({ message: 'Ingrese número de identificación.', fieldId: 'txtNumeroDocumento', stepNumber: 2 })
    } else if (formData.tipoDocumento === 'DNI' && !/^\d{4}-\d{4}-\d{5}$/.test(formData.numeroDocumento)) {
      validationErrors.push({ message: 'DNI inválido. Use formato 0000-0000-00000.', fieldId: 'txtNumeroDocumento', stepNumber: 2 })
    }
    if (!formData.lugarNacimiento.trim()) {
      validationErrors.push({ message: 'Ingrese lugar de nacimiento.', fieldId: 'txtLugarNacimiento', stepNumber: 2 })
    } else if (!lettersPattern.test(formData.lugarNacimiento.trim())) {
      validationErrors.push({ message: 'Lugar de nacimiento solo admite letras y caracteres permitidos.', fieldId: 'txtLugarNacimiento', stepNumber: 2 })
    }
    if (!formData.nacionalidad.trim()) {
      validationErrors.push({ message: 'Ingrese nacionalidad.', fieldId: 'txtNacionalidad', stepNumber: 2 })
    } else if (!lettersPattern.test(formData.nacionalidad.trim())) {
      validationErrors.push({ message: 'Nacionalidad solo admite letras y caracteres permitidos.', fieldId: 'txtNacionalidad', stepNumber: 2 })
    }
    if (!formData.profesionOficio.trim()) {
      validationErrors.push({ message: 'Ingrese profesión u oficio.', fieldId: 'txtProfesionOficio', stepNumber: 2 })
    } else if (!lettersPattern.test(formData.profesionOficio.trim())) {
      validationErrors.push({ message: 'Profesión u oficio solo admite letras y caracteres permitidos.', fieldId: 'txtProfesionOficio', stepNumber: 2 })
    }
    const estaturaParsed = parseDecimal(formData.estaturaMetros)
    if (estaturaParsed > 250) {
      validationErrors.push({ message: 'Estatura inválida. Si está en cm, el máximo permitido es 250.', fieldId: 'txtEstaturaMetros', stepNumber: 2 })
    } else if (estaturaParsed < 0.5 || estaturaParsed > 2.5) {
      validationErrors.push({ message: 'Estatura debe estar entre 0.50 y 2.50 metros.', fieldId: 'txtEstaturaMetros', stepNumber: 2 })
    }
    if (parseDecimal(formData.pesoLibras) < 20 || parseDecimal(formData.pesoLibras) > 600) {
      validationErrors.push({ message: 'Peso debe estar entre 20 y 600 libras.', fieldId: 'txtPesoLibras', stepNumber: 2 })
    }
    if (!formData.cargoDesempena.trim()) {
      validationErrors.push({ message: 'Ingrese cargo que desempeña.', fieldId: 'txtCargoDesempena', stepNumber: 2 })
    } else if (!lettersPattern.test(formData.cargoDesempena.trim())) {
      validationErrors.push({ message: 'Cargo solo admite letras y caracteres permitidos.', fieldId: 'txtCargoDesempena', stepNumber: 2 })
    }
    if (parseDecimal(formData.sueldoMensual) <= 0 || parseDecimal(formData.sueldoMensual) > 99999999) {
      validationErrors.push({ message: 'Sueldo mensual inválido.', fieldId: 'txtSueldoMensual', stepNumber: 2 })
    }
    if (!formData.sexo) {
      validationErrors.push({ message: 'Seleccione sexo.', fieldId: 'ddlSexo', stepNumber: 2 })
    }

    if (!formData.pais) {
      validationErrors.push({ message: 'Seleccione país.', fieldId: 'ddlPais', stepNumber: 3 })
    }
    if (!formData.departamento) {
      validationErrors.push({ message: 'Seleccione departamento.', fieldId: 'ddlDepartamento', stepNumber: 3 })
    }
    if (!formData.ciudad) {
      validationErrors.push({ message: 'Seleccione ciudad.', fieldId: 'ddlCiudad', stepNumber: 3 })
    }
    if (!formData.municipio) {
      validationErrors.push({ message: 'Seleccione municipio.', fieldId: 'ddlMunicipio', stepNumber: 3 })
    }
    if (!formData.celular.trim()) {
      validationErrors.push({ message: 'Ingrese celular.', fieldId: 'txtCelular', stepNumber: 3 })
    }
    if (formData.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      validationErrors.push({ message: 'E-mail inválido.', fieldId: 'txtEmail', stepNumber: 3 })
    }

    const nonEmptyVida = vidaRows.filter((row) => hasAnyValue({
      nombre: row.nombre,
      parentesco: row.parentesco,
      fecha: row.fecha,
      porcentaje: row.porcentaje,
    }))
    const nonEmptyCont = contRows.filter((row) => hasAnyValue({
      nombre: row.nombre,
      parentesco: row.parentesco,
      fecha: row.fecha,
      porcentaje: row.porcentaje,
    }))

    if (nonEmptyVida.length === 0) {
      validationErrors.push({ message: 'Agregue al menos un beneficiario de vida.', fieldId: 'bodyVida', stepNumber: 4 })
    }
    if (nonEmptyCont.length === 0) {
      validationErrors.push({ message: 'Agregue al menos un beneficiario de contingencia.', fieldId: 'bodyCont', stepNumber: 4 })
    }
    if (Number(totalVida.toFixed(2)) !== 100) {
      validationErrors.push({ message: 'Beneficiarios de vida deben sumar 100%.', fieldId: 'hfTotalVida', stepNumber: 4 })
    }
    if (Number(totalCont.toFixed(2)) !== 100) {
      validationErrors.push({ message: 'Beneficiarios de contingencia deben sumar 100%.', fieldId: 'hfTotalCont', stepNumber: 4 })
    }

    if (hasDependents(formData.tipoFormulario)) {
      depRows.forEach((row) => {
        if (!row.nombre.trim() && !row.parentesco && !row.genero && !row.fecha && !row.peso && !row.estatura) {
          return
        }
        if (!row.nombre.trim()) {
          validationErrors.push({ message: 'Dependiente con nombre vacío no es válido.', fieldId: 'bodyDep', stepNumber: 4 })
        } else if (!lettersPattern.test(row.nombre.trim())) {
          validationErrors.push({ message: 'Nombre de dependiente solo admite letras y caracteres permitidos.', fieldId: 'bodyDep', stepNumber: 4 })
        }
        if (!row.genero) {
          validationErrors.push({ message: 'Debe seleccionar género M/F para cada dependiente registrado.', fieldId: 'bodyDep', stepNumber: 4 })
        }
      })
    }

    nonEmptyVida.forEach((row) => {
      if (row.nombre.trim() && !lettersPattern.test(row.nombre.trim())) {
        validationErrors.push({ message: 'Nombre de beneficiario de vida solo admite letras y caracteres permitidos.', fieldId: 'bodyVida', stepNumber: 4 })
      }
    })
    nonEmptyCont.forEach((row) => {
      if (row.nombre.trim() && !lettersPattern.test(row.nombre.trim())) {
        validationErrors.push({ message: 'Nombre de beneficiario de contingencia solo admite letras y caracteres permitidos.', fieldId: 'bodyCont', stepNumber: 4 })
      }
    })

    if (isShortHealthForm(formData.tipoFormulario)) {
      shortQuestionIds.forEach((id) => {
        const row = shortHealthRows.find((item) => item.id === id)
        if (!row) {
          validationErrors.push({ message: 'Todas las preguntas del cuestionario corto son obligatorias.', fieldId: 'saludCortaPreguntas', stepNumber: 5 })
          return
        }
        if (row.answer === 'SI') {
          if (row.detalles.length === 0) {
            validationErrors.push({ message: 'Agregue al menos un detalle para respuestas "Sí" en cuestionario corto.', fieldId: 'saludCortaPreguntas', stepNumber: 5 })
            return
          }
          const hasInvalidDetail = row.detalles.some((detail) => !detail.enfermedad.trim() || !detail.medico.trim() || !detail.cuando.trim() || !detail.paciente.trim())
          if (hasInvalidDetail) {
            validationErrors.push({ message: 'Complete el detalle para respuestas "Sí" en cuestionario corto.', fieldId: 'saludCortaPreguntas', stepNumber: 5 })
          }
        }
      })
    }

    if (isLongHealthForm(formData.tipoFormulario)) {
      visibleLongQuestionIds.forEach((id) => {
        const row = longHealthRows.find((item) => item.id === id)
        if (!row) {
          validationErrors.push({ message: 'Todas las preguntas del cuestionario largo son obligatorias.', fieldId: 'saludLargaPreguntas', stepNumber: 5 })
          return
        }
        if (row.answer === 'SI') {
          if (row.detalles.length === 0) {
            validationErrors.push({ message: 'Agregue al menos un detalle para respuestas "Sí" en cuestionario largo.', fieldId: 'saludLargaPreguntas', stepNumber: 5 })
            return
          }
          const hasInvalidDetail = row.detalles.some((detail) => !detail.enfermedad.trim() || !detail.medico.trim() || !detail.cuando.trim() || !detail.paciente.trim())
          if (hasInvalidDetail) {
            validationErrors.push({ message: 'Complete el detalle para respuestas "Sí" en cuestionario largo.', fieldId: 'saludLargaPreguntas', stepNumber: 5 })
          }
        }
      })

      if (formData.tomaMedicamentos === 'SI') {
        const nonEmptyMeds = medRows.filter((row) =>
          hasAnyValue({
            asegurado: row.asegurado,
            diagnostico: row.diagnostico,
            medicamento: row.medicamento,
            dosis: row.dosis,
            desde: row.desde,
            hasta: row.hasta,
          }),
        )

        if (nonEmptyMeds.length === 0) {
          validationErrors.push({ message: 'Agregue al menos un medicamento.', fieldId: 'bodyMed', stepNumber: 5 })
        }

        nonEmptyMeds.forEach((row) => {
          if (!row.asegurado.trim() || !row.diagnostico.trim() || !row.medicamento.trim() || !row.dosis.trim()) {
            validationErrors.push({ message: 'Complete todos los campos de cada medicamento.', fieldId: 'bodyMed', stepNumber: 5 })
          }
          if (!row.desde || !row.hasta) {
            validationErrors.push({ message: 'Fechas de medicamento inválidas.', fieldId: 'bodyMed', stepNumber: 5 })
          } else if (new Date(row.hasta) < new Date(row.desde)) {
            validationErrors.push({ message: 'En medicamentos, "Hasta" no puede ser menor que "Desde".', fieldId: 'bodyMed', stepNumber: 5 })
          }
        })
      }
    }

    if (!formData.aceptaDeclaracion) {
      validationErrors.push({ message: 'Debe aceptar la declaración legal.', fieldId: 'chkAceptaDeclaracion', stepNumber: 6 })
    }
    if (!formData.firmaSolicitante.trim()) {
      validationErrors.push({ message: 'Ingrese firma del solicitante.', fieldId: 'txtFirmaSolicitante', stepNumber: 6 })
    }
    if (!formData.firmaPatrono.trim()) {
      validationErrors.push({ message: 'Ingrese firma del patrono/contratante.', fieldId: 'txtFirmaPatrono', stepNumber: 6 })
    }
    if (!formData.fechaFirma) {
      validationErrors.push({ message: 'Ingrese fecha de firma.', fieldId: 'txtFechaFirma', stepNumber: 6 })
    }

    return validationErrors
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setMessage('')
    const validationErrors = validate()
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      const first = validationErrors[0]
      setStep(first.stepNumber)
      setMessageClass('message error')
      setMessage(first.message)
      return
    }

    setMessageClass('message ok')
    setMessage('Solicitud enviada correctamente.')
  }

  const handleEnviarOtp = () => {
    if (formData.telefonoOtp.length < 8) {
      setMessageClass('message error')
      setMessage('Ingrese un número de teléfono válido para enviar OTP.')
      return
    }
    updateForm('otpEnviado', true)
    updateForm('otpCodigo', '')
    updateForm('otpVerificado', false)
    setMessageClass('message ok')
    setMessage(`OTP enviado al número ${formData.telefonoOtp}. Ingrese el código recibido.`)
  }

  const handleVerificarOtp = () => {
    if (formData.otpCodigo.length < 4) {
      setMessageClass('message error')
      setMessage('Ingrese el código OTP recibido.')
      return
    }
    updateForm('otpVerificado', true)
    updateForm('otpEnviado', false)
    setMessage('')
    
    // TODO: API - INSERT inicial en base de datos
    // Llave primaria: formData.telefonoOtp
    // Endpoint: POST /api/formulario
    // Datos a enviar: { telefonoOtp, tipoFormulario, nombreContratante, numeroPoliza, sumaAsegurada }
    // try {
    //   await insertFormulario({
    //     telefonoOtp: formData.telefonoOtp,
    //     tipoFormulario: formData.tipoFormulario,
    //     nombreContratante: formData.nombreContratante,
    //     numeroPoliza: formData.numeroPoliza,
    //     sumaAsegurada: formData.sumaAsegurada,
    //   })
    // } catch (error) {
    //   setMessageClass('message error')
    //   setMessage('Error al guardar datos iniciales.')
    // }
  }

  const submitVisible = step === 6 || validate().length === 0

  const serialized = serializeRows()

  return (
    <form id="form1" onSubmit={handleSubmit}>
      <main className="container">
        <div className="site-topbar">Solicitud electrónica</div>
        <header className="header">
          <div className="brand-block">
            <img src={ficohsaSegurosLogo} alt="Ficohsa Seguros" className="brand-logo" />
          </div>
        </header>

        <ul className="stepper" id="wizardStepper">
          {[
             { id: 1, title: 'Póliza' },
             { id: 2, title: 'Asegurado' },
             { id: 3, title: 'Dirección' },
             { id: 4, title: 'Beneficiarios' },
             { id: 5, title: 'Salud' },
             { id: 6, title: 'Consentimiento' },
           ].map((tab) => {
             const tabStep = tab.id as Step
             const isHidden = !visibleSteps.includes(tabStep)
             const canNavigate = step !== 1 || formData.otpVerificado || tabStep === 1
             return (
               <li
                 key={tab.id}
                 className={`step-tab${step === tabStep ? ' active' : ''}${isHidden ? ' is-hidden' : ''}${!canNavigate ? ' disabled' : ''}`}
                 data-step={tab.id}
                 tabIndex={canNavigate ? 0 : -1}
                 onClick={() => canNavigate && !isHidden && setStep(tabStep)}
                 onKeyDown={(event) => {
                   if ((event.key === 'Enter' || event.key === ' ') && canNavigate && !isHidden) {
                     event.preventDefault()
                     setStep(tabStep)
                   }
                 }}
                 style={!canNavigate ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
               >
                 {tab.title}
               </li>
             )
           })}
        </ul>

        {message ? <span id="lblMensaje" className={messageClass}>{message}</span> : null}

        {errors.length > 0 ? (
          <ul id="bltErrores" className="error-list">
            {Array.from(new Set(errors.map((error) => error.message))).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}

        <section className={`wizard-step${step === 1 ? ' active' : ''}`} data-step="1">
          <h2>Datos de la Póliza</h2>

          <div className="grid two-col">
            <div className="field">
              <label htmlFor="ddlTipoFormulario">Tipo de formulario <span className="required">*</span></label>
              <select
                id="ddlTipoFormulario"
                className={`input${fieldErrorSet.has('ddlTipoFormulario') ? ' field-error' : ''}`}
                value={formData.tipoFormulario}
                onChange={(event) => {
                  updateForm('tipoFormulario', event.target.value)
                  applyFormTypeRules(event.target.value)
                }}
              >
                {tiposFormulario.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="txtNombreContratante">Nombre del contratante <span className="required">*</span></label>
              <input id="txtNombreContratante" className={`input${fieldErrorSet.has('txtNombreContratante') ? ' field-error' : ''}`} maxLength={120} value={formData.nombreContratante} onChange={(event) => updateForm('nombreContratante', event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="txtNumeroPoliza">No. de póliza <span className="required">*</span></label>
              <input id="txtNumeroPoliza" className={`input${fieldErrorSet.has('txtNumeroPoliza') ? ' field-error' : ''}`} maxLength={40} value={formData.numeroPoliza} onChange={(event) => updateForm('numeroPoliza', event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="txtSumaAsegurada">Suma asegurada <span className="required">*</span></label>
              <input id="txtSumaAsegurada" className={`input${fieldErrorSet.has('txtSumaAsegurada') ? ' field-error' : ''}`} maxLength={18} value={formData.sumaAsegurada} onChange={(event) => updateForm('sumaAsegurada', event.target.value)} onBlur={(event) => updateForm('sumaAsegurada', normalizeDecimal(event.target.value))} />
            </div>
            <div className="field">
              <label htmlFor="txtTelefonoOtp">Número de teléfono <span className="required">*</span></label>
              <input
                id="txtTelefonoOtp"
                className={`input${fieldErrorSet.has('txtTelefonoOtp') ? ' field-error' : ''}`}
                maxLength={15}
                placeholder="Ej: 99998888"
                value={formData.telefonoOtp}
                disabled={formData.otpVerificado}
                onChange={(event) => {
                  updateForm('telefonoOtp', allowPhoneDigits(event.target.value))
                  if (formData.otpVerificado) {
                    updateForm('otpVerificado', false)
                  }
                }}
              />
            </div>
            <div className="field" style={{ justifyContent: 'flex-end' }}>
              <label>&nbsp;</label>
              {!formData.otpVerificado ? (
                <button
                  id="btnEnviarOtp"
                  type="button"
                  className={`btn-otp${fieldErrorSet.has('btnEnviarOtp') ? ' field-error' : ''}`}
                  style={{ background: 'linear-gradient(180deg, #0b66da 0%, #0057ca 100%)', color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(0, 87, 202, 0.25)', cursor: 'pointer' }}
                  onClick={handleEnviarOtp}
                  disabled={formData.telefonoOtp.length < 8}
                >
                  {formData.otpEnviado ? 'Reenviar OTP' : 'Enviar OTP'}
                </button>
              ) : (
                <div className="verification-success">
                  <div className="checkmark"></div>
                  <span>Usuario verificado</span>
                </div>
              )}
            </div>

            {formData.otpEnviado && !formData.otpVerificado && (
              <div className="otp-section">
                <div className="otp-code-input">
                  <div className="field">
                    <label htmlFor="txtOtpCodigo">Código OTP recibido <span className="required">*</span></label>
                    <input
                      id="txtOtpCodigo"
                      className={`input${fieldErrorSet.has('txtOtpCodigo') ? ' field-error' : ''}`}
                      maxLength={6}
                      placeholder="Ingrese código"
                      value={formData.otpCodigo}
                      onChange={(event) => updateForm('otpCodigo', allowPhoneDigits(event.target.value))}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={handleVerificarOtp}
                    disabled={formData.otpCodigo.length < 4}
                    style={{ height: '41px' }}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={`wizard-step${step === 2 ? ' active' : ''}`} data-step="2">
          <h2>Datos generales del asegurado</h2>

          <div className="grid two-col">
            <div className="field"><label htmlFor="txtPrimerApellido">Primer apellido <span className="required">*</span></label><input id="txtPrimerApellido" className={`input${fieldErrorSet.has('txtPrimerApellido') ? ' field-error' : ''}`} maxLength={60} value={formData.primerApellido} onChange={(event) => updateForm('primerApellido', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtSegundoApellido">Segundo apellido</label><input id="txtSegundoApellido" className="input" maxLength={60} value={formData.segundoApellido} onChange={(event) => updateForm('segundoApellido', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtPrimerNombre">Primer nombre <span className="required">*</span></label><input id="txtPrimerNombre" className={`input${fieldErrorSet.has('txtPrimerNombre') ? ' field-error' : ''}`} maxLength={60} value={formData.primerNombre} onChange={(event) => updateForm('primerNombre', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtSegundoNombre">Segundo nombre</label><input id="txtSegundoNombre" className="input" maxLength={60} value={formData.segundoNombre} onChange={(event) => updateForm('segundoNombre', allowLettersExtended(event.target.value))} /></div>
            <div className="field">
              <label htmlFor="ddlTipoDocumento">Tipo documento <span className="required">*</span><span className="help" title="Seleccione el tipo de documento antes de ingresar el número.">?</span></label>
              <select
                id="ddlTipoDocumento"
                className={`input${fieldErrorSet.has('ddlTipoDocumento') ? ' field-error' : ''}`}
                value={formData.tipoDocumento}
                onChange={(event) => {
                  const nextType = event.target.value
                  updateForm('tipoDocumento', nextType)
                  if (nextType === 'DNI') {
                    updateForm('numeroDocumento', applyDniMask(formData.numeroDocumento))
                  }
                }}
              >
                {tiposDocumento.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="field"><label htmlFor="txtNumeroDocumento">No. identificación <span className="required">*</span></label><input id="txtNumeroDocumento" className={`input${fieldErrorSet.has('txtNumeroDocumento') ? ' field-error' : ''}`} maxLength={formData.tipoDocumento === 'DNI' ? 15 : 30} value={formData.numeroDocumento} onChange={(event) => updateForm('numeroDocumento', formData.tipoDocumento === 'DNI' ? applyDniMask(event.target.value) : event.target.value)} placeholder={formData.tipoDocumento === 'DNI' ? '0000-0000-00000' : ''} /></div>
            <div className="field"><label htmlFor="txtLugarNacimiento">Lugar de nacimiento <span className="required">*</span></label><input id="txtLugarNacimiento" className={`input${fieldErrorSet.has('txtLugarNacimiento') ? ' field-error' : ''}`} maxLength={120} value={formData.lugarNacimiento} onChange={(event) => updateForm('lugarNacimiento', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtNacionalidad">Nacionalidad <span className="required">*</span></label><input id="txtNacionalidad" className={`input${fieldErrorSet.has('txtNacionalidad') ? ' field-error' : ''}`} maxLength={80} value={formData.nacionalidad} onChange={(event) => updateForm('nacionalidad', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtProfesionOficio">Profesión u oficio <span className="required">*</span></label><input id="txtProfesionOficio" className={`input${fieldErrorSet.has('txtProfesionOficio') ? ' field-error' : ''}`} maxLength={120} value={formData.profesionOficio} onChange={(event) => updateForm('profesionOficio', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtEstaturaMetros">Estatura en metros <span className="required">*</span></label><input id="txtEstaturaMetros" className={`input decimal${fieldErrorSet.has('txtEstaturaMetros') ? ' field-error' : ''}`} maxLength={10} value={formData.estaturaMetros} onChange={(event) => updateForm('estaturaMetros', allowNumericDecimal(event.target.value))} onBlur={(event) => updateForm('estaturaMetros', normalizeEstatura(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtPesoLibras">Peso en libras <span className="required">*</span></label><input id="txtPesoLibras" className={`input decimal${fieldErrorSet.has('txtPesoLibras') ? ' field-error' : ''}`} maxLength={10} value={formData.pesoLibras} onChange={(event) => updateForm('pesoLibras', allowNumericDecimal(event.target.value))} onBlur={(event) => updateForm('pesoLibras', normalizeDecimal(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtCargoDesempena">Cargo que desempeña <span className="required">*</span></label><input id="txtCargoDesempena" className={`input${fieldErrorSet.has('txtCargoDesempena') ? ' field-error' : ''}`} maxLength={120} value={formData.cargoDesempena} onChange={(event) => updateForm('cargoDesempena', allowLettersExtended(event.target.value))} /></div>
            <div className="field"><label htmlFor="txtSueldoMensual">Sueldo mensual Lps.<span className="required">*</span></label><input id="txtSueldoMensual" className={`input decimal${fieldErrorSet.has('txtSueldoMensual') ? ' field-error' : ''}`} maxLength={18} value={formData.sueldoMensual} onChange={(event) => updateForm('sueldoMensual', allowNumericDecimal(event.target.value))} onBlur={(event) => updateForm('sueldoMensual', normalizeDecimal(event.target.value))} /></div>
            <div className="field">
              <label htmlFor="ddlSexo">Sexo <span className="required">*</span></label>
              <select id="ddlSexo" className={`input${fieldErrorSet.has('ddlSexo') ? ' field-error' : ''}`} value={formData.sexo} onChange={(event) => updateForm('sexo', event.target.value)}>
                <option value="">Seleccione...</option>
                {generos.map((option) => <option key={option} value={option}>{option === 'M' ? 'Masculino' : 'Femenino'}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className={`wizard-step${step === 3 ? ' active' : ''}`} data-step="3">
          <h2>Dirección del asegurado</h2>

          <div className="grid two-col">
            <div className="field"><label htmlFor="ddlPais">País <span className="required">*</span></label><select id="ddlPais" className={`input${fieldErrorSet.has('ddlPais') ? ' field-error' : ''}`} value={formData.pais} onChange={(event) => updateForm('pais', event.target.value)}>{paises.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
            <div className="field"><label htmlFor="ddlDepartamento">Departamento <span className="required">*</span></label><select id="ddlDepartamento" className={`input${fieldErrorSet.has('ddlDepartamento') ? ' field-error' : ''}`} value={formData.departamento} onChange={(event) => updateForm('departamento', event.target.value)}>{departamentos.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
            <div className="field"><label htmlFor="ddlCiudad">Ciudad <span className="required">*</span></label><select id="ddlCiudad" className={`input${fieldErrorSet.has('ddlCiudad') ? ' field-error' : ''}`} value={formData.ciudad} onChange={(event) => updateForm('ciudad', event.target.value)}>{ciudades.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
            <div className="field"><label htmlFor="ddlMunicipio">Municipio <span className="required">*</span></label><select id="ddlMunicipio" className={`input${fieldErrorSet.has('ddlMunicipio') ? ' field-error' : ''}`} value={formData.municipio} onChange={(event) => updateForm('municipio', event.target.value)}>{municipios.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
            <div className="field"><label htmlFor="txtCalle">Calle</label><input id="txtCalle" className="input" maxLength={120} value={formData.calle} onChange={(event) => updateForm('calle', event.target.value)} /></div>
            <div className="field"><label htmlFor="txtAvenida">Avenida</label><input id="txtAvenida" className="input" maxLength={120} value={formData.avenida} onChange={(event) => updateForm('avenida', event.target.value)} /></div>
            <div className="field"><label htmlFor="txtCelular">Celular <span className="required">*</span></label><input id="txtCelular" className={`input${fieldErrorSet.has('txtCelular') ? ' field-error' : ''}`} maxLength={20} value={formData.celular} onChange={(event) => updateForm('celular', event.target.value)} /></div>
            <div className="field"><label htmlFor="txtEmail">Correo Electrónico</label><input id="txtEmail" className={`input${fieldErrorSet.has('txtEmail') ? ' field-error' : ''}`} maxLength={120} value={formData.email} onChange={(event) => updateForm('email', event.target.value)} /></div>
          </div>
        </section>

        <section className={`wizard-step${step === 4 ? ' active' : ''}`} data-step="4">
          <h2>Beneficiarios y dependientes</h2>

          <div className="card">
            <h3>Beneficiarios del seguro de vida</h3>
            <div className="table-wrap">
              <table className="table-grid">
                <thead>
                  <tr><th>Nombre completo</th><th>Parentesco</th><th>Fecha nacimiento</th><th>Porcentaje*</th><th></th></tr>
                </thead>
                <tbody id="bodyVida" className={fieldErrorSet.has('bodyVida') ? 'field-error-area' : ''}>
                  {vidaRows.map((row) => (
                    <tr key={row.id}>
                      <td><input className="input" value={row.nombre} onChange={(event) => updateRow(vidaRows, setVidaRows, row.id, 'nombre', allowLettersExtended(event.target.value))} /></td>
                      <td><select className="input" value={row.parentesco} onChange={(event) => updateRow(vidaRows, setVidaRows, row.id, 'parentesco', event.target.value)}><option value="">Seleccione...</option>{parentescos.map((option) => <option key={option} value={option}>{option}</option>)}</select></td>
                      <td><input className="input" type="date" value={row.fecha} onChange={(event) => updateRow(vidaRows, setVidaRows, row.id, 'fecha', event.target.value)} /></td>
                      <td><input className="input decimal" value={row.porcentaje} onChange={(event) => updateRow(vidaRows, setVidaRows, row.id, 'porcentaje', allowNumericDecimal(event.target.value))} onBlur={(event) => updateRow(vidaRows, setVidaRows, row.id, 'porcentaje', normalizeDecimal(event.target.value))} /></td>
                      <td><button type="button" className="btn light small" onClick={() => removeItem(vidaRows, setVidaRows, row.id, newDynamicRow)}>Quitar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row-actions"><button type="button" className="btn light small" id="btnAddVida" onClick={() => setVidaRows((current) => [...current, newDynamicRow()])}>Agregar beneficiario vida</button></div>
            <p className={`total${fieldErrorSet.has('hfTotalVida') ? ' field-error-text' : ''}`}>Total Vida: <span id="totalVida">{totalVida.toFixed(2)}</span>%</p>
          </div>

          <div className="card">
            <h3>Beneficiarios de contingencia</h3>
            <div className="table-wrap">
              <table className="table-grid">
                <thead>
                  <tr><th>Nombre completo</th><th>Parentesco</th><th>Fecha nacimiento</th><th>Porcentaje*</th><th></th></tr>
                </thead>
                <tbody id="bodyCont" className={fieldErrorSet.has('bodyCont') ? 'field-error-area' : ''}>
                  {contRows.map((row) => (
                    <tr key={row.id}>
                      <td><input className="input" value={row.nombre} onChange={(event) => updateRow(contRows, setContRows, row.id, 'nombre', allowLettersExtended(event.target.value))} /></td>
                      <td><select className="input" value={row.parentesco} onChange={(event) => updateRow(contRows, setContRows, row.id, 'parentesco', event.target.value)}><option value="">Seleccione...</option>{parentescos.map((option) => <option key={option} value={option}>{option}</option>)}</select></td>
                      <td><input className="input" type="date" value={row.fecha} onChange={(event) => updateRow(contRows, setContRows, row.id, 'fecha', event.target.value)} /></td>
                      <td><input className="input decimal" value={row.porcentaje} onChange={(event) => updateRow(contRows, setContRows, row.id, 'porcentaje', allowNumericDecimal(event.target.value))} onBlur={(event) => updateRow(contRows, setContRows, row.id, 'porcentaje', normalizeDecimal(event.target.value))} /></td>
                      <td><button type="button" className="btn light small" onClick={() => removeItem(contRows, setContRows, row.id, newDynamicRow)}>Quitar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row-actions"><button type="button" className="btn light small" id="btnAddCont" onClick={() => setContRows((current) => [...current, newDynamicRow()])}>Agregar beneficiario contingencia</button></div>
            <p className={`total${fieldErrorSet.has('hfTotalCont') ? ' field-error-text' : ''}`}>Total Contingencia: <span id="totalCont">{totalCont.toFixed(2)}</span>%</p>
          </div>

          <div className={`card${hasDependents(formData.tipoFormulario) ? '' : ' is-hidden'}`} id="cardDependientes">
            <h3>Dependientes económicos</h3>
            <div className="table-wrap">
              <table className="table-grid table-dependientes">
                <thead>
                  <tr><th>Nombre completo</th><th>Parentesco</th><th>Género</th><th>Fecha nacimiento</th><th>Peso (Lbs)</th><th>Estatura (m)</th><th></th></tr>
                </thead>
                <tbody id="bodyDep" className={fieldErrorSet.has('bodyDep') ? 'field-error-area' : ''}>
                  {depRows.map((row) => (
                    <tr key={row.id}>
                      <td><input className="input" value={row.nombre} onChange={(event) => updateDepRow(row.id, 'nombre', allowLettersExtended(event.target.value))} /></td>
                      <td><select className="input" value={row.parentesco} onChange={(event) => updateDepRow(row.id, 'parentesco', event.target.value)}><option value="">Seleccione...</option>{parentescos.map((option) => <option key={option} value={option}>{option}</option>)}</select></td>
                      <td><select className="input" value={row.genero} onChange={(event) => updateDepRow(row.id, 'genero', event.target.value)}><option value="">Seleccione...</option>{generos.map((option) => <option key={option} value={option}>{option}</option>)}</select></td>
                      <td><input className="input" type="date" value={row.fecha} onChange={(event) => updateDepRow(row.id, 'fecha', event.target.value)} /></td>
                      <td><input className="input decimal" value={row.peso} onChange={(event) => updateDepRow(row.id, 'peso', allowNumericDecimal(event.target.value))} onBlur={(event) => updateDepRow(row.id, 'peso', normalizeDecimal(event.target.value))} /></td>
                      <td><input className="input decimal" value={row.estatura} onChange={(event) => updateDepRow(row.id, 'estatura', allowNumericDecimal(event.target.value))} onBlur={(event) => updateDepRow(row.id, 'estatura', normalizeDecimal(event.target.value))} /></td>
                      <td><button type="button" className="btn light small" onClick={() => removeItem(depRows, setDepRows, row.id, newDepRow)}>Quitar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row-actions"><button type="button" className="btn light small" id="btnAddDep" onClick={() => setDepRows((current) => [...current, newDepRow()])}>Agregar dependiente</button></div>
          </div>
        </section>

        <section className={`wizard-step${step === 5 ? ' active' : ''}${formData.tipoFormulario === '101' ? ' is-hidden' : ''}`} data-step="5">
          <h2>Declaración de salud</h2>

          <div className={`card${isShortHealthForm(formData.tipoFormulario) ? '' : ' is-hidden'}`} id="saludCortaBlock">
            <h3>Cuestionario corto (61/62)</h3>
            <div id="saludCortaPreguntas" className={fieldErrorSet.has('saludCortaPreguntas') ? 'field-error-area' : ''}>
              {shortHealthRows.map((row) => {
                const opcionesPaciente = getOpcionesPaciente(formData, depRows)
                return (
                  <div key={row.id} className="question-card" data-question-id={row.id}>
                    <div className="field question-row">
                      <label>{row.text}</label>
                      <ToggleControl value={row.answer} onChange={(val) => updateQuestionAnswer(shortHealthRows, setShortHealthRows, row.id, val)} />
                    </div>
                    <div className={`question-detail${row.answer === 'SI' ? '' : ' is-hidden'}`}>
                      <div className="table-wrap">
                        <table className="table-grid">
                          <thead>
                            <tr>
                              <th>Especifique enfermedad</th>
                              <th>Nombre y dirección del médico tratante</th>
                              <th>¿Cuándo, duración, secuela?</th>
                              <th>Paciente/asegurado</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.detalles.map((detail) => (
                              <tr key={detail.id}>
                                <td><input className="input" value={detail.enfermedad} onChange={(event) => updateQuestionDetailRow(shortHealthRows, setShortHealthRows, row.id, detail.id, 'enfermedad', event.target.value)} /></td>
                                <td><input className="input" value={detail.medico} onChange={(event) => updateQuestionDetailRow(shortHealthRows, setShortHealthRows, row.id, detail.id, 'medico', event.target.value)} /></td>
                                <td><input className="input" value={detail.cuando} onChange={(event) => updateQuestionDetailRow(shortHealthRows, setShortHealthRows, row.id, detail.id, 'cuando', event.target.value)} /></td>
                                <td><PacienteSelect value={detail.paciente} onChange={(val) => updateQuestionDetailRow(shortHealthRows, setShortHealthRows, row.id, detail.id, 'paciente', val)} opciones={opcionesPaciente} /></td>
                                <td><button type="button" className="btn light small" onClick={() => removeQuestionDetailRow(shortHealthRows, setShortHealthRows, row.id, detail.id)}>Quitar</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row-actions">
                        <button type="button" className="btn light small" onClick={() => addQuestionDetailRow(shortHealthRows, setShortHealthRows, row.id)}>Agregar detalle</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={`card${isLongHealthForm(formData.tipoFormulario) ? '' : ' is-hidden'}`} id="saludLargaBlock">
            <h3>Ha tenido alguna vez o tiene usted, su cónyuge o sus hijos; alguna de las enfermedades o trastornos siguientes:</h3>
            <div id="saludLargaPreguntas" className={fieldErrorSet.has('saludLargaPreguntas') ? 'field-error-area' : ''}>
              {visibleLongQuestions.map((question) => {
                const row = longHealthRows.find((r) => r.id === question.id)
                const opcionesPaciente = getOpcionesPaciente(formData, depRows)
                return (
                  <div key={question.id} className="question-card" data-question-id={question.id}>
                    <div className="field question-row">
                      <label>{question.text}</label>
                      <ToggleControl value={row?.answer || 'NO'} onChange={(val) => updateQuestionAnswer(longHealthRows, setLongHealthRows, question.id, val)} />
                    </div>
                    <div className={`question-detail${row?.answer === 'SI' ? '' : ' is-hidden'}`}>
                      <div className="table-wrap">
                        <table className="table-grid">
                          <thead>
                            <tr>
                              <th>Especifique enfermedad</th>
                              <th>Nombre y dirección del médico tratante</th>
                              <th>¿Cuándo, duración, secuela?</th>
                              <th>Paciente/asegurado</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {row?.detalles.map((detail) => (
                              <tr key={detail.id}>
                                <td><input className="input" value={detail.enfermedad} onChange={(event) => updateQuestionDetailRow(longHealthRows, setLongHealthRows, question.id, detail.id, 'enfermedad', event.target.value)} /></td>
                                <td><input className="input" value={detail.medico} onChange={(event) => updateQuestionDetailRow(longHealthRows, setLongHealthRows, question.id, detail.id, 'medico', event.target.value)} /></td>
                                <td><input className="input" value={detail.cuando} onChange={(event) => updateQuestionDetailRow(longHealthRows, setLongHealthRows, question.id, detail.id, 'cuando', event.target.value)} /></td>
                                <td><PacienteSelect value={detail.paciente} onChange={(val) => updateQuestionDetailRow(longHealthRows, setLongHealthRows, question.id, detail.id, 'paciente', val)} opciones={opcionesPaciente} /></td>
                                <td><button type="button" className="btn light small" onClick={() => removeQuestionDetailRow(longHealthRows, setLongHealthRows, question.id, detail.id)}>Quitar</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row-actions">
                        <button type="button" className="btn light small" onClick={() => addQuestionDetailRow(longHealthRows, setLongHealthRows, question.id)}>Agregar detalle</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="field">
              <label htmlFor="ddlMedicamentos">¿Está tomando medicamentos en la actualidad?</label>
              <select id="ddlMedicamentos" className="input" value={formData.tomaMedicamentos} onChange={(event) => updateForm('tomaMedicamentos', event.target.value)}>
                {siNoOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>

            <div className={`card${formData.tomaMedicamentos === 'SI' ? '' : ' is-hidden'}`} id="medicamentosBlock">
              <label>Detalle de medicamentos</label>
              <div className="table-wrap">
                <table className="table-grid table-medicamentos">
                  <thead>
                    <tr><th>Nombre del asegurado</th><th>Diagnóstico</th><th>Nombre del medicamento</th><th>Dosis</th><th>Desde</th><th>Hasta</th><th></th></tr>
                  </thead>
                  <tbody id="bodyMed" className={fieldErrorSet.has('bodyMed') ? 'field-error-area' : ''}>
                    {medRows.map((row) => (
                      <tr key={row.id}>
                        <td><input className="input" value={row.asegurado} onChange={(event) => updateMedRow(row.id, 'asegurado', event.target.value)} /></td>
                        <td><input className="input" value={row.diagnostico} onChange={(event) => updateMedRow(row.id, 'diagnostico', event.target.value)} /></td>
                        <td><input className="input" value={row.medicamento} onChange={(event) => updateMedRow(row.id, 'medicamento', event.target.value)} /></td>
                        <td><input className="input" value={row.dosis} onChange={(event) => updateMedRow(row.id, 'dosis', event.target.value)} /></td>
                        <td><input className="input" type="date" value={row.desde} onChange={(event) => updateMedRow(row.id, 'desde', event.target.value)} /></td>
                        <td><input className="input" type="date" value={row.hasta} onChange={(event) => updateMedRow(row.id, 'hasta', event.target.value)} /></td>
                        <td><button type="button" className="btn light small" onClick={() => removeItem(medRows, setMedRows, row.id, newMedRow)}>Quitar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row-actions"><button type="button" id="btnAddMed" className="btn light small" onClick={() => setMedRows((current) => [...current, newMedRow()])}>Agregar medicamento</button></div>
            </div>
          </div>
        </section>

        <section className={`wizard-step${step === 6 ? ' active' : ''}`} data-step="6">
          <h2>Consentimiento y firma</h2>

          <div className="card">
            <div className="field">
              <label htmlFor="chkAceptaDeclaracion">Acepto la declaración legal <span className="required">*</span></label>
              <input id="chkAceptaDeclaracion" type="checkbox" checked={formData.aceptaDeclaracion} onChange={(event) => updateForm('aceptaDeclaracion', event.target.checked)} />
            </div>

            <div className="grid two-col">
              <div className="field"><label htmlFor="txtFirmaSolicitante">Firma solicitante (nombre completo) <span className="required">*</span></label><input id="txtFirmaSolicitante" className={`input${fieldErrorSet.has('txtFirmaSolicitante') ? ' field-error' : ''}`} maxLength={120} value={formData.firmaSolicitante} onChange={(event) => updateForm('firmaSolicitante', event.target.value)} /></div>
              <div className="field"><label htmlFor="txtFirmaPatrono">Firma y sello patrono/contratante (nombre completo) <span className="required">*</span></label><input id="txtFirmaPatrono" className={`input${fieldErrorSet.has('txtFirmaPatrono') ? ' field-error' : ''}`} maxLength={120} value={formData.firmaPatrono} onChange={(event) => updateForm('firmaPatrono', event.target.value)} /></div>
              <div className="field"><label htmlFor="txtFechaFirma">Fecha de firma <span className="required">*</span></label><input id="txtFechaFirma" className={`input${fieldErrorSet.has('txtFechaFirma') ? ' field-error' : ''}`} type="date" value={formData.fechaFirma} onChange={(event) => updateForm('fechaFirma', event.target.value)} /></div>
              <div className="field"><label htmlFor="txtObservacionesFinales">Observaciones</label><textarea id="txtObservacionesFinales" className="input" rows={3} value={formData.observacionesFinales} onChange={(event) => updateForm('observacionesFinales', event.target.value)} /></div>
            </div>
          </div>
        </section>

        <section className="wizard-nav">
          <button type="button" id="btnPrev" className="btn light" disabled={step === visibleSteps[0]} onClick={goPrev}>Anterior</button>
          <button type="button" id="btnNext" className="btn primary" disabled={step === visibleSteps[visibleSteps.length - 1] || (step === 1 && !formData.otpVerificado)} onClick={goNext}>Siguiente</button>
        </section>

        {submitVisible ? (
          <section className="actions">
            <button id="btnEnviar" className="btn primary" type="submit">Enviar</button>
          </section>
        ) : null}

        <input type="hidden" id="hfVidaJson" value={serialized.vida} readOnly />
        <input type="hidden" id="hfContJson" value={serialized.cont} readOnly />
        <input type="hidden" id="hfDepJson" value={serialized.dep} readOnly />
        <input type="hidden" id="hfTotalVida" value={totalVida.toFixed(2)} readOnly />
        <input type="hidden" id="hfTotalCont" value={totalCont.toFixed(2)} readOnly />
        <input type="hidden" id="hfSaludLargaJson" value={serialized.longHealth} readOnly />
        <input type="hidden" id="hfMedicamentosJson" value={serialized.meds} readOnly />
        <input type="hidden" id="hfSaludCortaJson" value={serialized.shortHealth} readOnly />
      </main>
    </form>
  )
}

export default App
