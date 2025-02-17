import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './header-button.module.css';
import { IHeaderButtonProps } from '../../../utils/types';



const HeaderButton: FC<IHeaderButtonProps> = ({ icon: Icon, text, to = '/' }) => {
    return (
        <Link to={to} className={`${styles.HeaderButton} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <Icon type="primary" />
            <span>
                {text}
            </span>
        </Link>
    );
}

export default HeaderButton;