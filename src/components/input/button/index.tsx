import { useMemo } from 'react'
import './index.scss'

export enum ButtonType {
  Success = 'success',
  Error = 'error',
}

interface ButtonProps {
  type?: ButtonType
  label: string
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

  return <button className={className}>{props.label}</button>
}
