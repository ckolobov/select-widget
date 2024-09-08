import './index.scss'
import ReactDOM from 'react-dom';
import { PropsWithChildren, useCallback } from 'react';
import { IconButton } from '../../input/icon-button';

export const MODAL_ROOT_ID = 'modal-root'

interface ModalProps {
  onClose: () => void
  label: React.ReactNode
  footer?: React.ReactNode
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  const { label, onClose, footer, children } = props;
  const modalRoot = document.getElementById(MODAL_ROOT_ID) || document.body;
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  return ReactDOM.createPortal(
    <>
      <div className='dark-background' onClick={handleClose} />
      <div className="modal">
        <div className="modal__header">
          <h2 className='modal__label'>{label}</h2>
          <IconButton onClick={handleClose} icon={'X'} />
        </div>
        {children}
        {footer && (<div className="modal__footer">{footer}</div>)}
      </div>
    </>,
    modalRoot
  );
}