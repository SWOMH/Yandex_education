import React, { FC } from 'react';
import { ingredientPropType } from '../../../utils/type';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IIngredientDetails } from '../../../utils/types';

const IngredientDetails: FC<IIngredientDetails> = ({ titleClassName  }) => {
    const { id } = useParams();
    // @ts-ignore
    const ingredients = useSelector(state => state.ingredients.ingredients);
    // @ts-ignore
    const ingredient = ingredients.find(item => item._id === id);

    if (!ingredient) {
        return <div>Ингредиент не найден</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={titleClassName || `${styles.title} text text_type_main-large pl-10 pr-10 pt-10`}>
                    Детали ингредиента
                </h2>
            </div>
            <img 
                src={ingredient.image_large} 
                alt={ingredient.name} 
                className={styles.image}
            />
            <h2 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h2>
            <div className={`${styles.nutrients} mt-8 pb-15`}>
                <div className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                </div>
                <div className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </div>
                <div className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                </div>
                <div className={styles.nutrient}>
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
};


export default IngredientDetails; 