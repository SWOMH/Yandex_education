import React from 'react';
import './App.css'
import AppHeader from './components/header/header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';
import { INGREDIENTS_ENDPOINT, checkResponse } from './utils/api-constants';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(INGREDIENTS_ENDPOINT)
      .then(checkResponse)
      .then(data => {
        if (data.success) {
          setIngredients(data.data);
          setHasError(false);
        }
      })
      .catch(err => {
        console.error('Ошибка при получении ингредиентов:', err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError) {
    return <div>Произошла ошибка при получении данных</div>;
  }

  return (
    <>
      <AppHeader />
      <main className="container">
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  )
}

export default App
