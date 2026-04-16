import { useFormStore } from '../../store'
import { Stepper } from './Stepper'
import { Step1_Poliza } from './Step1_Poliza'
import { Step2_Asegurado } from './Step2_Asegurado'
import { Step3_Direccion } from './Step3_Direccion'
import { Step4_Beneficiarios } from './Step4_Beneficiarios'
import { Step5_Salud } from './Step5_Salud'
import { Step6_Consentimiento } from './Step6_Consentimiento'
import { WizardNav } from './WizardNav'
import type { Step } from '../../types'

export function WizardContainer() {
  const { step } = useFormStore()

  const renderStep = () => {
    const stepClass = (s: Step) => `wizard-step${step === s ? ' active' : ''}`

    switch (step) {
      case 1:
        return <div className={stepClass(1)}><Step1_Poliza /></div>
      case 2:
        return <div className={stepClass(2)}><Step2_Asegurado /></div>
      case 3:
        return <div className={stepClass(3)}><Step3_Direccion /></div>
      case 4:
        return <div className={stepClass(4)}><Step4_Beneficiarios /></div>
      case 5:
        return <div className={stepClass(5)}><Step5_Salud /></div>
      case 6:
        return <div className={stepClass(6)}><Step6_Consentimiento /></div>
      default:
        return null
    }
  }

  return (
    <>
      <Stepper />
      {renderStep()}
      <WizardNav />
    </>
  )
}
