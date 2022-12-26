import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedState } from '@store/login/login.slice';
import Login from './Login';
import Logout from './Logout';

const SignInPage = () => {
  const loggedState = useSelector(selectLoggedState);

  return loggedState.isLogged ? <Logout /> : <Login />;
};

export default SignInPage;
