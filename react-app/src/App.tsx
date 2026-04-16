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
      <main className="min-h-screen py-6 px-4">
        <div className="container">
          <header className="header pb-4 border-b border-border-light">
            <h1>Solicitud electrónica</h1>
            <p>Canal digital - validaciones finales</p>
          </header>

          {message && (
            <div className={`message ${messageClass === 'ok' ? 'ok' : 'error'}`}>
              {message}
            </div>
          )}

          {errors.length > 0 && (
            <ul className="error-list">
              {Array.from(new Set(errors.map((error) => error.message))).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <WizardContainer />

          <div className="wizard-nav">
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
