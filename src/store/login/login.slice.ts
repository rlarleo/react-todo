import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Logged {
  isLogged: boolean;
  email: string | null;
  password: string | null;
}

const initialState: Logged = {
  isLogged: false,
  email: null,
  password: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signUpAccount(state, action) {
      state.isLogged = false;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    loginAccount(state, action) {
      console.log(action);
      state.isLogged = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logoutAccount(state) {
      state.isLogged = false;
      state.email = null;
      state.password = null;
    },
  },
});

export const { signUpAccount, loginAccount, logoutAccount } =
  loginSlice.actions;

export const selectLoggedState = (state: RootState) => state.login;

export const { reducer: loginReducer } = loginSlice;
