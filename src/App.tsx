import { useEffect, useRef, useState } from 'react'
import { ActionBar } from './components/ActionBar'
import { Brand } from './components/Brand'
import { Card } from './components/Card'
import { Footer } from './components/Footer'
import { IllustrationStage } from './components/IllustrationStage'
import { VolumeControl } from './components/VolumeControl'
import type { ActionId } from './data/actions'
import { soundEngine } from './lib/sound'

const REACTION_DURATION = 6200

const announcements: Record<ActionId, string> = {
  love: 'I love you. Today, tomorrow, always.',
  wife: 'My Wife. Forever and always.',
  hug: 'A big bear hug, just for you.',
  dance: 'Dance with me.',
  surprise: 'A little surprise, just for you.',
}

function App() {
  const [volume, setVolume] = useState(60)
  const [muted, setMuted] = useState(false)
  const [reaction, setReaction] = useState<{
    id: ActionId
    key: number
  } | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleVolumeChange = (value: number) => {
    setVolume(value)
    setMuted(false)
    soundEngine.setVolume(value)
    soundEngine.setMuted(false)
  }

  const handleToggleMute = () => {
    setMuted((current) => {
      const next = !current
      soundEngine.setMuted(next)
      return next
    })
  }

  const handleSelect = (id: ActionId) => {
    soundEngine.play(id)
    setReaction((current) => ({ id, key: (current?.key ?? 0) + 1 }))

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      setReaction(null)
      timerRef.current = null
    }, REACTION_DURATION)
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-3 py-5 sm:px-6 sm:py-10">
      <span className="sr-only" role="status" aria-live="polite">
        {reaction ? announcements[reaction.id] : ''}
      </span>

      <Card>
        <header className="flex items-center justify-between gap-2 px-4 pt-4 sm:gap-6 sm:px-7 sm:pt-7 md:px-9 md:pt-8">
          <Brand />
          <VolumeControl
            volume={volume}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={handleToggleMute}
          />
        </header>

        <div className="px-4 pt-4 sm:px-7 sm:pt-6 md:px-9 md:pt-7">
          <IllustrationStage reaction={reaction} />
        </div>

        <section
          aria-label="Send some love"
          className="px-4 pb-4 pt-4 sm:px-7 sm:pb-6 sm:pt-6 md:px-9 md:pb-7 md:pt-7"
        >
          <ActionBar onSelect={handleSelect} />
        </section>

        <Footer muted={muted} />
      </Card>
    </main>
  )
}

export default App
