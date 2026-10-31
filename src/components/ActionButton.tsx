import type { ActionIcon } from '../data/actions'

type ActionButtonProps = {
  icon: ActionIcon
  label: string
  hint: string
  onClick?: () => void
}

export function ActionButton({
  icon: Icon,
  label,
  hint,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={hint}
      className="group flex flex-col items-center gap-1.5 rounded-2xl px-1 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush/50 sm:gap-2.5 sm:py-2"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/80 bg-white/80 text-blush-deep shadow-[0_8px_20px_-12px_rgba(207,79,118,0.55)] group-hover:border-blush-deep/10 group-hover:bg-blush-deep group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
        <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
      </span>
      <span className="min-h-[2.4em] text-center text-[10px] font-semibold leading-[1.15] tracking-wide text-ink-soft group-hover:text-blush-deep sm:min-h-0 sm:text-xs">
        {label}
      </span>
    </button>
  )
}
