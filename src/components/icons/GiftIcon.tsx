import type { SVGProps } from 'react'

export function GiftIcon(props: SVGProps<SVGSVGElement>) {
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
      <rect x="4" y="9.5" width="16" height="10.5" rx="1.8" />
      <path d="M3.5 9.5h17" />
      <path d="M12 9.5V20" />
      <path d="M12 9.5S11.4 5.5 9 5.5a2 2 0 0 0 0 4h3Z" />
      <path d="M12 9.5s.6-4 3-4a2 2 0 0 1 0 4h-3Z" />
    </svg>
  )
}
