import './index.css'

interface ButtonProps {
  type?: 'success' | 'error'
  label: string
}

export function Button (props: ButtonProps) {
  return <button className="Button">{props.label}</button>
}
