import ReactDOM from 'react-dom';
import { PropsWithChildren } from 'react';
import './index.scss'

export const MODAL_ROOT_ID = 'modal-root'

interface ModalProps {
  onClose: () => void
  label: React.ReactNode
  footer?: React.ReactNode
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  const modalRoot = document.getElementById(MODAL_ROOT_ID) || document.body;
  return ReactDOM.createPortal(
    <>
      <div className='dark-background' onClick={() => props.onClose()} />
      <div className="modal">
        <div className="modal__header">
          <h2 className='modal__label'>{props.label}</h2>
          <button onClick={() => props.onClose()}>Close</button>
        </div>
        {props.children}
        {props.footer && (<div className="modal__footer">{props.footer}</div>)}
      </div>
    </>,
    modalRoot
  );
}