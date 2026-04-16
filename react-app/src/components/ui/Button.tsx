import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'light' | 'danger'
  size?: 'small' | 'default'
}

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-ficohsa-blue text-white hover:bg-ficohsa-blue/90',
    light: 'bg-blue-50 text-ficohsa-blue hover:bg-blue-100',
    danger: 'bg-ficohsa-red text-white hover:bg-ficohsa-red/90',
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2.5 text-sm',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
