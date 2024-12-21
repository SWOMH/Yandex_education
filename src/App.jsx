import './App.css'
import AppHeader from './components/header/header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';

function App() {
  return (
    <>
      <AppHeader />
      <main className="container">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  )
}

export default App
