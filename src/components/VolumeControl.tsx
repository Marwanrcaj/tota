import { useId } from 'react'
import { SpeakerIcon } from './icons/SpeakerIcon'

type VolumeControlProps = {
  volume: number
  muted: boolean
  onVolumeChange: (value: number) => void
  onToggleMute: () => void
}

export function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) {
  const sliderId = useId()
  const percentage = muted ? 0 : volume

  return (
    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/70 bg-white/60 p-1 pl-1.5 shadow-[0_6px_18px_-12px_rgba(207,79,118,0.5)] sm:gap-2 sm:p-1.5 sm:pl-2">
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute sound' : 'Mute sound'}
        aria-pressed={muted}
        title={muted ? 'Unmute sound' : 'Mute sound'}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-blush/10 hover:text-blush-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush/50 sm:h-8 sm:w-8"
      >
        <SpeakerIcon
          muted={muted}
          className="h-[18px] w-[18px] sm:h-5 sm:w-5"
        />
      </button>

      <label htmlFor={sliderId} className="sr-only">
        Volume
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={100}
        value={percentage}
        onChange={(event) => onVolumeChange(Number(event.target.value))}
        className="volume-slider w-14 sm:w-24"
        style={{
          background: `linear-gradient(to right, #e2688a ${percentage}%, #f6dde4 ${percentage}%)`,
        }}
      />

      <span className="hidden w-9 text-right text-[11px] font-semibold tabular-nums text-ink-soft sm:inline">
        {percentage}%
      </span>
    </div>
  )
}
