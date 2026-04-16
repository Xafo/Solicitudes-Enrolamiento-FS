import { useFormStore } from '../../store'
import { Button } from '../ui'

export function WizardNav() {
  const { step, goNext, goPrev, getVisibleSteps } = useFormStore()
  const visibleSteps = getVisibleSteps()

  const isFirst = step === visibleSteps[0]
  const isLast = step === visibleSteps[visibleSteps.length - 1]

  return (
    <div className="wizard-nav">
      <Button
        variant="light"
        onClick={goPrev}
        disabled={isFirst}
      >
        Anterior
      </Button>
      <Button
        variant="light"
        onClick={goNext}
        disabled={isLast}
      >
        Siguiente
      </Button>
    </div>
  )
}
