import React, { FC } from 'react';
import styles from './order-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/types/data';
import { IIngredient, TOrder } from '../../../utils/types';


interface OrderDetailsProps {
    order: TOrder;
}

const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
    const { ingredients } = useSelector((state) => state.ingredients);
    
    const orderIngredients: IIngredient[] = order.ingredients
        .map((id) => ingredients.find((item) => item._id === id))
        .filter((item): item is IIngredient => item !== undefined);

    const totalPrice: number = orderIngredients.reduce((sum, item) => sum + item.price, 0);

    const getStatus = (status: 'done' | 'pending' | 'created'): string => {
        switch(status) {
            case 'done': return 'Выполнен';
            case 'pending': return 'Готовится';
            case 'created': return 'Создан';
            default: return 'Статус неизвестен';
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.number}>#{order.number}</p>
            <h2 className={styles.name}>{order.name}</h2>
            <p className={`${styles.status} ${order.status === 'done' ? styles.done : ''}`}>
                {getStatus(order.status)}
            </p>
            <div className={styles.content}>
                <h3 className={styles.subtitle}>Состав:</h3>
                <ul className={styles.ingredients}>
                    {orderIngredients.map((ingredient, index) => (
                        <li key={index} className={styles.ingredient}>
                            <div className={styles.ingredientInfo}>
                                <div className={styles.ingredientIcon}>
                                    <img src={ingredient.image_mobile} alt={ingredient.name} />
                                </div>
                                <p className={styles.ingredientName}>{ingredient.name}</p>
                            </div>
                            <div className={styles.price}>
                                <span>{ingredient.price}</span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.footer}>
                    <p className={styles.timestamp}><FormattedDate date={new Date(order.createdAt)}/></p>
                    <div className={styles.totalPrice}>
                        <span>{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
