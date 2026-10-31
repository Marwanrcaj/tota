import { actions, type ActionId } from '../data/actions'
import { ActionButton } from './ActionButton'

type ActionBarProps = {
  onSelect: (id: ActionId) => void
}

export function ActionBar({ onSelect }: ActionBarProps) {
  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-3">
      {actions.map((action) => (
        <ActionButton
          key={action.id}
          icon={action.icon}
          label={action.label}
          hint={action.hint}
          onClick={() => onSelect(action.id)}
        />
      ))}
    </div>
  )
}
