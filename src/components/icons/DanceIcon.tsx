import type { SVGProps } from 'react'

export function DanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 17V6.2l9-2v10" />
      <path d="m9 9.2 9-2" />
      <ellipse cx="6.5" cy="17.5" rx="2.5" ry="2" fill="currentColor" stroke="none" />
      <ellipse cx="15.5" cy="15.5" rx="2.5" ry="2" fill="currentColor" stroke="none" />
    </svg>
  )
}
