import { useState, useEffect, useCallback, useMemo } from 'react';
import './index.scss'
import { Button, ButtonType } from '../../../input/button';
import { Multiselect } from '../../../input/multiselect';
import { Modal } from '../../modal'
import { Search } from '../../../input/search';
import { elementsApi, Element } from '../../../../api'
import { useElementFilters } from './useElementFilters';
import { Select } from '../../../input/select';
import { SelectBoxValues } from './useElementFilters';
import { ElementList } from '../../../display/element-list';

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
  const [filter, setFilter] = useState<SelectBoxValues>(SelectBoxValues.Empty)

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

  const handleCloseElement = useCallback((id: Element['id']) => {
    setSelected((oldValue) => {
      if (oldValue.hasOwnProperty(id)) {
        const newValue = Object.fromEntries(
          Object.entries(oldValue).filter(([key]) => key !== id)
        );
        return newValue
      }

      return oldValue
    })
  }, [setSelected]);

  const handleSearchChange = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, [setSearch])

  const handleFilterChange = useCallback((filterValue: SelectBoxValues) => {
    setFilter(filterValue);
  }, [setFilter])

  const filteredItems = useElementFilters(elements, search, filter)

  const selectBoxOptions: {value: SelectBoxValues, label: string}[] = [
    {
      value: SelectBoxValues.Empty,
      label: 'No filter',
    },
    {
      value: SelectBoxValues.MoreThan10,
      label: '>10',
    },
    {
      value: SelectBoxValues.MoreThan50,
      label: '>50',
    },
    {
      value: SelectBoxValues.MoreThan100,
      label: '>100',
    }
  ]

  const multiselectDisabled = useMemo(() => {
    if (!props.selectionMaxAmount) {
      return false;
    }
    return Object.keys(selected).length >= props.selectionMaxAmount
  }, [props.selectionMaxAmount, selected])

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
      <div className='select-dialog-body-container'>
        <div className='filters-container'>
          <Search label="Search" value={search} onChange={handleSearchChange} />
          <Select label="Filter" options={selectBoxOptions} value={filter} onChange={handleFilterChange} />
        </div>
        <div className='multiselect-container'>
          {
            isLoading ?
            <div>Loading...</div> :
            <Multiselect
              items={filteredItems}
              selected={selected}
              onChange={handleChange}
              disabled={multiselectDisabled}
            />
          }
        </div>
        <div className='element-list-container'>
          <ElementList items={Object.values(selected)} onItemClose={handleCloseElement} />
        </div>
      </div>
    </Modal>
  )
}
