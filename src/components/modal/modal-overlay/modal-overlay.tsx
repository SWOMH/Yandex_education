import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import { IModalOverlay } from '../../../utils/types';

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose} />
    );
}

export default ModalOverlay; 