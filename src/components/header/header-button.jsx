import React from 'react';
import styles from './header-button.module.css';

function HeaderButton({ icon: Icon, text }) {
    return (
        <button className={`${styles.HeaderButton} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <Icon type="primary" />
            <span>{text}</span>
        </button>
    );
}

export default HeaderButton;