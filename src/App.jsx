import React from 'react';
import AppHeader from './components/header/header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';
import Login from './components/profile-pages/login/login.jsx';
import Register from './components/profile-pages/register/register.jsx';
import ForgotPassword from './components/profile-pages/forgot-password/forgot-password.jsx';
import ResetPassword from './components/profile-pages/reset-password/reset-password.jsx';
import Profile from './components/profile-pages/profile/profile.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/actions/ingredients.js';
import { checkUserAuth } from './services/actions/user.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route.jsx';

function App() {
  
  const { ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);

  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  if (ingredientsRequest) {
    return <div>Загрузка...</div>;
  }

  if (ingredientsFailed) {
    return <div>Произошла ошибка при получении данных</div>;
  }

  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={
          <main className={styles.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />
        <Route path="/login" element={<OnlyUnAuth element={<Login/>} />}/>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/register" element={<OnlyUnAuth element={<Register />} />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<OnlyAuth element={<Profile/>}/>}/>
      </Routes>
    </Router>
  )
}

export default App
