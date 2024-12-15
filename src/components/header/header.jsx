import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import HeaderButton from './header-button.jsx';
import styles from './header.module.css';

function Header() {
    return (
        <header className={`${styles.header} pt-4 pb-4 pr-10`}>
            <nav className={`${styles.navigation} pl-10`}>
                <HeaderButton icon={BurgerIcon} text="Конструктор" />
                <HeaderButton icon={ListIcon} text="Лента заказов" />
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.profile}>
                <HeaderButton icon={ProfileIcon} text="Личный кабинет" />
            </div>
        </header>
    );
}

export default Header;

