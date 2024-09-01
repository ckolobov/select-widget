import { useState } from 'react';
import './index.css'
import { Button } from '../../input/button';

interface SelectWidgetProps {
  selectionMaxAmount?: number;
}

export function SelectWidget(props: SelectWidgetProps) {
  const [selected] = useState<number[]>([])

  return (
  <div className="select-widget-container">
    <header>Select Items</header>
    <p>Max amount to select: {props.selectionMaxAmount}</p>
    <p>You currently have {selected.length} selected items</p>
    <Button label='Change my choice' />
  </div>
  )
}
