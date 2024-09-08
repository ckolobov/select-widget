import './index.scss'
import { useCallback, memo } from 'react'
import { Element } from '../../../../api'
import { IconButton } from '../../../input/icon-button'

interface ElementItemProps {
  element: Element;
  onClose: (id: string) => void
}

export const ElementItem = memo(function ElementItem(props: ElementItemProps) {
  const { element, onClose } = props;
  const handleClick = useCallback(() => {
    onClose(element.id)
  }, [onClose, element])

  return (
    <li className={'element-item'}>
      <div className={'element-item__label'}>{element.label}</div>
      <div>
        <IconButton onClick={handleClick} icon={'X'} />
      </div>
    </li>
  );
});