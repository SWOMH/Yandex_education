import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './details-modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay.jsx';

const modalRoot = document.getElementById('modal-root');

function Modal({ children, onClose }) {
    React.useEffect(() => {
        const handleEsc = (e) => {
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

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;
