import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import SelectedIngredients from './constructor-element/constructor-element';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/details-modal';

function BurgerConstructor() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOrderClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className={`${styles.section} pt-25`}>
                <div className={`${styles.constructor} custom-scroll`}>
                    <SelectedIngredients />
                </div>
                
                <div className={`${styles.total} mt-10`}>
                    <div className={`${styles.price} mr-10`}>
                        <span className="text text_type_digits-medium">610</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="large"
                        onClick={handleOrderClick}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}


export default BurgerConstructor;
