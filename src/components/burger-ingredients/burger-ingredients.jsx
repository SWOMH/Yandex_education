import React from 'react';
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import IngredientsItem from './ingredient-item/ingredient-item';

function BurgerIngredients() {
    return (
        <section className={`${styles.section}`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <BurgerTab />
            <IngredientsItem />
        </section>
    );
}

export default BurgerIngredients; 