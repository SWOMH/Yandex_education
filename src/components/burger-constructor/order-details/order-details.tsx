import React, { FC } from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../../images/done.svg';
import { IOrderDetails } from '../../../utils/types';

const OrderDetails: FC<IOrderDetails> = ({ order }) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.orderNumber} text text_type_digits-large mt-15 mb-8`}>
                {order.order.number}
            </div>
            <p className={`${styles.identifier} text text_type_main-default mb-15`}>
                идентификатор заказа
            </p>
            <div className={`${styles.doneIcon} mt-15`}>
                <img src={doneIcon} alt="Заказ принят" />
            </div>
            <p className={`${styles.status} text text_type_main-default mb-2`}>
                Ваш заказ начали готовить
            </p>
            <p className={`${styles.waiting} text text_type_main-default mb-15`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

export default OrderDetails;
