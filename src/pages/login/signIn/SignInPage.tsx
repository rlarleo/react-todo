import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import Logout from './Logout';
import { selectLoggedState } from '../../../store/login/login.slice';

const SignInPage = () => {
  const loggedState = useSelector(selectLoggedState);

  return loggedState.isLogged ? <Logout /> : <Login />;
};

export default SignInPage;
