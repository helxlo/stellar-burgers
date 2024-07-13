import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '@api';
import { TUser } from '@utils-types';

export const login = createAsyncThunk('user/login', loginUserApi);
export const register = createAsyncThunk('user/register', registerUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const getApiUser = createAsyncThunk('user/request', getUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthCheckedUser: (state) => state.isAuthChecked,
    getErrorUser: (state) => state.error,
    getUser: (state) => state.user,
    getNameUser: (state) => state.user.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = '';
        state.user = action.payload.user;
      });
    builder
      .addCase(getApiUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        console.log(action.error.message);
      })
      .addCase(getApiUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
    builder
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = '';
        state.user = action.payload.user;
      });
    builder.addCase(logout.fulfilled, (state) => (state = initialState));
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { getErrorUser, getUser, getNameUser, getIsAuthCheckedUser } =
  userSlice.selectors;
