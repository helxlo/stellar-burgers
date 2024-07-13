import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

type TBurgerState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurger: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({ ...action.payload });
      }
    },
    removeBurger: (state, action) => {
      const { index } = action.payload;
      state.constructorItems.ingredients.splice(index, 1);
    },
    handleBurgerPosition: (state, action) => {
      const { index, step } = action.payload;
      [
        state.constructorItems.ingredients[index],
        state.constructorItems.ingredients[index + step]
      ] = [
        state.constructorItems.ingredients[index + step],
        state.constructorItems.ingredients[index]
      ];
    },
    clearBurger: (state) => (state = initialState)
  }
});

export const burgerReducer = burgerSlice.reducer;

export const { addBurger, removeBurger, clearBurger, handleBurgerPosition } =
  burgerSlice.actions;
