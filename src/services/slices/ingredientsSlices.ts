import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

export const getApiIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsLoading: (state) => state.loading,
    getIngredients: (state) => state.ingredients,
    getIngredientsBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getIngredientsMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getIngredientsSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApiIngredients.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = null;
        }
      })
      .addCase(getApiIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const {
  getIngredientsLoading,
  getIngredients,
  getIngredientsBuns,
  getIngredientsMains,
  getIngredientsSauces
} = ingredientsSlice.selectors;
