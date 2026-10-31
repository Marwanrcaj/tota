import type { SVGProps } from 'react'

type SpeakerIconProps = SVGProps<SVGSVGElement> & {
  muted?: boolean
}

export function SpeakerIcon({ muted = false, ...props }: SpeakerIconProps) {
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
      <path d="M4 9.5v5a1 1 0 0 0 1 1h2.5l4.1 3.2a1 1 0 0 0 1.6-.8V6.1a1 1 0 0 0-1.6-.8L7.5 8.5H5a1 1 0 0 0-1 1Z" />
      {muted ? (
        <>
          <path d="m17 9 4 4" />
          <path d="m21 9-4 4" />
        </>
      ) : (
        <>
          <path d="M17 8.4a5 5 0 0 1 0 7.2" />
          <path d="M19.5 6a8.5 8.5 0 0 1 0 12" />
        </>
      )}
    </svg>
  )
}
