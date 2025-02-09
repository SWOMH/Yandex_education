import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import IngredientsItem from './ingredient-item/ingredient-item';
import Modal from '../modal/details-modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { closeIngredientDetails } from '../../services/actions/ingredient-details';

function BurgerIngredients() {
    const [activeTab, setActiveTab] = useState('buns');
    const dispatch = useDispatch();
    const { currentIngredient, isOpen } = useSelector(state => state.ingredientDetails);

    const closeModal = () => {
        dispatch(closeIngredientDetails());
    };

    return (
        <section className={`${styles.section}`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <BurgerTab activeTab={activeTab} />
            <IngredientsItem setActiveTab={setActiveTab} />
            
            {isOpen && currentIngredient && (
                <Modal onClose={closeModal}>
                    <IngredientDetails ingredient={currentIngredient} />
                </Modal>
            )}
        </section>
    );
}

export default BurgerIngredients; 