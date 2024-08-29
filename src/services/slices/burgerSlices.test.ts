import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  burgerReducer,
  addBurger,
  removeBurger,
  handleBurgerPosition
} from './burgerSlices';

const initialIngredients = [
  {
    calories: 1,
    carbohydrates: 1,
    fat: 1,
    id: 'test1',
    image: '1',
    image_large: '1',
    image_mobile: '1',
    name: '1',
    price: 1,
    proteins: 1,
    type: 'main',
    __v: 1,
    _id: '1'
  },
  {
    calories: 2,
    carbohydrates: 2,
    fat: 2,
    id: 'test2',
    image: '2',
    image_large: '2',
    image_mobile: '2',
    name: '2',
    price: 2,
    proteins: 2,
    type: 'sauce',
    __v: 2,
    _id: '2'
  }
];

const newIngredient = {
  calories: 4242,
  carbohydrates: 242,
  fat: 142,
  id: 'testID_3',
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  name: 'Биокотлета из марсианской Магнолии',
  price: 424,
  proteins: 420,
  type: 'main',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa0941'
};

describe('проверяют редьюсер слайса burgerSlices', () => {

  const storeBurger = {
    ...initialState,
    ingredients: initialIngredients
  };

  test('обработка экшена добавления ингредиента', () => {
    const newState = burgerReducer(
      storeBurger,
      addBurger(newIngredient)
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([...initialIngredients, newIngredient]);
  });

  test('обработка экшена удаления ингредиента', () => {
    const newState = burgerReducer(
      storeBurger,
      removeBurger({index: 1})
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([initialIngredients[0]]);
  });

  test('обработка экшена изменения порядка ингредиентов в начинке', () => {
    let newState = burgerReducer(
      storeBurger,
      handleBurgerPosition({ index: 1, step: -1 })
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual([initialIngredients[1], initialIngredients[0]]);
  });
});
