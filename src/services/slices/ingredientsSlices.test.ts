import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  ingredientsReducer,
  getApiIngredients
} from './ingredientsSlices';

describe('проверяют редьюсер слайса ingredientsSlices', () => {
  const storeIngredients = [
    {
      _id: '1',
      name: '1',
      type: '1',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 94315,
      image: '1',
      image_mobile: '1',
      image_large: '1'
    },
    {
      _id: '2',
      name: '2',
      type: '2',
      proteins: 2,
      fat: 2,
      carbohydrates: 2,
      calories: 2,
      price: 2,
      image: '2',
      image_mobile: '2',
      image_large: '2'
    }
  ];
  
  test('тест экшена начала запроса "pending"', () => {
    const pending = {
      ...initialState,
      error: null,
      loading: true
    };

    const action = {
      type: getApiIngredients.pending.type,
      payload: storeIngredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState).toStrictEqual(pending);
  });

  test('тест экшена ошибки запроса "fulfilled"', () => {

    const fulfilled = {
      ...initialState,
      ingredients: storeIngredients,
      loading: false
    };

    const action = {
      type: getApiIngredients.fulfilled.type,
      payload: storeIngredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });

  test('тест экшена ошибки запроса "rejected"', () => {
    const mockError = {
      message: 'error'
    };

    const rejected = {
      ...initialState,
      error: 'error',
      loading: false
    };

    const action = {
      type: getApiIngredients.rejected.type,
      error: mockError
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState).toStrictEqual(rejected);
  });

});
