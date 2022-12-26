import React, { useCallback, useEffect, useState } from 'react';
import { Divider, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Section from '../../component/layout/Section';
import TodoCards from '../../component/card/TodoCards';
import { selectTodos } from '../../store/todo/todo.slice';

export interface filter {
  owner: string;
  title: string;
}

const initialFilter: filter = {
  owner: '전체',
  title: '',
};

const TodoPage = () => {
  const navigate = useNavigate();
  const todos = useSelector(selectTodos);
  const [backLogFilters, setBackLogFilters] = useState(initialFilter);
  const [todoFilters, setTodoFilters] = useState(initialFilter);
  const [doingFilters, setDoingFilters] = useState(initialFilter);
  const [doneFilters, setDoneFilters] = useState(initialFilter);

  return (
    <Stack>
      <Button
        variant="outlined"
        sx={{ my: 1 }}
        onClick={() => navigate(`/login`)}
      >
        exit
      </Button>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ height: '70vh' }}
      >
        {todos && (
          <>
            <Section
              filters={backLogFilters}
              setFilters={setBackLogFilters}
              title="Backlog"
              sx={{ bgcolor: '#d7fcd8' }}
            >
              <TodoCards
                filters={backLogFilters}
                todos={todos.backlogs ?? []}
              />
            </Section>
            <Section
              filters={todoFilters}
              setFilters={setTodoFilters}
              title="To do"
              sx={{ bgcolor: '#d4fff9' }}
            >
              <TodoCards filters={todoFilters} todos={todos.todos ?? []} />
            </Section>
            <Section
              filters={doingFilters}
              setFilters={setDoingFilters}
              title="Doing"
              sx={{ bgcolor: '#f0d9ff' }}
            >
              <TodoCards filters={doingFilters} todos={todos.doings ?? []} />
            </Section>
            <Section
              filters={doneFilters}
              setFilters={setDoneFilters}
              title="Done"
              sx={{ bgcolor: '#fcfcd7' }}
            >
              <TodoCards filters={doneFilters} todos={todos.dones ?? []} />
            </Section>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default TodoPage;
