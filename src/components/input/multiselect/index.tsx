import './index.scss'
import { ReactNode } from 'react'
import { MultiselectItem } from './multiselect-item'

interface MultiselectItemProps {
  id: string
  label: ReactNode
}

interface MultiselectProps {
  items: MultiselectItemProps[]
  selected: Record<MultiselectItemProps['id'], any>
  onChange: (itemId: string) => void
}

export function Multiselect(props: MultiselectProps) {
  return (
    <ul className='multiselect-list'>
      {props.items.map((item) => {
        const selected = props.selected.hasOwnProperty(item.id);
        return <MultiselectItem key={item.id} id={item.id} label={item.label} selected={selected} onChange={props.onChange} />
      })}
    </ul>
  )
}
