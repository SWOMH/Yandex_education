import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element.module.css';
import data from '../../../utils/data.js';

function SelectedIngredients() {
    const buns = data.filter(item => item.type === 'bun');
    const mains = data.filter(item => item.type === 'main');

    return (
        <div className={styles.constructor}>
            <div className={`${styles.locked} ml-8`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns[0].name} (верх)`}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>

            <div className={`${styles.scrollable} custom-scroll`}>
                {mains.map((item, index) => (
                    <div key={index} className={styles.ingredient}>
                        <div className={styles.dragIcon}>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>
                ))}
            </div>

            <div className={`${styles.locked} ml-8`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns[0].name} (низ)`}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>
        </div>
    );
}

export default SelectedIngredients;
