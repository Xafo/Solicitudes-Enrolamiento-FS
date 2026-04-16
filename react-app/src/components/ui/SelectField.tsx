import { forwardRef, type SelectHTMLAttributes } from 'react'
import type { FormOption } from '../../types'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: FormOption[]
  error?: boolean
  required?: boolean
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, required, className = '', ...props }, ref) => {
    return (
      <div className="field">
        {label && (
          <label className="font-semibold text-sm flex items-center gap-1">
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            input
            ${error ? 'field-error' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

SelectField.displayName = 'SelectField'
