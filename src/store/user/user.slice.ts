import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User {
  email: string;
  password: string;
}

export interface IUser {
  users: User[];
}

const initialState: IUser = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { signUp } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export const { reducer: userReducer } = userSlice;
