import React, { FC, useEffect } from 'react';
import styles from './order-page.module.css';
import OrderDetails from '../order-details/order-details';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../services/types/data';
import { getOrderByNumber } from '../../../services/actions/order';
import { TOrder } from '../../../utils/types';

const OrderPage: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { orders } = useSelector(state => state.ws);
  const { currentOrder, currentOrderRequest } = useSelector(state => state.order);
  
  const orderFromWs = orders.find((order: TOrder) => order.number === Number(number));
  const orderToShow = orderFromWs || currentOrder;
  
  useEffect(() => {
    if (!orderToShow && number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, orderToShow, number]);

  if (currentOrderRequest) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      {orderToShow && <OrderDetails titleClassName={`${styles.title} text text_type_main-large pt-20`} />}
    </div>
  );
};

export default OrderPage; 