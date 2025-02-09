import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tab.module.css';
import PropTypes from 'prop-types';

function BurgerTab({ activeTab }) {

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
}

BurgerTab.propTypes = {
    activeTab: PropTypes.string.isRequired
};

export default BurgerTab; 