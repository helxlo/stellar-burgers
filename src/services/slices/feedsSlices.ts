import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '@api';

export const getApiFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

type TFeeds = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeeds = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeeds: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getApiFeeds.fulfilled, (state, action) => {
      state.total = action.payload.total;
      state.orders = action.payload.orders;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedsReducer = feedsSlice.reducer;

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;
