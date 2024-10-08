import './index.scss'
import { ReactNode } from 'react'
import { MultiselectItem } from './multiselect-item'
import { Virtuoso } from 'react-virtuoso'

interface MultiselectItemProps {
  id: string;
  label: ReactNode;
}

interface MultiselectProps {
  items: MultiselectItemProps[];
  selected: Record<MultiselectItemProps['id'], any>;
  disabled?: boolean;
  onChange: (itemId: string) => void;
}

export function Multiselect(props: MultiselectProps) {
  return (
    <ul className='multiselect-list'>
      <Virtuoso
        data={props.items}
        style={{height: "250px" }}
        itemContent={(_, item) => {
          const selected = props.selected.hasOwnProperty(item.id);
          return (
            <MultiselectItem
              key={item.id}
              id={item.id}
              label={item.label}
              selected={selected}
              onChange={props.onChange}
              disabled={props.disabled}
            />
          )
        }}
      />
    </ul>
  )
}
