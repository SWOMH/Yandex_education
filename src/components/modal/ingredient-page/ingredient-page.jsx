import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails  from '../../burger-ingredients/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

function IngredientPage() {
    const { id } = useParams();
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const ingredient = ingredients.find(item => item._id === id);

    if (!ingredient) {
        return <div>Ингредиент не найден</div>;
    }

    return (
        <div className={styles.container}>
            <IngredientDetails titleClassName={`${styles.title} text text_type_main-large pl-10 pr-10 pt-10`} />
        </div>
    );
}

export default IngredientPage;
