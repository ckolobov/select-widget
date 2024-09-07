import { useState, useEffect } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../input/button';
import { Modal } from '../modal'
import { elementsApi, Element } from '../../../api'

interface SelectWidgetProps {
  selectionMaxAmount?: number;
}

export function SelectWidget(props: SelectWidgetProps) {
  const [selected] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [elements, setElements] = useState<Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      elementsApi.getElements()
        .then(data => {
          setElements(data);
          setIsLoading(false);
        });
    }
  }, [isModalOpen]);

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
        {
          isLoading ?
          <div>Loading...</div> :
          <ul>
            {elements.map((element) => {
              return <li key={element.id}>{element.name}</li>
            })}
          </ul>
        }
      </Modal>
    )}
  </div>
  )
}
