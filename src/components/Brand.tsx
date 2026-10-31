import { BearMark } from './icons/BearMark'

export function Brand() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/80 bg-white/80 text-blush-deep shadow-[0_8px_20px_-12px_rgba(207,79,118,0.6)] sm:h-11 sm:w-11 sm:rounded-2xl">
        <BearMark className="h-5 w-5 sm:h-7 sm:w-7" />
      </span>
      <div className="leading-none">
        <p className="font-display text-lg font-semibold tracking-tight text-ink sm:text-2xl">
          bear <span className="italic text-blush-deep">love</span>
        </p>
        <p className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft/80 sm:block">
          made with love
        </p>
      </div>
    </div>
  )
}
