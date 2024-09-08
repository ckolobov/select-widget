import { useMemo } from 'react'
import './index.scss'

interface ButtonProps {
  icon: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const ICON_BUTTON_CLASS = 'icon-button';

export function IconButton(props: ButtonProps) {
  const className = useMemo(() => {
    const classes = [ICON_BUTTON_CLASS];

    if (props.disabled) {
      classes.push(`${ICON_BUTTON_CLASS}--disabled`)
    }

    return classes.join(' ');
  }, [props.disabled])

  return <button className={className} onClick={props.onClick}>{props.icon}</button>
}
