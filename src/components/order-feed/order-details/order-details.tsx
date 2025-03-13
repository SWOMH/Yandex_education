import React, { FC } from 'react';
import styles from './order-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/types/data';
import { TOrder } from '../../../utils/types';
import { IIngredient } from '../../../utils/types';
import { useParams } from 'react-router-dom';
import { IOrderDetailsProps } from '../../../utils/types'

const OrderDetails: FC<IOrderDetailsProps> = ({ titleClassName }) => {
  const { number } = useParams<{ number: string }>();
  const { ingredients } = useSelector(state => state.ingredients);
  const { orders, userOrders } = useSelector(state => state.ws);
  const { currentOrder } = useSelector(state => state.order);
  
  const order = currentOrder?.number === Number(number) 
    ? currentOrder 
    : orders.find(item => item.number === Number(number)) || 
      userOrders.find(item => item.number === Number(number));
  
  if (!order) {
    return <div className={styles.loading}>Загрузка...</div>;
  }
  
  const orderIngredients = order.ingredients
    .map(id => ingredients.find(item => item._id === id))
    .filter((item): item is IIngredient => !!item);

  console.log(orderIngredients)

  const totalPrice = orderIngredients.reduce((sum, item) => sum + item.price, 0);

  console.log(totalPrice)
  
  const getStatus = (status: TOrder['status']): string => {
    switch(status) {
      case 'done': return 'Выполнен';
      case 'pending': return 'Готовится';
      case 'created': return 'Создан';
      default: return 'Статус неизвестен';
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={titleClassName || `${styles.number} text text_type_digits-default`}>
        #{order.number}
      </h2>
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
                <span>1 x {ingredient.price}</span>
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