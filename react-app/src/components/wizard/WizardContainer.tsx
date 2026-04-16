import { useFormStore } from '../../store'
import { Stepper } from './Stepper'
import { Step1_Poliza } from './Step1_Poliza'
import { Step2_Asegurado } from './Step2_Asegurado'
import { Step3_Direccion } from './Step3_Direccion'
import { Step4_Beneficiarios } from './Step4_Beneficiarios'
import { Step5_Salud } from './Step5_Salud'
import { Step6_Consentimiento } from './Step6_Consentimiento'
import { WizardNav } from './WizardNav'


export function WizardContainer() {
  const { step } = useFormStore()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_Poliza />
      case 2:
        return <Step2_Asegurado />
      case 3:
        return <Step3_Direccion />
      case 4:
        return <Step4_Beneficiarios />
      case 5:
        return <Step5_Salud />
      case 6:
        return <Step6_Consentimiento />
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
