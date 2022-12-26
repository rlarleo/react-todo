import { Todo } from '@store/todo/todo.slice';

export type TodoState = keyof Todo;

export interface ITodo {
  id: number;
  title: string;
  owner: string;
  status: TodoState;
}
export const initialBacklogs: ITodo[] = [];
for (let i = 0; i < 10000; i += 1) {
  initialBacklogs.push({
    id: i,
    title: i.toString(),
    owner: '',
    status: 'backlogs',
  });
}
export const todos: ITodo[] = [];
export const doings: ITodo[] = [];
export const dones: ITodo[] = [];
