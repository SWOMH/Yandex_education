import React, { FC } from 'react';
import styles from './ingredient-item.module.css';
import IngredientCard from '../ingredient-card/ingredient-card'; 
import { useSelector } from '../../../services/types/data';
import { useNavigate, useLocation } from 'react-router-dom';
import { IIngredient } from '../../../utils/types';

interface IIngredientsItemProps {
    setActiveTab: (tabId: string) => void;
}

const IngredientsItem: FC<IIngredientsItemProps> = ({ setActiveTab }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { ingredients } = useSelector(state => state.ingredients);

    const buns = ingredients.filter(item => item.type === 'bun');
    const sauces = ingredients.filter(item => item.type === 'sauce');
    const mains = ingredients.filter(item => item.type === 'main')

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        const sections = target.querySelectorAll<HTMLHeadingElement>('h2');
        const scrollPosition = target.scrollTop + 100;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top + target.scrollTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveTab(section.id); 
            }
        });
    };

    const handleClick = (ingredient: IIngredient) => {
        navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location }
        });
    };

    return (
            <div className={`${styles.ingredients} custom-scroll mt-10`} onScroll={handleScroll}>
                <h2 id="buns" className="text text_type_main-medium">Булки</h2>
                <div className={styles.cards}>
                    {buns.map((item: IIngredient) => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}// @ts-ignore
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>

                <h2 id="sauces" className="text text_type_main-medium mt-10">Соусы</h2>
                <div className={styles.cards}>
                    {sauces.map((item: IIngredient) => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}// @ts-ignore
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>

                <h2 id="toppings" className="text text_type_main-medium mt-10">Начинки</h2>
                <div className={styles.cards}>
                    {mains.map((item: IIngredient) => (
                        <IngredientCard 
                            key={item._id}
                            image={item.image}
                            price={item.price}
                            name={item.name}
                            ingredient={item}// @ts-ignore
                            onClick={() => handleClick(item)}
                        />
                    ))}
                </div>
            </div>
    );
};

export default IngredientsItem; 