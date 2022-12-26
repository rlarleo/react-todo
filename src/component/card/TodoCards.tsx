import React, { useEffect, useState, useCallback } from 'react';
import {
  WindowScroller as _WindowScroller,
  CellMeasurer as _CellMeasurer,
  AutoSizer as _AutoSizer,
  List as _List,
  ListRowProps,
} from 'react-virtualized';
import TodoCard from './TodoCard';
import { ITodo } from '../../data/todo';
import { filter } from '../../pages/todo/TodoPage';
import InfiniteScroll from '../../hooks/infiniteScroll/infiniteScroll';

interface ICardProps {
  children?: React.ReactNode;
  filters: filter;
  todos: ITodo[];
}

const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    loading...
  </div>
);

const TodoCards: React.FC<ICardProps> = ({
  children,
  filters,
  todos,
}: ICardProps) => {
  const [filterdTodos, setFilterdTodos] = useState<ITodo[]>([]);
  const [filterdViewTodos, setFilterdViewTodos] = useState<ITodo[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const rowRenderer = useCallback(
    ({ index }: ListRowProps) => {
      const todo = filterdTodos[index];
      if (todo === undefined) return;
      return <TodoCard todo={todo} />;
    },
    [filterdTodos],
  );

  useEffect(() => {
    const filtering = todos.filter(
      todo =>
        (filters.owner === '전체' ? true : todo.owner === filters.owner) &&
        (filters.title === '' ? true : todo.title.includes(filters.title)),
    );
    setFilterdTodos(filtering);
  }, [filters.owner, filters.title, todos]);

  useEffect(() => {
    if (filterdViewTodos.length >= filterdTodos.length) {
      setHasMore(false);
    }
  }, [filterdTodos.length, filterdViewTodos.length]);

  return (
    <div>
      {filterdTodos.length !== 0 && (
        <InfiniteScroll
          dataLength={filterdTodos.length}
          hasMore={hasMore}
          loader={<Loader />}
          height={600}
          renderer={rowRenderer}
          // eslint-disable-next-line react/no-children-prop
          children={filterdTodos}
        />
      )}
    </div>
  );
};
export default TodoCards;
