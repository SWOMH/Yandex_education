import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import Modal from '../../modal/details-modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function IngredientCard({ image, price, name, count = 0, ingredient }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.card} onClick={handleClick}>
                {count > 0 && (
                    <div className={styles.counter}>
                        <Counter count={count} size="default" extraClass="m-1" />
                    </div>
                )}
                <img src={image} alt={name} className={styles.image} />
                <div className={`${styles.price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default mr-2">{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{name}</p>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
        </>
    );
}

IngredientCard.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
    ingredient: PropTypes.shape({
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
    }).isRequired
};

export default IngredientCard; 