import React from 'react';
import PropTypes from 'prop-types';
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import IngredientsItem from './ingredient-item/ingredient-item';
import { ingredientPropType } from '../../utils/type';

function BurgerIngredients({ ingredients }) {
    return (
        <section className={`${styles.section}`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <BurgerTab />
            <IngredientsItem ingredients={ingredients}/>
        </section>
    );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerIngredients; 