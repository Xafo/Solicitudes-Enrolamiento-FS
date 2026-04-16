import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  required?: boolean
  helpText?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, helpText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="font-semibold text-sm text-gray-700 flex items-center gap-1">
            {label}
            {required && <span className="text-ficohsa-red">*</span>}
            {helpText && (
              <span
                className="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-200 text-gray-600 cursor-help"
                title={helpText}
              >
                ?
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-ficohsa-blue/20 focus:border-ficohsa-blue
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-ficohsa-red ring-2 ring-ficohsa-red/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
    )
  }
)

InputField.displayName = 'InputField'
