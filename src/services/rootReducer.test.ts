import { expect, test, describe } from '@jest/globals';
// import store from '../store';
import { rootReducer } from './rootReducer';
import { initialState as constructorState } from './slices/burgerSlices';
import { initialState as ingredientsState } from './slices/ingredientsSlices';
import { initialState as userState } from './slices/userSlices';
import { initialState as newOrderState } from './slices/newOrderSlices';
import { initialState as ordersState } from './slices/orderSlices';
import { initialState as feedsState } from './slices/feedsSlices';

const testState = {
  burger: constructorState,
  feeds: feedsState,
  ingredients: ingredientsState,
  newOrder: newOrderState,
  orders: ordersState,
  user: userState
};

test('правильная инициализация rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toStrictEqual(testState);
  });
