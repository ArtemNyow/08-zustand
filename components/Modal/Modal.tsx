

import { createPortal } from 'react-dom';
import { useEffect, type ReactNode } from 'react';
import css from './Modal.module.css'

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}
      onClick={(e)=>e.stopPropagation()}>
         {children}
      </div>
    </div>,
    document.body
  );
}



