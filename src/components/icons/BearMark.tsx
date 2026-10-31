import type { SVGProps } from 'react'

export function BearMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="6.5" cy="6.5" r="2.6" fill="currentColor" />
      <circle cx="17.5" cy="6.5" r="2.6" fill="currentColor" />
      <circle cx="12" cy="12.5" r="7" fill="currentColor" />
      <circle cx="9.6" cy="11" r="0.9" fill="#fff" />
      <circle cx="14.4" cy="11" r="0.9" fill="#fff" />
      <ellipse cx="12" cy="14.4" rx="1.4" ry="1" fill="#fff" />
      <path
        d="M12 15.2v1.1M10.8 16.8c.4.45 2 .45 2.4 0"
        stroke="#fff"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
