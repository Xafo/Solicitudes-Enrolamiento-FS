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
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="font-semibold text-sm text-gray-700">
            {label}
            {required && <span className="text-ficohsa-red">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-ficohsa-blue/20 focus:border-ficohsa-blue
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-ficohsa-red ring-2 ring-ficohsa-red/20' : ''}
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
