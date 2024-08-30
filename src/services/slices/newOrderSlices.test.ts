import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  getApiBurgerOrder,
  newOrderReducer
} from './newOrderSlices';

describe('тесты экшенов [newBurgerOrder] редьюсера newOrderSlice', () => {
  const storeNewOrder = {
    name: 'Краторный традиционный-галактический био-марсианский бургер',
    order: [
      {
        _id: '1',
        name: '1',
        type: 'bun',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: '1',
        image_mobile: '1',
        image_large: '1',
        __v: 1
      },
      {
        _id: '2',
        name: '2',
        type: 'main',
        proteins: 2,
        fat: 2,
        carbohydrates: 2,
        calories: 2,
        price: 2,
        image: '2',
        image_mobile: '2',
        image_large: '2',
        __v: 2
      },
      {
        _id: '3',
        name: '3',
        type: '3',
        proteins: 3,
        fat: 3,
        carbohydrates: 3,
        calories: 3,
        price: 3,
        image: '3',
        image_mobile: '3',
        image_large: '3',
        __v: 3
      },
      {
        _id: '4',
        name: '4',
        type: 'bun',
        proteins: 4,
        fat: 4,
        carbohydrates: 4,
        calories: 4,
        price: 4,
        image: '4',
        image_mobile: '4',
        image_large: '4',
        __v: 0
      }
    ]
  };

  const getNewState = (action: { type: string; payload?: {} }) =>
    newOrderReducer(initialState, action);

  test('тест экшена начала запроса (pending)', () => {
    const pendingState = {
      ...initialState,
      orderRequest: true
    };

    const action = {
      type: getApiBurgerOrder.pending.type,
      payload: storeNewOrder
    };

    expect(getNewState(action)).toStrictEqual(pendingState);
  });
  test('тест экшена ошибки запроса (rejected)', () => {
    const mockError = {
      message: 'bad request'
    };

    const rejectedState = {
      ...initialState,
      orderRequest: false
    };

    const action = {
      type: getApiBurgerOrder.rejected.type,
      error: mockError
    };

    expect(getNewState(action)).toStrictEqual(rejectedState);
  });
  test('тест экшена успешного выполнения запроса (fulfilled)', () => {
    const fulfilledState = {
      ...initialState,
      orderModalData: storeNewOrder.order, 
      orderRequest: false,
      name: storeNewOrder.name,
      //orderModalData: null,
    };

    const action = {
      type: getApiBurgerOrder.fulfilled.type,
      payload: storeNewOrder
    };

    expect(getNewState(action)).toStrictEqual(fulfilledState);
  });
});
