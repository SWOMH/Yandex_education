import React from 'react';
import './App.css'
import AppHeader from './components/header/header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/actions/ingredients.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  
  const { ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);

  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  if (ingredientsRequest) {
    return <div>Загрузка...</div>;
  }

  if (ingredientsFailed) {
    return <div>Произошла ошибка при получении данных</div>;
  }

  return (
    <>
      <AppHeader />
      <main className="container">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  )
}

export default App
