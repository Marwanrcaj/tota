import type { CSSProperties } from 'react'
import type { ActionId } from '../data/actions'
import { cn } from '../lib/cn'
import { DanceIcon } from './icons/DanceIcon'
import { GiftIcon } from './icons/GiftIcon'
import { HeartIcon } from './icons/HeartIcon'
import { RingIcon } from './icons/RingIcon'

type FloatingBit = {
  left: string
  bottom: string
  size: string
  delay: string
  duration: string
  rotation: string
  tone: string
}

type FloatStyle = CSSProperties & {
  '--float-rot'?: string
}

const floatingBits: FloatingBit[] = [
  {
    left: '8%',
    bottom: '6%',
    size: 'h-3 w-3',
    delay: '0s',
    duration: '3.6s',
    rotation: '-14deg',
    tone: 'text-white/70',
  },
  {
    left: '18%',
    bottom: '20%',
    size: 'h-4 w-4',
    delay: '1.1s',
    duration: '4.2s',
    rotation: '12deg',
    tone: 'text-blush/40',
  },
  {
    left: '27%',
    bottom: '10%',
    size: 'h-2.5 w-2.5',
    delay: '2.2s',
    duration: '3.4s',
    rotation: '-8deg',
    tone: 'text-white/60',
  },
  {
    left: '38%',
    bottom: '24%',
    size: 'h-3.5 w-3.5',
    delay: '0.6s',
    duration: '3.9s',
    rotation: '18deg',
    tone: 'text-blush/35',
  },
  {
    left: '62%',
    bottom: '18%',
    size: 'h-3 w-3',
    delay: '1.7s',
    duration: '4.1s',
    rotation: '-16deg',
    tone: 'text-white/60',
  },
  {
    left: '72%',
    bottom: '8%',
    size: 'h-4 w-4',
    delay: '0.3s',
    duration: '3.7s',
    rotation: '10deg',
    tone: 'text-blush/40',
  },
  {
    left: '82%',
    bottom: '22%',
    size: 'h-2.5 w-2.5',
    delay: '2.6s',
    duration: '3.5s',
    rotation: '-10deg',
    tone: 'text-white/70',
  },
  {
    left: '90%',
    bottom: '12%',
    size: 'h-3.5 w-3.5',
    delay: '1.4s',
    duration: '4s',
    rotation: '14deg',
    tone: 'text-blush/30',
  },
]

const cardBase =
  'animate-pop-in rounded-2xl border border-white/80 bg-white/85 shadow-[0_18px_40px_-22px_rgba(207,79,118,0.6)] backdrop-blur-md'

type ReactionOverlayProps = {
  action: ActionId
}

export function ReactionOverlay({ action }: ReactionOverlayProps) {
  const isDance = action === 'dance'
  const BitIcon = isDance ? DanceIcon : HeartIcon

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      <div className="absolute inset-0">
        {floatingBits.map((bit, index) => (
          <BitIcon
            key={`${action}-${index}`}
            className={cn('reaction-float absolute', bit.size, bit.tone)}
            style={
              {
                left: bit.left,
                bottom: bit.bottom,
                animationDelay: bit.delay,
                animationDuration: bit.duration,
                '--float-rot': bit.rotation,
              } as FloatStyle
            }
          />
        ))}
      </div>

      {action === 'surprise' ? <GiftReveal /> : null}

      <div className="absolute inset-x-0 bottom-3 flex justify-center px-3 sm:bottom-5">
        <ReactionMessage action={action} />
      </div>
    </div>
  )
}

function GiftReveal() {
  return (
    <div className="animate-gift-pop absolute right-[7%] top-[12%] sm:right-[12%] sm:top-[14%]">
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/80 bg-white/85 text-blush-deep shadow-[0_14px_30px_-16px_rgba(207,79,118,0.6)] backdrop-blur-sm sm:h-14 sm:w-14">
        <GiftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
        <span className="animate-sparkle absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white" />
        <span
          className="animate-sparkle absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-full bg-blush/70"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    </div>
  )
}

function ReactionMessage({ action }: { action: ActionId }) {
  switch (action) {
    case 'love':
      return (
        <div
          className={cn(
            cardBase,
            'flex flex-col items-center px-4 py-2.5 text-center sm:px-6 sm:py-3.5',
          )}
        >
          <p className="font-display text-xl italic leading-none text-blush-deep sm:text-3xl">
            I love you
          </p>
          <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:text-[11px]">
            today, tomorrow, always
          </p>
        </div>
      )
    case 'wife':
      return (
        <div
          className={cn(
            cardBase,
            'flex items-center gap-2.5 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3.5',
          )}
        >
          <span className="animate-sparkle grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush-soft text-blush-deep sm:h-11 sm:w-11">
            <RingIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <div className="text-left">
            <p className="font-display text-lg italic leading-none text-blush-deep sm:text-2xl">
              My Wife
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-soft sm:text-[10px]">
              forever &amp; always
            </p>
          </div>
        </div>
      )
    case 'hug':
      return (
        <div
          className={cn(
            cardBase,
            'flex items-center gap-2 rounded-full px-4 py-2 sm:gap-2.5 sm:px-5 sm:py-2.5',
          )}
        >
          <HeartIcon className="h-3.5 w-3.5 text-blush sm:h-4 sm:w-4" />
          <p className="font-display text-base italic leading-none text-blush-deep sm:text-xl">
            a big bear hug
          </p>
          <HeartIcon className="h-3.5 w-3.5 text-blush sm:h-4 sm:w-4" />
        </div>
      )
    case 'dance':
      return (
        <div
          className={cn(
            cardBase,
            'flex items-center gap-2 rounded-full px-4 py-2 sm:gap-2.5 sm:px-5 sm:py-2.5',
          )}
        >
          <DanceIcon className="animate-bob h-4 w-4 text-blush-deep sm:h-5 sm:w-5" />
          <p className="font-display text-base italic leading-none text-blush-deep sm:text-xl">
            dance with me
          </p>
          <DanceIcon
            className="animate-bob h-4 w-4 text-blush-deep sm:h-5 sm:w-5"
            style={{ animationDelay: '0.3s' }}
          />
        </div>
      )
    case 'surprise':
      return (
        <div
          className={cn(
            cardBase,
            'flex items-center gap-2.5 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3.5',
          )}
        >
          <span className="animate-gift-pop grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-blush-soft text-blush-deep sm:h-11 sm:w-11">
            <GiftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <div className="text-left">
            <p className="font-display text-lg italic leading-none text-blush-deep sm:text-2xl">
              A little surprise
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-soft sm:text-[10px]">
              just for you
            </p>
          </div>
        </div>
      )
    default:
      return null
  }
}
