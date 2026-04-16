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
    <ul className="grid grid-cols-3 md:grid-cols-6 gap-2 list-none p-0 mb-4">
      {visibleSteps.map((tabStep) => {
        const isActive = step === tabStep
        return (
          <li
            key={tabStep}
            data-step={tabStep}
            onClick={() => setStep(tabStep)}
            className={`
              border rounded-xl p-2.5 text-center font-semibold text-sm cursor-pointer
              transition-all
              ${isActive 
                ? 'border-ficohsa-blue bg-ficohsa-blue text-white shadow-md' 
                : 'border-gray-300 bg-white text-gray-700 hover:border-ficohsa-blue/50'}
            `}
          >
            {stepTitles[tabStep]}
          </li>
        )
      })}
    </ul>
  )
}
