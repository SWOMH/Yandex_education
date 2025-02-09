import React from 'react';
import styles from './ingredient-item.module.css';
import IngredientCard from '../ingredient-card/ingredient-card'; 
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

function IngredientsItem({ setActiveTab }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { ingredients } = useSelector(state => state.ingredients)

    const buns = ingredients.filter(item => item.type === 'bun');
    const sauces = ingredients.filter(item => item.type === 'sauce');
    const mains = ingredients.filter(item => item.type === 'main')

    const handleScroll = (event) => {
        const sections = event.target.querySelectorAll('h2');
        const scrollPosition = event.target.scrollTop + 100;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top + event.target.scrollTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveTab(section.id); 
            }
        });
    };

    const handleClick = (ingredient) => {
        navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location }
        });
    };

    return (
            <div className={`${styles.ingredients} custom-scroll mt-10`} onScroll={handleScroll}>
                <h2 id="buns" className="text text_type_main-medium">Булки</h2>
                <div className={styles.cards}>
                    {buns.map(item => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>

                <h2 id="sauces" className="text text_type_main-medium mt-10">Соусы</h2>
                <div className={styles.cards}>
                    {sauces.map(item => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>

                <h2 id="toppings" className="text text_type_main-medium mt-10">Начинки</h2>
                <div className={styles.cards}>
                    {mains.map(item => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>
            </div>
    );
}

IngredientsItem.propTypes = {
    setActiveTab: PropTypes.func.isRequired
};

export default IngredientsItem; 