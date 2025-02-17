import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import HeaderButton from './header-button/header-button.jsx';
import styles from './header.module.css';

function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4 pr-10`}>
            <nav className={`${styles.navigation} pl-10`}>
                <HeaderButton icon={BurgerIcon} text="Конструктор" to="/" />
                <HeaderButton icon={ListIcon} text="Лента заказов" to="/feed" />
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.profile}>
                <HeaderButton icon={ProfileIcon} text="Личный кабинет" to="/profile" />
            </div>
        </header>
    );
}

export default AppHeader;

