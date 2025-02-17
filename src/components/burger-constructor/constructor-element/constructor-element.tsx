import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredient } from '../../../services/actions/constructor';
import DraggableConstructorElement from './draggable-constructor-element';
import { IhandleDelete, IIngredient, IConstructorState } from '../../../utils/types';

const SelectedIngredients: FC = () => {
    const dispatch = useDispatch();
    const { buns, ingredients } = useSelector((state: { burgerConstructor: IConstructorState }) => state.burgerConstructor);

    const handleDeleteIngredient = ({ index, ingredientId }: IhandleDelete): void => {
        dispatch(deleteIngredient(index, ingredientId));
    };

    return (
        //@ts-ignore
        <div className={styles.constructor}>
            {buns && buns.length > 0 ? 
                <div className={`${styles.locked} ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${buns[0].name} (верх)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </div> : <div className={`${styles.locked} ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={false}
                        text='Добавьте булочку'
                        price={0}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                    </div>
            }

            <div className={`${styles.scrollable} custom-scroll`}>
                {ingredients.map((item: IIngredient, index: number) => (
                    <DraggableConstructorElement
                        key={item.uniqueId}
                        item={item}
                        index={index}
                        // @ts-ignore {() => handleClose(index, item._id)}
                        handleClose={() => handleDeleteIngredient({ index, ingredientId: item._id })}
                    />
                ))}
            </div>

            {buns && buns.length > 0 ?
                <div className={`${styles.locked} ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${buns[0].name} (низ)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </div> : <div className={`${styles.locked} ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={false}
                        text='Добавьте булочку'                        
                        price={0}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                    </div>
            }
        </div>
    );
}

export default SelectedIngredients;
