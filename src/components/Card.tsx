import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/70 bg-white/70 shadow-[0_30px_80px_-30px_rgba(207,79,118,0.35),0_2px_8px_rgba(75,43,54,0.04)] backdrop-blur-xl sm:rounded-[44px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
