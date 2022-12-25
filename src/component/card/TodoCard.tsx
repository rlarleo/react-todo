import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardActionArea,
  Stack,
  Chip,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import {
  WindowScroller as _WindowScroller,
  CellMeasurer as _CellMeasurer,
  AutoSizer as _AutoSizer,
  List as _List,
  ListRowProps,
} from 'react-virtualized';
import { ITodo, TodoState } from '../../data/todo';
import { changeState } from '../../store/todo/todo.slice';
import { selectLoggedState, loginAccount } from '../../store/login/login.slice';
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

const TodoCard: React.FC<ICardProps> = ({
  children,
  filters,
  todos,
}: ICardProps) => {
  const dispatch = useDispatch();
  const { email } = useSelector(selectLoggedState);
  const [filterdTodos, setFilterdTodos] = useState<ITodo[]>([]);
  const [filterdViewTodos, setFilterdViewTodos] = useState<ITodo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const handleTodo = useCallback(
    (item: ITodo, fromState: TodoState, toState: TodoState) => {
      if (email) dispatch(changeState({ item, fromState, toState, email }));
    },
    [dispatch, email],
  );

  const rowRenderer = useCallback(
    ({ index }: ListRowProps) => {
      const todo = filterdTodos[index];
      if (todo === undefined) return;
      return (
        <Card
          key={todo.id}
          sx={{
            borderRadius: 3,
            mb: 1,
            bgcolor:
              email !== todo.owner && todo.owner !== '' ? '#f0f2f0' : 'none',
          }}
        >
          <CardActionArea>
            <CardContent sx={{ textAlign: 'left' }}>
              {`#${todo.id} `}
              <Typography
                gutterBottom
                variant="body2"
                fontSize={20}
                component="div"
                style={{ wordBreak: 'break-all' }}
              >
                {todo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {todo.owner}
              </Typography>
              <Stack
                direction="row"
                spacing={0.5}
                justifyContent="space-between"
              >
                <Chip
                  label="B"
                  disabled={email !== todo.owner && todo.owner !== ''}
                  sx={{ backgroundColor: '#d7fcd8' }}
                  onClick={() => handleTodo(todo, todo.status, 'backlogs')}
                />
                <Chip
                  label="T"
                  disabled={email !== todo.owner && todo.owner !== ''}
                  sx={{ backgroundColor: '#d4fff9' }}
                  onClick={() => handleTodo(todo, todo.status, 'todos')}
                />
                <Chip
                  label="D"
                  disabled={email !== todo.owner && todo.owner !== ''}
                  sx={{ backgroundColor: '#f0d9ff' }}
                  onClick={() => handleTodo(todo, todo.status, 'doings')}
                />
                <Chip
                  label="D"
                  disabled={email !== todo.owner && todo.owner !== ''}
                  sx={{ backgroundColor: '#fcfcd7' }}
                  onClick={() => handleTodo(todo, todo.status, 'dones')}
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    },
    [email, filterdTodos, handleTodo],
  );

  useEffect(() => {
    setFilterdTodos([]);
  }, [filters.owner, filters.title, todos]);

  useEffect(() => {
    const filtering = todos.filter(
      todo =>
        (filters.owner === '전체' ? true : todo.owner === filters.owner) &&
        (filters.title === '' ? true : todo.title.includes(filters.title)),
    );
    setTimeout(() => setFilterdTodos(filtering), 10);
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
export default TodoCard;
