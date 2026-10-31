import type { Ref } from 'react'
import { cn } from '../lib/cn'

type TeddyIllustrationProps = {
  className?: string
  svgRef?: Ref<SVGSVGElement>
}

export function TeddyIllustration({
  className,
  svgRef,
}: TeddyIllustrationProps) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 340"
      role="img"
      aria-label="A brown teddy bear with rosy cheeks holding a pink heart"
      className={cn('teddy w-auto', className)}
    >
      <defs>
        <radialGradient id="teddy-fur" cx="38%" cy="24%" r="88%">
          <stop offset="0%" stopColor="#e9bd9e" />
          <stop offset="52%" stopColor="#d9a687" />
          <stop offset="100%" stopColor="#c68d6d" />
        </radialGradient>
        <radialGradient id="teddy-muzzle" cx="45%" cy="32%" r="82%">
          <stop offset="0%" stopColor="#fdf4ec" />
          <stop offset="100%" stopColor="#f6dfcf" />
        </radialGradient>
        <radialGradient id="teddy-cheek">
          <stop offset="0%" stopColor="#f28ba3" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#f28ba3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="teddy-heart" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f390ac" />
          <stop offset="100%" stopColor="#d9527b" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="320" rx="92" ry="12" fill="#d38aa0" opacity="0.26" />

      <ellipse cx="116" cy="290" rx="35" ry="31" fill="url(#teddy-fur)" />
      <ellipse cx="204" cy="290" rx="35" ry="31" fill="url(#teddy-fur)" />
      <ellipse cx="116" cy="294" rx="18" ry="14" fill="#f9e6d8" />
      <ellipse cx="204" cy="294" rx="18" ry="14" fill="#f9e6d8" />
      <circle cx="108" cy="286" r="2.2" fill="#eccbb6" />
      <circle cx="116" cy="284" r="2.2" fill="#eccbb6" />
      <circle cx="124" cy="286" r="2.2" fill="#eccbb6" />
      <circle cx="196" cy="286" r="2.2" fill="#eccbb6" />
      <circle cx="204" cy="284" r="2.2" fill="#eccbb6" />
      <circle cx="212" cy="286" r="2.2" fill="#eccbb6" />

      <ellipse cx="160" cy="242" rx="76" ry="68" fill="url(#teddy-fur)" />
      <ellipse
        cx="160"
        cy="252"
        rx="46"
        ry="42"
        fill="url(#teddy-muzzle)"
        opacity="0.75"
      />

      <ellipse
        cx="96"
        cy="226"
        rx="24"
        ry="46"
        transform="rotate(22 96 226)"
        fill="url(#teddy-fur)"
      />
      <ellipse
        cx="224"
        cy="226"
        rx="24"
        ry="46"
        transform="rotate(-22 224 226)"
        fill="url(#teddy-fur)"
      />

      <circle cx="98" cy="80" r="29" fill="url(#teddy-fur)" />
      <circle cx="222" cy="80" r="29" fill="url(#teddy-fur)" />
      <circle cx="98" cy="80" r="16" fill="#f2b8b0" />
      <circle cx="222" cy="80" r="16" fill="#f2b8b0" />

      <circle cx="160" cy="136" r="76" fill="url(#teddy-fur)" />
      <ellipse
        cx="134"
        cy="92"
        rx="26"
        ry="16"
        transform="rotate(-24 134 92)"
        fill="#fff"
        opacity="0.12"
      />

      <ellipse cx="160" cy="160" rx="40" ry="31" fill="url(#teddy-muzzle)" />

      <ellipse cx="110" cy="152" rx="20" ry="14" fill="url(#teddy-cheek)" />
      <ellipse cx="210" cy="152" rx="20" ry="14" fill="url(#teddy-cheek)" />

      <ellipse cx="131" cy="124" rx="11" ry="14" fill="#3b232c" />
      <ellipse cx="189" cy="124" rx="11" ry="14" fill="#3b232c" />
      <circle cx="127.5" cy="118" r="4" fill="#fff" />
      <circle cx="185.5" cy="118" r="4" fill="#fff" />
      <circle cx="134.5" cy="129.5" r="1.9" fill="#fff" opacity="0.9" />
      <circle cx="192.5" cy="129.5" r="1.9" fill="#fff" opacity="0.9" />

      <ellipse cx="160" cy="151" rx="10.5" ry="7.5" fill="#4b2b36" />
      <ellipse cx="156.5" cy="148.5" rx="3" ry="2" fill="#fff" opacity="0.25" />
      <path
        d="M160 158v8M146 171c5 7 23 7 28 0"
        stroke="#4b2b36"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M160 283c-8-6-48-32-48-60 0-18 14-30 30-30 8 0 15 4 18 11 3-7 10-11 18-11 16 0 30 12 30 30 0 28-40 54-48 60Z"
        fill="url(#teddy-heart)"
      />
      <ellipse
        cx="138"
        cy="218"
        rx="7"
        ry="11"
        transform="rotate(-26 138 218)"
        fill="#fff"
        opacity="0.22"
      />

      <ellipse
        cx="124"
        cy="250"
        rx="16"
        ry="14"
        fill="#f9e6d8"
        className="teddy-paw-left"
      />
      <ellipse
        cx="196"
        cy="250"
        rx="16"
        ry="14"
        fill="#f9e6d8"
        className="teddy-paw-right"
      />
      <path
        d="M117 246c1.2 2.2 3.4 2.2 4.6 0M125 246c1.2 2.2 3.4 2.2 4.6 0M189 246c1.2 2.2 3.4 2.2 4.6 0M197 246c1.2 2.2 3.4 2.2 4.6 0"
        stroke="#e3bda7"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
