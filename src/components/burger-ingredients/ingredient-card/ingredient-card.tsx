import React, { FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../../services/types/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { IIngredient } from '../../../utils/types';
interface IIngredientCardProps {
    image: string;
    price: number;
    name: string;
    count?: number;
    ingredient: IIngredient;
}

const IngredientCard: FC<IIngredientCardProps> = ({ image, price, name, ingredient }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const count = useSelector(state => state.burgerConstructor.counts[ingredient._id] || 0);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredient },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const handleClick = () => {
        navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location }
        });
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
};

export default IngredientCard; 