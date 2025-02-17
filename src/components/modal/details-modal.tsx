import React, { ReactNode, FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './details-modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay.js';
import { IModalProps } from '../../utils/types'

const modalRoot = document.getElementById('modal-root') as HTMLElement | null;

if (!modalRoot) {
    throw new Error("Modal root не найден");
}



const Modal: FC<IModalProps> = ({ children, onClose }) => {
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </>,
        modalRoot
    );
}


export default Modal;
