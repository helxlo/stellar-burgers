import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

export const getApiOrders = createAsyncThunk('orders/UserOrders', getOrdersApi);

type TOrders = {
  orders: TOrder[];
};

export const initialState: TOrders = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApiOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
