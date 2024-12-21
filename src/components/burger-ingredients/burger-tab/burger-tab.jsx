import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tab.module.css';

function BurgerTab() {
    const [current, setCurrent] = React.useState('buns');

    return (
            <div className={styles.tabs}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>        
    );
}

export default BurgerTab; 