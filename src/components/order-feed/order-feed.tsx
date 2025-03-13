import React, { FC, useEffect } from 'react';
import styles from './order-feed.module.css';
import OrderCard from './order-card/order-card';
import { useDispatch, useSelector } from '../../services/types/data';
import { wsConnectionStart, wsConnectionDisconnect } from '../../services/actions/ws-actions';

const OrderFeed: FC = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector(state => state.ws);
    
    useEffect(() => {
        dispatch(wsConnectionStart());
        
        return () => {
            dispatch(wsConnectionDisconnect());
        };
    }, [dispatch]);
    
    const doneOrders = orders?.filter(order => order.status === 'done').slice(0, 10);
    const pendingOrders = orders?.filter(order => order.status === 'pending').slice(0, 10);

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Лента заказов</h1>
            
            <div className={styles.content}>
                <div className={styles.orders}>
                    {orders?.map(order => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>

                <div className={styles.statistics}>
                    <div className={styles.ordersBoard}>
                        <div className={styles.orderStatus}>
                            <h2 className={styles.statusTitle}>Готовы:</h2>
                            <ul className={`${styles.orderNumbers} ${styles.done}`}>
                                {doneOrders?.map(order => (
                                    <li key={order._id}>{order.number}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.orderStatus}>
                            <h2 className={styles.statusTitle}>В работе:</h2>
                            <ul className={styles.orderNumbers}>
                                {pendingOrders?.map(order => (
                                    <li key={order._id}>{order.number}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.totalStats}>
                        <p className={styles.completedAll}>
                            Выполнено за все время:
                            <span className={`${styles.number} text text_type_digits-large`}>{total}</span>
                        </p>
                        <p className={styles.completedToday}>
                            Выполнено за сегодня:
                            <span className={`${styles.number} text text_type_digits-large`}>{totalToday}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderFeed; 