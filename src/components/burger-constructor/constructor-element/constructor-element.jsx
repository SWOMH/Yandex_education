import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element.module.css';

function SelectedIngredients({ ingredients }) {
    const buns = ingredients.filter(item => item.type === 'bun');
    const mains = ingredients.filter(item => item.type === 'main');

    return (
        <div className={styles.constructor}>
            {buns.length > 0 && (
                <div className={`${styles.locked} ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${buns[0].name} (верх)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </div>
            )}

            <div className={`${styles.scrollable} custom-scroll`}>
                {mains.map((item) => (
                    <div key={item._id} className={styles.ingredient}>
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

            {buns.length > 0 && (
                <div className={`${styles.locked} ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${buns[0].name} (низ)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </div>
            )}
        </div>
    );
}

SelectedIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default SelectedIngredients;
