import React, { useCallback, useState, useEffect } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/joy/Alert';
import Container from '../../../component/layout/Container';
import { selectUsers } from '../../../store/user/user.slice';
import {
  selectLoggedState,
  loginAccount,
  logoutAccount,
} from '../../../store/login/login.slice';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedState = useSelector(selectLoggedState);

  const handleLogout = useCallback(() => {
    dispatch(logoutAccount());
  }, [dispatch]);

  return (
    <CssVarsProvider>
      <main>
        <Container width={300}>
          <Typography level="h4" component="h1">
            <b>Welcome! {loggedState.email}</b>
          </Typography>
          <Button
            color="danger"
            variant="soft"
            sx={{ mt: 1 }}
            onClick={() => handleLogout()}
          >
            Log out
          </Button>
          <Button
            variant="soft"
            sx={{ mt: 1 }}
            onClick={() => navigate(`/todo`)}
          >
            Go Todo
          </Button>
        </Container>
      </main>
    </CssVarsProvider>
  );
};

export default LogoutPage;
