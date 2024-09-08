import { useState, useCallback } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../input/button';
import { SelectDialog } from './select-dialog'
import { Element } from '../../../api'
import { ElementList } from '../../display/element-list';

interface SelectWidgetProps {
  selectionMaxAmount?: number;
}

export function SelectWidget(props: SelectWidgetProps) {
  const [selectedElements, setSelectedElements] = useState<Element[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleSaveSelected = useCallback((selected: Element[]) => {
    setIsModalOpen(false);
    setSelectedElements([...selected]);
  }, [setIsModalOpen, setSelectedElements])

  const handleCloseElement = useCallback((id: string) => {
    setSelectedElements((oldValue) => {
      const newValue = oldValue.filter((element) => element.id !== id)
      return newValue;
    })
  }, [setSelectedElements]);

  return (
  <div className="select-widget-container">
    <header>Select Items</header>
    <p>Max amount to select: {props.selectionMaxAmount}.</p>
    <p>You currently have {selectedElements.length} selected items.</p>
    <div className='element-list-container'>
      <ElementList items={selectedElements} onItemClose={handleCloseElement} />
    </div>
    <Button label='Change my choice' type={ButtonType.Success} onClick={handleOpenModal} />
    {isModalOpen &&
      <SelectDialog
        selected={selectedElements}
        selectionMaxAmount={props.selectionMaxAmount}
        onClose={handleCloseModal}
        onSave={handleSaveSelected}
      />
    }
  </div>
  )
}
