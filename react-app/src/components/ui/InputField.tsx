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
      <div className="field">
        {label && (
          <label className="font-semibold text-sm flex items-center gap-1">
            {label}
            {required && <span className="required">*</span>}
            {helpText && (
              <span className="help" title={helpText}>
                ?
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          className={`
            input
            ${error ? 'field-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
    )
  }
)

InputField.displayName = 'InputField'
