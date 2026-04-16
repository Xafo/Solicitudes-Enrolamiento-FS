import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h3 className="text-base font-semibold text-ficohsa-blue m-0 mb-2.5">{title}</h3>
      )}
      {children}
    </div>
  )
}
