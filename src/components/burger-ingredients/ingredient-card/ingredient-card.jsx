import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/type';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { openIngredientDetails } from '../../../services/actions/ingredient-details';

function IngredientCard({ image, price, name, ingredient }) {
    const dispatch = useDispatch();
    const count = useSelector(state => state.burgerConstructor.counts[ingredient._id] || 0);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredient },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const handleClick = () => {
        dispatch(openIngredientDetails(ingredient));
    };

    return (
        <div 
            ref={dragRef}
            className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
            onClick={handleClick}
        >
            {count > 0 && (
                <div className={styles.counter}>
                    <Counter count={count} size="default" extraClass="m-1" />
                </div>
            )}
            <img src={image} alt={name} className={styles.image} />
            <div className={`${styles.price} mt-1 mb-1`}>
                <span className="text text_type_digits-default mr-2">{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{name}</p>
        </div>
    );
}

IngredientCard.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredient: ingredientPropType.isRequired
};

export default IngredientCard; 