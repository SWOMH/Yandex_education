import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';
import IngredientCard from '../ingredient-card/ingredient-card'; 

function IngredientsItem({ ingredients }) {

    const buns = ingredients.filter(item => item.type === 'bun');
    const sauces = ingredients.filter(item => item.type === 'sauce');
    const mains = ingredients.filter(item => item.type === 'main')

    return (
            <div className={`${styles.ingredients} custom-scroll mt-10`}>
                <h2 className="text text_type_main-medium">Булки</h2>
                <div className={styles.cards}>
                    {buns.map(item => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            count={1}
                            ingredient={item}
                        />
                    ))}
                </div>

                <h2 className="text text_type_main-medium mt-10">Соусы</h2>
                <div className={styles.cards}>
                    {sauces.map(item => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}
                        />
                    ))}
                </div>

                <h2 className="text text_type_main-medium mt-10">Начинки</h2>
                <div className={styles.cards}>
                    {mains.map(item => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}
                        />
                    ))}
                </div>
            </div>
    );
}

IngredientsItem.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        })
    ).isRequired
};

export default IngredientsItem; 