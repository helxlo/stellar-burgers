import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlices';
import { ingredientsReducer } from './slices/ingredientsSlices';
import { burgerReducer } from './slices/burgerSlices';
import { feedsReducer } from './slices/feedsSlices';
import { ordersReducer } from './slices/orderSlices';
import { newOrderReducer } from './slices/newOrderSlices';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  newOrder: newOrderReducer
});
