import { useFormStore } from '../../store'
import type { Step } from '../../types'

const stepTitles: Record<Step, string> = {
  1: 'Póliza',
  2: 'Asegurado',
  3: 'Dirección',
  4: 'Beneficiarios',
  5: 'Salud',
  6: 'Consentimiento',
}

export function Stepper() {
  const { step, setStep, getVisibleSteps } = useFormStore()
  const visibleSteps = getVisibleSteps()

  return (
    <ul className="stepper">
      {visibleSteps.map((tabStep) => {
        const isActive = step === tabStep
        return (
          <li
            key={tabStep}
            data-step={tabStep}
            onClick={() => setStep(tabStep)}
            className={isActive ? 'active' : ''}
          >
            {stepTitles[tabStep]}
          </li>
        )
      })}
    </ul>
  )
}
