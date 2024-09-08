import './index.scss'
import { ReactNode, useCallback, memo, useMemo } from 'react'

interface MultiselectItemProps {
  id: string
  label: ReactNode
  selected: boolean
  onChange: (id: string) => void
}

const ITEM_CLASS = 'multiselect-item'

export const MultiselectItem = memo(function MultiselectItem(props: MultiselectItemProps) {
  const { id, label, selected, onChange } = props;
  const handleClick = useCallback(() => {
    onChange(id)
  }, [onChange, id])

  const className = useMemo(() => {
    const classes = [ITEM_CLASS];

    if (selected) {
      classes.push(`${ITEM_CLASS}--selected`)
    }

    return classes.join(' ');
  }, [selected])

  return (<li onClick={handleClick} className={className}>{label}</li>);
});
