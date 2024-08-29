import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

type TBurgerState = {

    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];

};

export const initialState: TBurgerState = {
    bun: null,
    ingredients: []
};

const burgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurger: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload });
      }
    },
    removeBurger: (state, action) => {
      const { index } = action.payload;
      state.ingredients.splice(index, 1);
    },
    handleBurgerPosition: (state, action) => {
      const { index, step } = action.payload;
      [
        state.ingredients[index],
        state.ingredients[index + step]
      ] = [
        state.ingredients[index + step],
        state.ingredients[index]
      ];
    },
    clearBurger: (state) => (state = initialState)
  }
});

export const burgerReducer = burgerSlice.reducer;

export const { addBurger, removeBurger, clearBurger, handleBurgerPosition } =
  burgerSlice.actions;
