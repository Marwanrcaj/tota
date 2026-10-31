import type { ComponentType, SVGProps } from 'react'
import { DanceIcon } from '../components/icons/DanceIcon'
import { GiftIcon } from '../components/icons/GiftIcon'
import { HeartIcon } from '../components/icons/HeartIcon'
import { RingIcon } from '../components/icons/RingIcon'
import { TeddyIcon } from '../components/icons/TeddyIcon'

export type ActionIcon = ComponentType<SVGProps<SVGSVGElement>>

export type ActionId = 'love' | 'wife' | 'hug' | 'dance' | 'surprise'

export type Action = {
  id: ActionId
  label: string
  hint: string
  icon: ActionIcon
}

export const actions: Action[] = [
  {
    id: 'love',
    label: 'I love you',
    hint: 'Show a romantic love message',
    icon: HeartIcon,
  },
  {
    id: 'wife',
    label: 'My Wife',
    hint: 'Reveal a cute romantic surprise',
    icon: RingIcon,
  },
  {
    id: 'hug',
    label: 'Hug',
    hint: 'Give the teddy a big hug',
    icon: TeddyIcon,
  },
  {
    id: 'dance',
    label: 'Dance',
    hint: 'Start a little dance',
    icon: DanceIcon,
  },
  {
    id: 'surprise',
    label: 'Surprise',
    hint: 'Open a tiny surprise',
    icon: GiftIcon,
  },
]
