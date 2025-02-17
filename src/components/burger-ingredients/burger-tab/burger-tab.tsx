import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tab.module.css';
import { IActiveTab } from '../../../utils/types';

const BurgerTab: FC<IActiveTab> = ({ activeTab, onTabClick }) => {
    const handleClick = (value: string): void => {
        if (onTabClick) {
            onTabClick(value);
        }
    };

    return (
        <div className={styles.tabs}>
            <Tab value="buns" active={activeTab === 'buns'} onClick={() => handleClick('buns')}>
                Булки
            </Tab>
            <Tab value="sauces" active={activeTab === 'sauces'} onClick={() => handleClick('sauces')}>
                Соусы
            </Tab>
            <Tab value="toppings" active={activeTab === 'toppings'} onClick={() => handleClick('toppings')}>
                Начинки
            </Tab>
        </div>
    );
};

export default BurgerTab; 