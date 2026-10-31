import type { SVGProps } from 'react'

export function TeddyIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="7" cy="7.5" r="2.6" />
      <circle cx="17" cy="7.5" r="2.6" />
      <circle cx="12" cy="13" r="6.4" />
      <circle cx="10" cy="11.8" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="14" cy="11.8" r="0.85" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="14.2" rx="1.1" ry="0.8" fill="currentColor" stroke="none" />
      <path d="M12 15v1" />
      <path d="M10.9 16.6c.35.4 1.85.4 2.2 0" />
    </svg>
  )
}
