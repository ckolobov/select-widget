import { useState, useEffect } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../../input/button';
import { Modal } from '../../modal'
import { elementsApi, Element } from '../../../../api'

interface SelectDialogProps {
  selectionMaxAmount?: number;
  onClose: () => void;
  onSave: (selected: string[]) => void;
}

export function SelectDialog(props: SelectDialogProps) {
  const [selected, setSelected] = useState<Element['id'][]>([])
  const [elements, setElements] = useState<Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    elementsApi.getElements()
      .then(data => {
        setElements(data);
        setIsLoading(false);
      });
  }, []);

  const handleCloseModal = () => {
    props.onClose();
  };

  const handleSave = () => {
    props.onSave(selected);
  };

  return (
    <Modal
      onClose={handleCloseModal}
      label='Select Items'
      footer={
        <div className='buttons-container'>
          <Button onClick={handleSave} label="Save" type={ButtonType.Success}/>
          <Button onClick={handleCloseModal} label="Close" type={ButtonType.Error}/>
        </div>
      }
    >
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
  )
}
