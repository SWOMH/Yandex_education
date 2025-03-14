import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/types/data';
import styles from './profile-orders.module.css';
import OrderCard from '../order-feed/order-card/order-card';
import { wsAuthConnectionStart, wsAuthConnectionDisconnect } from '../../services/actions/ws-actions';
import { TOrder } from '../../utils/types';
import ProfileNav from './profile/profile-nav/profile-nav';

const ProfileOrders: FC = () => {
    const dispatch = useDispatch();
    const { userOrders } = useSelector(state => state.ws);
    
    useEffect(() => {
        dispatch(wsAuthConnectionStart());
        
        return () => {
            dispatch(wsAuthConnectionDisconnect());
        };
    }, [dispatch]);
    
    return (
        <div className={styles.container}>
            <ProfileNav />
            <div className={styles.orders}>
                {userOrders?.length > 0 ? (
                    [...userOrders].reverse().map((order: TOrder) => (
                        <OrderCard key={order._id} order={order} />
                    ))
                ) : (
                    <p className={styles.empty}>У вас пока нет заказов</p>
                )}
            </div>
        </div>
    );
};

export default ProfileOrders; 