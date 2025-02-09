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
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route.jsx';
import IngredientPage from './components/modal/ingredient-page/ingredient-page';
import Modal from './components/modal/details-modal';
import IngredientDetails from './components/burger-ingredients/ingredient-details/ingredient-details';

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  if (ingredientsRequest) {
    return <div>Загрузка...</div>;
  }

  if (ingredientsFailed) {
    return <div>Произошла ошибка при получении данных</div>;
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={
          <main className={styles.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/login" element={<OnlyUnAuth element={<Login/>} />}/>
        <Route path="/register" element={<OnlyUnAuth element={<Register />} />}/>
        <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPassword />}/>} />
        <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPassword />}/>} />
        <Route path="/profile" element={<OnlyAuth element={<Profile/>}/>}/>
        <Route path="/profile/orders" element={<OnlyAuth element={<Profile/>}/>}/>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App
