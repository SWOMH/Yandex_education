import React, { useEffect } from 'react';
import AppHeader from './components/header/header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Login from './components/profile-pages/login/login';
import Register from './components/profile-pages/register/register';
import ForgotPassword from './components/profile-pages/forgot-password/forgot-password';
import ResetPassword from './components/profile-pages/reset-password/reset-password';
import Profile from './components/profile-pages/profile/profile';
import { useDispatch, useSelector } from './services/types/data';
import { getIngredients } from './services/actions/ingredients';
import { checkUserAuth } from './services/actions/user';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Location } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';
import IngredientPage from './components/modal/ingredient-page/ingredient-page';
import Modal from './components/modal/details-modal';
import IngredientDetails from './components/burger-ingredients/ingredient-details/ingredient-details';
import OrderFeed from './components/order-feed/order-feed';
import OrderPage from './components/order-feed/order-page/order-page';
import OrderDetails from './components/order-feed/order-details/order-details';
import ProfileOrders from './components/profile-pages/profile-orders.js';

interface LocationState {
  background: Location;
}

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as LocationState)?.background;

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
        <Route path="/profile/orders" element={<OnlyAuth element={<ProfileOrders/>}/>}/>
        <Route path="/profile/orders/:number" element={<OnlyAuth element={<OrderPage/>}/>}/>
        <Route path="/feed" element={<OrderFeed />} />
        <Route path="/feed/:number" element={<OrderPage />} />
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
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App
