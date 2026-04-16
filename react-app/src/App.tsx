import type { FormEventHandler } from 'react'
import { useFormStore } from './store'
import { WizardContainer } from './components/wizard'
import { Button } from './components/ui'

function App() {
  const { errors, message, messageClass, validate, setErrors, setMessage, setStep, getSerializedData } = useFormStore()

  const serialized = getSerializedData()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      const first = validationErrors[0]
      setStep(first.stepNumber as 1 | 2 | 3 | 4 | 5 | 6)
      setMessage(first.message, 'error')
      return
    }

    setMessage('Solicitud enviada correctamente.', 'ok')
  }

  return (
    <form id="form1" onSubmit={handleSubmit}>
      <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 py-6 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <header className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-ficohsa-blue m-0">Solicitud electrónica</h1>
            <p className="text-gray-500 text-sm mt-1 mb-0">Canal digital - validaciones finales</p>
          </header>

          {message && (
            <div
              className={`
                mb-4 p-3 rounded-lg font-semibold text-sm
                ${messageClass === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              `}
            >
              {message}
            </div>
          )}

          {errors.length > 0 && (
            <ul className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm">
              {Array.from(new Set(errors.map((error) => error.message))).map((error) => (
                <li key={error} className="text-red-700 my-1">{error}</li>
              ))}
            </ul>
          )}

          <WizardContainer />

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </div>

          <input type="hidden" id="hfVidaJson" value={serialized.vida} readOnly />
          <input type="hidden" id="hfContJson" value={serialized.cont} readOnly />
          <input type="hidden" id="hfDepJson" value={serialized.dep} readOnly />
          <input type="hidden" id="hfSaludLargaJson" value={serialized.longHealth} readOnly />
          <input type="hidden" id="hfMedicamentosJson" value={serialized.meds} readOnly />
          <input type="hidden" id="hfSaludCortaJson" value={serialized.shortHealth} readOnly />
        </div>
      </main>
    </form>
  )
}

export default App
