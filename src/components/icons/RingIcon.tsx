import type { SVGProps } from 'react'

export function RingIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3.5 15.2 8H8.8L12 3.5Z" />
      <path d="M8.8 8h6.4" />
      <circle cx="12" cy="15" r="4.5" />
    </svg>
  )
}
