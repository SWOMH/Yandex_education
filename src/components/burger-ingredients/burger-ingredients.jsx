import React from 'react';
import PropTypes from 'prop-types';
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import IngredientsItem from './ingredient-item/ingredient-item';

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
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired
  })).isRequired
};

export default BurgerIngredients; 