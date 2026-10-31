import { useEffect, useRef } from 'react'
import type { ActionId } from '../data/actions'
import { cn } from '../lib/cn'
import { HeartIcon } from './icons/HeartIcon'
import { ReactionOverlay } from './ReactionOverlay'
import { TeddyIllustration } from './TeddyIllustration'

type IllustrationStageProps = {
  reaction: { id: ActionId; key: number } | null
}

const animationClasses = ['is-hugging', 'is-dancing', 'is-celebrating']

function getAnimationClass(id: ActionId) {
  if (id === 'hug') return 'is-hugging'
  if (id === 'dance') return 'is-dancing'
  return 'is-celebrating'
}

export function IllustrationStage({ reaction }: IllustrationStageProps) {
  const teddyRef = useRef<SVGSVGElement>(null)
  const animationClass = reaction ? getAnimationClass(reaction.id) : ''

  useEffect(() => {
    const teddy = teddyRef.current
    if (!teddy) return

    teddy.classList.remove(...animationClasses)

    if (!reaction) return

    void teddy.getBoundingClientRect()
    teddy.classList.add(getAnimationClass(reaction.id))

    return () => {
      teddy.classList.remove(...animationClasses)
    }
  }, [reaction])

  return (
    <div className="relative isolate flex h-64 items-center justify-center overflow-hidden rounded-[22px] border border-white/60 bg-gradient-to-b from-[#ffe7ee] via-[#ffdfe9] to-[#ffd3e0] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-72 sm:rounded-[30px] md:h-80">
      <div aria-hidden="true" className="absolute inset-0">
        <span className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="absolute right-[16%] top-[26%] h-2 w-2 rounded-full bg-white/60" />
        <span className="absolute bottom-[22%] left-[22%] h-1.5 w-1.5 rounded-full bg-blush/30" />
        <HeartIcon className="absolute right-[10%] top-[14%] h-5 w-5 rotate-12 text-white/50 sm:h-6 sm:w-6" />
        <HeartIcon className="absolute left-[9%] top-[36%] h-3.5 w-3.5 -rotate-12 text-blush/30 sm:h-4 sm:w-4" />
        <HeartIcon className="absolute bottom-[16%] left-[14%] h-4 w-4 -rotate-6 text-white/40 sm:h-5 sm:w-5" />
        <HeartIcon className="absolute bottom-[24%] right-[13%] h-6 w-6 rotate-6 text-blush/25 sm:h-8 sm:w-8" />
      </div>

      <span className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-blush-deep backdrop-blur-sm sm:left-5 sm:top-5 sm:px-3 sm:text-[11px]">
        <HeartIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        for you, always
      </span>

      <TeddyIllustration
        svgRef={teddyRef}
        className={cn(
          'relative z-10 h-[86%] drop-shadow-[0_18px_24px_rgba(207,79,118,0.12)]',
          animationClass,
        )}
      />

      {reaction ? (
        <ReactionOverlay
          key={`${reaction.id}-${reaction.key}`}
          action={reaction.id}
        />
      ) : null}
    </div>
  )
}
