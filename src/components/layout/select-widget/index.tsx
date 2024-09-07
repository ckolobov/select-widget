import { useState, useEffect } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../input/button';
import { SelectDialog } from './select-dialog'
import { elementsApi, Element } from '../../../api'

interface SelectWidgetProps {
  selectionMaxAmount?: number;
}

export function SelectWidget(props: SelectWidgetProps) {
  const [selected, setSelected] = useState<Element['id'][]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSelected = (selected: Element['id'][]) => {
    setSelected([...selected]);
  }

  return (
  <div className="select-widget-container">
    <header>Select Items</header>
    <p>Max amount to select: {props.selectionMaxAmount}.</p>
    <p>You currently have {selected.length} selected items.</p>
    <Button label='Change my choice' type={ButtonType.Success} onClick={handleOpenModal} />
    {isModalOpen && <SelectDialog selectionMaxAmount={props.selectionMaxAmount} onClose={handleCloseModal} onSave={handleSaveSelected} />}
  </div>
  )
}
