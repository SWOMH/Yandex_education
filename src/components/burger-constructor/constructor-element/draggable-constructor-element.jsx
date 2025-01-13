import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { moveIngredient } from '../../../services/actions/constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/type';

function DraggableConstructorElement({ item, index, handleClose }) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'constructorElement',
        item: () => ({ index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: 'constructorElement',
        hover(draggedItem, monitor) {
            if (!ref.current) return;
            
            const dragIndex = draggedItem.index;
            const hoverIndex = index;
            
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dispatch(moveIngredient(dragIndex, hoverIndex));
            draggedItem.index = hoverIndex;
        }
    });

    drag(drop(ref));


    return (
        <div 
            ref={ref} 
            className={`${styles.ingredient} ${isDragging ? styles.dragging : ''}`}
        >
            <div className={styles.dragIcon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleClose(index, item._id)}
            />
        </div>
    );
}

DraggableConstructorElement.propTypes = {
    item: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default DraggableConstructorElement; 