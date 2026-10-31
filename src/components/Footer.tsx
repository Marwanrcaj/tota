type FooterProps = {
  muted: boolean
}

export function Footer({ muted }: FooterProps) {
  return (
    <footer className="border-t border-white/60 px-4 py-3.5 text-center sm:px-7 sm:py-5">
      <p className="text-balance text-[11px] leading-relaxed text-ink-soft sm:text-xs">
        Tap a button to send some love · {muted ? 'sound off' : 'sound on'}
      </p>
    </footer>
  )
}
