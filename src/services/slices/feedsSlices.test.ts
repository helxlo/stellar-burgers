import { expect, test, describe } from '@jest/globals';
import { initialState, feedsReducer, getApiFeeds } from './feedsSlices';

describe('проверяют редьюсер слайса feedsSlices', () => {
  const storeFeeds = {
    orders: [
      {
        _id: '1',
        ingredients: [
          '1',
          '2',
          '1'
        ],
        status: 'done',
        name: '1',
        createdAt: '1',
        updatedAt: '1',
        number: 1
      },
      {
        _id: '2',
        ingredients: [
          '1',
          '2',
          '3',
          '1'
        ],
        status: 'done',
        name: '2',
        createdAt: '2',
        updatedAt: '2',
        number: 2
      }
    ],
    total: 2,
    totalToday: 2
  };

  test('тест экшена ошибки запроса "fulfilled"', () => {

    const fulfilled = {
      ...initialState,
      orders: storeFeeds.orders,
      total: storeFeeds.total,
      totalToday: storeFeeds.totalToday
    };

    const action = {
      type: getApiFeeds.fulfilled.type,
      payload: storeFeeds
    };

    const newState = feedsReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });

});
