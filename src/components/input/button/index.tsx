import { useMemo } from 'react'
import './index.scss'

export enum ButtonType {
  Success = 'success',
  Error = 'error',
}

interface ButtonProps {
  type?: ButtonType
  label: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const BUTTON_CLASS = 'button';

export function Button (props: ButtonProps) {
  const className = useMemo(() => {
    const classes = [BUTTON_CLASS];

    if (props.type) {
      classes.push(`${BUTTON_CLASS}--${props.type}`)
    }

    return classes.join(' ');
  }, [props.type])

  return <button className={className} onClick={props.onClick}>{props.label}</button>
}
