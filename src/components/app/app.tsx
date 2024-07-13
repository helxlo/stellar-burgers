import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route/protected-route';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { NotFound404 } from '@pages';

import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getApiIngredients } from '../../services/slices/ingredientsSlices';
import { getApiUser } from '../../services/slices/userSlices';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiIngredients());
    dispatch(getApiUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/feed' element={<Feed />} />

        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингридиента'} onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='' onClose={() => navigate(-1)}>
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
