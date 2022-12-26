import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import Container from '@components/layout/Container';
import { selectLoggedState, logoutAccount } from '@store/login/login.slice';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedState = useSelector(selectLoggedState);

  const handleLogout = useCallback(() => {
    dispatch(logoutAccount());
  }, [dispatch]);

  return (
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
      <Button variant="soft" sx={{ mt: 1 }} onClick={() => navigate(`/todo`)}>
        Go Todo
      </Button>
    </Container>
  );
};

export default LogoutPage;
