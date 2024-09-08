import './index.scss'
import { ElementItem } from './element-item';
import { Element } from '../../../api'

interface ElementListProps {
  items: Element[];
  onItemClose: (id: string) => void;
}

export function ElementList(props: ElementListProps) {
  return (
    <ul className='element-list'>
      {props.items.map((item) => {
        return <ElementItem key={item.id} element={item} onClose={props.onItemClose} />
      })}
    </ul>
  )
}
