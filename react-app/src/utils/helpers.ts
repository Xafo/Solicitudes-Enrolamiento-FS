export const newRowId = (): string => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const hasAnyValue = (obj: Record<string, string>): boolean =>
  Object.values(obj).some((value) => value.trim() !== '')

export const isLongHealthForm = (formType: string): boolean => formType === '63' || formType === '64'

export const isShortHealthForm = (formType: string): boolean => formType === '61' || formType === '62'

export const hasDependents = (formType: string): boolean =>
  formType === '101' || formType === '63' || formType === '64'

export const isFemaleQuestion = (questionId: string): boolean =>
  questionId.startsWith('q4')
