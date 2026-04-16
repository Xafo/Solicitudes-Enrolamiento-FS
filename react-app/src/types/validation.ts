export type ValidationError = {
  message: string
  fieldId: string
  stepNumber: number
}

export type FieldValidation = {
  fieldId: string
  stepNumber: number
}
