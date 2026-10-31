export type SoundId = 'love' | 'wife' | 'hug' | 'dance' | 'surprise'

const midiToHz = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

type ToneOptions = {
  type?: OscillatorType
  gain?: number
  attack?: number
  release?: number
  detune?: number
  filter?: number
}

class SoundEngine {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private bus: GainNode | null = null
  private volume = 0.6
  private muted = false
  private stopTimer: number | null = null

  setVolume(value: number) {
    this.volume = Math.min(1, Math.max(0, value / 100))
    this.applyMasterGain()
  }

  setMuted(muted: boolean) {
    this.muted = muted
    this.applyMasterGain()
  }

  play(id: SoundId) {
    const context = this.getContext()
    if (!context || !this.master) return

    this.stopBus()

    const bus = context.createGain()
    bus.gain.value = 1
    bus.connect(this.master)
    this.bus = bus

    const start = context.currentTime + 0.06

    switch (id) {
      case 'love':
        this.playLove(start)
        break
      case 'wife':
        this.playWife(start)
        break
      case 'hug':
        this.playHug(start)
        break
      case 'dance':
        this.playDance(start)
        break
      case 'surprise':
        this.playSurprise(start)
        break
    }

    this.stopTimer = window.setTimeout(() => this.stopBus(), 6400)
  }

  private getContext(): AudioContext | null {
    if (!this.context) {
      try {
        this.context = new AudioContext()
      } catch {
        return null
      }
      this.master = this.context.createGain()
      this.master.gain.value = this.muted ? 0 : this.volume * 0.5
      this.master.connect(this.context.destination)
    }

    if (this.context.state === 'suspended') {
      void this.context.resume().catch(() => undefined)
    }

    return this.context
  }

  private applyMasterGain() {
    if (!this.context || !this.master) return
    const target = this.muted ? 0 : this.volume * 0.5
    const now = this.context.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(target, now, 0.02)
  }

  private stopBus() {
    if (this.stopTimer !== null) {
      window.clearTimeout(this.stopTimer)
      this.stopTimer = null
    }

    if (!this.context || !this.bus) return

    const bus = this.bus
    this.bus = null
    const now = this.context.currentTime
    bus.gain.cancelScheduledValues(now)
    bus.gain.setValueAtTime(bus.gain.value, now)
    bus.gain.linearRampToValueAtTime(0, now + 0.08)
    window.setTimeout(() => bus.disconnect(), 250)
  }

  private tone(
    at: number,
    midi: number,
    duration: number,
    options: ToneOptions = {},
  ) {
    if (!this.context || !this.bus) return

    const context = this.context
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const filter = context.createBiquadFilter()

    const peak = options.gain ?? 0.1
    const attack = Math.min(options.attack ?? 0.015, duration * 0.5)
    const release = Math.min(options.release ?? 0.25, duration * 0.6)
    const sustainAt = Math.max(at + attack, at + duration - release)

    oscillator.type = options.type ?? 'sine'
    oscillator.frequency.setValueAtTime(midiToHz(midi), at)
    if (options.detune) {
      oscillator.detune.setValueAtTime(options.detune, at)
    }

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(options.filter ?? 7000, at)

    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(peak, at + attack)
    gain.gain.setValueAtTime(peak, sustainAt)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)

    oscillator.connect(filter)
    filter.connect(gain)
    gain.connect(this.bus)
    oscillator.start(at)
    oscillator.stop(at + duration + 0.05)
  }

  private pad(at: number, notes: number[], duration: number, gain = 0.03) {
    for (const midi of notes) {
      this.tone(at, midi, duration, {
        type: 'triangle',
        gain,
        attack: 0.45,
        release: Math.min(1.4, duration * 0.55),
        filter: 2400,
      })
    }
  }

  private noise(
    at: number,
    duration: number,
    gainValue = 0.02,
    highpass = 6500,
  ) {
    if (!this.context || !this.bus) return

    const context = this.context
    const frameCount = Math.max(1, Math.floor(context.sampleRate * duration))
    const buffer = context.createBuffer(1, frameCount, context.sampleRate)
    const data = buffer.getChannelData(0)
    for (let index = 0; index < frameCount; index += 1) {
      data[index] = Math.random() * 2 - 1
    }

    const source = context.createBufferSource()
    source.buffer = buffer

    const filter = context.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = highpass

    const gain = context.createGain()
    gain.gain.setValueAtTime(gainValue, at)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.bus)
    source.start(at)
    source.stop(at + duration + 0.02)
  }

  private kick(at: number, gainValue = 0.15) {
    if (!this.context || !this.bus) return

    const context = this.context
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(140, at)
    oscillator.frequency.exponentialRampToValueAtTime(48, at + 0.18)

    gain.gain.setValueAtTime(gainValue, at)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.28)

    oscillator.connect(gain)
    gain.connect(this.bus)
    oscillator.start(at)
    oscillator.stop(at + 0.32)
  }

  private playLove(start: number) {
    this.pad(start, [53, 57, 60, 64], 2.5)
    this.pad(start + 2, [50, 53, 57, 60], 2.5)
    this.pad(start + 4, [46, 50, 53, 57], 2)

    const melody = [
      65, 69, 72, 76, 74, 72, 69, 67, 65, 69, 72, 77, 76, 72, 69, 65,
    ]

    melody.forEach((midi, index) => {
      const at = start + 0.12 + index * 0.32
      this.tone(at, midi, 0.55, {
        type: 'triangle',
        gain: 0.075,
        attack: 0.02,
        release: 0.42,
        filter: 4000,
      })
      if (index % 4 === 3) {
        this.tone(at + 0.04, midi + 12, 0.7, {
          type: 'sine',
          gain: 0.022,
          attack: 0.03,
          release: 0.55,
        })
      }
    })

    this.tone(start + 5, 77, 1, {
      type: 'sine',
      gain: 0.04,
      attack: 0.05,
      release: 0.8,
    })
    this.tone(start + 5, 81, 1, {
      type: 'sine',
      gain: 0.03,
      attack: 0.05,
      release: 0.8,
    })
  }

  private playWife(start: number) {
    this.pad(start, [48, 55, 64], 2.5, 0.028)
    this.pad(start + 2, [45, 52, 60], 2.5, 0.028)
    this.pad(start + 4, [41, 48, 57], 2, 0.028)

    const bells = [
      72, 76, 79, 83, 84, 83, 79, 76, 74, 79, 83, 86, 84, 79, 76, 72,
    ]

    bells.forEach((midi, index) => {
      const at = start + 0.1 + index * 0.3
      this.tone(at, midi, 0.6, {
        type: 'sine',
        gain: 0.055,
        attack: 0.01,
        release: 0.5,
      })
      this.tone(at, midi + 12, 0.35, {
        type: 'sine',
        gain: 0.012,
        attack: 0.01,
        release: 0.3,
      })
    })

    const chord = [84, 88, 91]
    chord.forEach((midi) => {
      this.tone(start + 5, midi, 1, {
        type: 'sine',
        gain: 0.035,
        attack: 0.03,
        release: 0.8,
      })
    })
  }

  private playHug(start: number) {
    this.pad(start, [41, 48, 57], 2.5)
    this.pad(start + 2, [48, 55, 64], 2.5)
    this.pad(start + 4, [43, 50, 59], 2)

    const melody = [
      60, 64, 67, 64, 69, 67, 64, 62, 60, 55, 57, 60, 64, 62, 60, 55,
    ]

    melody.forEach((midi, index) => {
      this.tone(start + 0.15 + index * 0.33, midi, 0.65, {
        type: 'triangle',
        gain: 0.07,
        attack: 0.03,
        release: 0.5,
        filter: 3200,
      })
    })

    this.kick(start + 0.2, 0.08)
    this.kick(start + 0.62, 0.06)
    this.kick(start + 3.2, 0.08)
    this.kick(start + 3.62, 0.06)

    this.tone(start + 5, 60, 1, {
      type: 'triangle',
      gain: 0.05,
      attack: 0.05,
      release: 0.8,
      filter: 3000,
    })
    this.tone(start + 5, 64, 1, {
      type: 'triangle',
      gain: 0.04,
      attack: 0.05,
      release: 0.8,
      filter: 3000,
    })
  }

  private playDance(start: number) {
    for (let index = 0; index < 6; index += 1) {
      this.kick(start + index, 0.12)
      this.noise(start + index + 0.5, 0.08, 0.025, 1400)
    }

    for (let index = 0; index < 24; index += 1) {
      this.noise(start + index * 0.25, 0.035, 0.012, 7000)
    }

    const bass = [36, 36, 43, 45, 41, 41, 43, 36, 36, 36, 43, 45]
    bass.forEach((midi, index) => {
      this.tone(start + index * 0.5, midi, 0.42, {
        type: 'triangle',
        gain: 0.09,
        attack: 0.01,
        release: 0.35,
        filter: 900,
      })
    })

    const melody = [
      72, 76, 79, 76, 81, 79, 76, 74, 72, 76, 79, 84, 81, 79, 76, 74, 72,
      76, 79, 81, 84, 81, 79, 76,
    ]
    melody.forEach((midi, index) => {
      this.tone(start + index * 0.25, midi, 0.22, {
        type: 'square',
        gain: 0.028,
        attack: 0.005,
        release: 0.18,
        filter: 2600,
      })
    })

    const chord = [72, 76, 79]
    chord.forEach((midi) => {
      this.tone(start + 5.4, midi, 0.6, {
        type: 'triangle',
        gain: 0.05,
        attack: 0.01,
        release: 0.5,
      })
    })
  }

  private playSurprise(start: number) {
    this.pad(start, [48, 55, 64], 2.5, 0.028)
    this.pad(start + 2, [53, 57, 60, 65], 2.5, 0.028)
    this.pad(start + 4, [48, 55, 64, 67], 2, 0.028)

    const sparkle = [
      72, 76, 79, 84, 88, 91, 88, 84, 79, 84, 88, 91, 96, 91, 88, 84,
    ]
    sparkle.forEach((midi, index) => {
      this.tone(start + 0.08 + index * 0.28, midi, 0.45, {
        type: 'sine',
        gain: 0.05,
        attack: 0.008,
        release: 0.38,
      })
    })

    const shimmer = [84, 88, 91, 96]
    shimmer.forEach((midi, index) => {
      this.tone(start + 4.6 + index * 0.12, midi, 0.5, {
        type: 'sine',
        gain: 0.03,
        attack: 0.01,
        release: 0.4,
      })
    })

    const chord = [72, 76, 79, 84]
    chord.forEach((midi) => {
      this.tone(start + 5.2, midi, 0.8, {
        type: 'triangle',
        gain: 0.04,
        attack: 0.02,
        release: 0.65,
      })
    })

    this.kick(start + 0.1, 0.07)
  }
}

export const soundEngine = new SoundEngine()
