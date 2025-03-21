import React, { useMemo } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import styles from './burger-constructor.module.css';
import SelectedIngredients from './constructor-element/constructor-element';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/details-modal';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../services/types/data';
import { addIngredient, updateBuns } from '../../services/actions/constructor';
import { orderBurger } from '../../services/actions/order';
import { IDroppedIngredient } from '../../utils/types';
import { IIngredient } from '../../utils/types';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = React.useState<Boolean>(false);
    const { ingredients, buns } = useSelector(state => state.burgerConstructor);
    const { order, orderRequest, orderFailed } = useSelector(state => state.order);
    const user = useSelector(state => state.user.user);

    const totalPrice = useMemo(() => {
        const bunPrice = buns.length > 0 ? buns[0].price * 2 : 0; 
        const ingredientsPrice = ingredients.reduce((total, ingredient) => total + ingredient.price, 0);
        return bunPrice + ingredientsPrice;
    }, [ingredients, buns]);

    const [{ isHover }, dropTarget] = useDrop<IDroppedIngredient, unknown, { isHover: boolean }>({
        accept: 'ingredient',
        drop(item) {
            if (item.type === 'bun') {
                dispatch(updateBuns(item as IIngredient));
            } else {
                dispatch(addIngredient(item as IIngredient));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const handleOrderClick = () => {
        if (!user) {
            navigate('/login', { state: { from: '/' } });
            return;
        }

        const ingredientIds = [
            ...buns.map((bun: IIngredient) => bun._id),
            ...ingredients.map((ingredient: IIngredient) => ingredient._id),
            ...buns.map((bun: IIngredient) => bun._id)
        ];
        dispatch(orderBurger(ingredientIds));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className={`${styles.section} pt-25`}>
                <div 
                    ref={dropTarget} 
                    className={`${styles.constructor} custom-scroll ${isHover ? styles.onHover : ''}`}
                    data-testid="constructor-drop-target"
                >
                    <SelectedIngredients />
                </div>
                
                <div className={`${styles.total} mt-10`}>
                    <div className={`${styles.price} mr-10`}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="large"
                        onClick={handleOrderClick}
                        disabled={!buns.length || !ingredients.length}
                        data-testid="order-button"
                    >
                        {user ? 'Оформить заказ' : 'Войти для заказа'}
                    </Button>
                </div>
            </section>

            {isModalOpen && order && (
                <Modal onClose={closeModal}>
                    {orderRequest && (
                        <div className={`${styles.message} text text_type_main-medium`}>
                            Загрузка...
                        </div>
                    )}
                    {orderFailed && (
                        <div className={`${styles.message} text text_type_main-medium`}>
                            Не удалось создать заказ, наша космо-бургерная приносит извинения
                        </div>
                    )}
                    {!orderRequest && !orderFailed && order && (
                        <OrderDetails order={order} />
                    )}
                </Modal>
            )}
        </>
    );
}

export default BurgerConstructor;