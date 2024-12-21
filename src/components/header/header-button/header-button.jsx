import React from 'react';
import PropTypes from 'prop-types';
import styles from './header-button.module.css';

function HeaderButton({ icon: Icon, text }) {
    return (
        <button className={`${styles.HeaderButton} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <Icon type="primary" />
            <span>{text}</span>
        </button>
    );
}

HeaderButton.propTypes = {
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default HeaderButton;