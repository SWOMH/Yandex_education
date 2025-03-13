import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from '../../services/types/data';
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import IngredientsItem from './ingredient-item/ingredient-item';
import Modal from '../modal/details-modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { closeIngredientDetails } from '../../services/actions/ingredient-details';

const BurgerIngredients: FC = () => {
    const [activeTab, setActiveTab] = useState<string>('buns');
    const dispatch = useDispatch();

    const { currentIngredient, isOpen } = useSelector(state => state.ingredientDetails);

    const closeModal = (): void => {
        dispatch(closeIngredientDetails());
    };

    return (
        <section className={`${styles.section}`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <BurgerTab activeTab={activeTab} onTabClick={setActiveTab} />
            <IngredientsItem setActiveTab={setActiveTab} />
            
            {isOpen && currentIngredient && (
                <Modal onClose={closeModal}>
                    <IngredientDetails />
                </Modal>
            )}
        </section>
    );
};

export default BurgerIngredients; 