import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

export const getApiBurgerOrder = createAsyncThunk('order/new', orderBurgerApi);

type TNewOrderState = {
  orderModalData: TOrder | null;
  name: string;
  orderRequest: boolean;
};

export const initialState: TNewOrderState = {
  orderModalData: null,
  name: '',
  orderRequest: false
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getOrderModalDataNewOrder: (state) => state.orderModalData,
    getNameNewOrder: (state) => state.name,
    getOrderRequestNewOrder: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiBurgerOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getApiBurgerOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(getApiBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const newOrderReducer = newOrderSlice.reducer;
export const { clearOrder } = newOrderSlice.actions;

export const {
  getOrderModalDataNewOrder,
  getNameNewOrder,
  getOrderRequestNewOrder
} = newOrderSlice.selectors;
