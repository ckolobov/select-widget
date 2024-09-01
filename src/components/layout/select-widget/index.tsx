import { useState } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../input/button';
import { Modal } from '../modal'

interface SelectWidgetProps {
  selectionMaxAmount?: number;
}

export function SelectWidget(props: SelectWidgetProps) {
  const [selected] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
  <div className="select-widget-container">
    <header>Select Items</header>
    <p>Max amount to select: {props.selectionMaxAmount}.</p>
    <p>You currently have {selected.length} selected items.</p>
    <Button label='Change my choice' type={ButtonType.Success} onClick={handleOpenModal} />
    {isModalOpen && (
      <Modal onClose={handleCloseModal} label='Select Items' footer={<button onClick={handleCloseModal}>Close</button>}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Modal>
    )}
  </div>
  )
}
