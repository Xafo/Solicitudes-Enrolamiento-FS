import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`border border-gray-200 rounded-xl p-3 mb-3 ${className}`}>
      {title && (
        <h3 className="text-base font-semibold text-ficohsa-blue mb-2.5">{title}</h3>
      )}
      {children}
    </div>
  )
}
