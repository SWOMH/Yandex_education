import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header-button.module.css';

function HeaderButton({ icon: Icon, text, to = '/' }) {
    return (
        <Link to={to} className={`${styles.HeaderButton} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <Icon type="primary" />
            <span>
                {text}
            </span>
        </Link>
    );
}

HeaderButton.propTypes = {
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string
};

export default HeaderButton;