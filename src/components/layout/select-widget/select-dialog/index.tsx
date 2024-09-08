import { useState, useEffect, useCallback, useMemo } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../../input/button';
import { Multiselect } from '../../../input/multiselect';
import { Modal } from '../../modal'
import { Search } from '../../../input/search';
import { elementsApi, Element } from '../../../../api'

interface SelectDialogProps {
  selected?: Element[];
  selectionMaxAmount?: number;
  onClose: () => void;
  onSave: (selected: Element[]) => void;
}

export function SelectDialog(props: SelectDialogProps) {
  const [selected, setSelected] = useState<Record<Element['id'], Element>>(
    props.selected ?
      props.selected.reduce<Record<Element['id'], Element>>((acc, element) => {
        acc[element.id] = element;
        return acc;
      }, {}) :
      {}
  )
  const [elements, setElements] = useState<Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

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
    props.onSave(Object.values(selected));
  };

  const handleChange = useCallback((id: Element['id']) => {
    setSelected((oldValue) => {
      if (oldValue.hasOwnProperty(id)) {
        const newValue = Object.fromEntries(
          Object.entries(oldValue).filter(([key]) => key !== id)
        );
        return newValue
      }
      const addedElement = elements.find((element) => element.id === id)
      if (
        !addedElement ||
        (props.selectionMaxAmount && Object.keys(oldValue).length >= props.selectionMaxAmount)
      ) {
        return oldValue;
      }

      return { ...oldValue, [id]: addedElement}
    })
  }, [setSelected, props.selectionMaxAmount, elements]);

  const handleSearchChange = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, [setSearch])

  const filteredItems = useMemo(() => {
    if (!search) {
      return elements;
    }
    return elements.filter((element) => element.label.toLowerCase().includes(search))
  }, [search, elements])

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
      <div>
        <Search label="Search" value={search} onChange={handleSearchChange} />
      </div>
      {
        isLoading ?
        <div>Loading...</div> :
        <Multiselect items={filteredItems} selected={selected} onChange={handleChange} />
      }
    </Modal>
  )
}
