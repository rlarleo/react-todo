import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { initialBacklogs, ITodo, TodoState } from '../../data/todo';

export interface Todo {
  backlogs: ITodo[];
  todos: ITodo[];
  doings: ITodo[];
  dones: ITodo[];
}

export interface IPayloadAction {
  item: ITodo;
  fromState: TodoState;
  toState: TodoState;
  email: string;
}

const initialState: Todo = {
  backlogs: initialBacklogs,
  todos: [],
  doings: [],
  dones: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeState(state, action: PayloadAction<IPayloadAction>) {
      // 옮기기 전 item을 todo list에서 삭제
      const deletedItems = state[action.payload.fromState].filter(
        element => element.id !== action.payload.item.id,
      );
      state[action.payload.fromState] = deletedItems;

      // item의 상태, 소유자 변경
      const changedStateItem = { ...action.payload.item };
      changedStateItem.status = action.payload.toState;
      if (action.payload.toState !== 'backlogs')
        changedStateItem.owner = action.payload.email;
      else changedStateItem.owner = '';

      // 옮긴 후 todo list의 아이템 생성
      state[action.payload.toState].push(changedStateItem);
    },
  },
});

export const { changeState } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo;

export const { reducer: todoReducer } = todoSlice;
