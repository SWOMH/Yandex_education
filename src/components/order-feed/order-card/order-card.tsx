import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from '../../../utils/types';
import { IIngredient } from '../../../utils/types';
import { useSelector } from '../../../services/types/data';

interface IOrderCardProps {
  order: TOrder;
}

const OrderCard: FC<IOrderCardProps> = ({ order }) => {
  const { ingredients: allIngredients } = useSelector(state => state.ingredients);
  const location = useLocation();
  
  const showStatus = location.pathname.includes('/profile');
  
  const orderPath = location.pathname.includes('/feed')
    ? `/feed/${order.number}`
    : `/profile/orders/${order.number}`;

  const orderIngredients = order.ingredients
    .map(id => allIngredients.find(item => item._id === id))
    .filter((item): item is IIngredient => !!item);

  const visibleIngredients = orderIngredients.slice(0, 5);
  const remainingCount = orderIngredients.length - 5;
  
  const orderSum = orderIngredients.reduce((sum, item) => sum + item.price, 0);
  
  const getStatus = (status: TOrder['status']): string => {
    switch(status) {
      case 'done': return 'Выполнен';
      case 'pending': return 'Готовится';
      case 'created': return 'Создан';
      default: return 'Статус неизвестен';
    }
  };

  return (
    <Link
      to={orderPath}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={`${styles.number} text text_type_digits-large`}>#{order.number}</p>
          <p className={styles.timestamp}><FormattedDate date={new Date(order.createdAt)}/></p>
        </div>
        <h2 className={styles.name}>{order.name}</h2>
        {showStatus && (
          <p className={`${styles.status} ${order.status === 'done' ? styles.done : ''}`}>
            {getStatus(order.status)}
          </p>
        )}
        <div className={styles.content}>
          <div className={styles.ingredients}>
            {visibleIngredients.map((ingredient: IIngredient, index: number) => (
              <div 
                key={index} 
                className={styles.ingredientIcon}
                style={{ zIndex: 5 - index }}
              >
                <img 
                  src={ingredient.image_mobile} 
                  alt={ingredient.name}
                />
                {index === 4 && remainingCount > 0 && (
                  <div className={styles.counter}>+{remainingCount}</div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.price}>
            <span>{orderSum}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard; 