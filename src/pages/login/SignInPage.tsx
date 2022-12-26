import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedState } from '@store/login/login.slice';
import { CssVarsProvider } from '@mui/joy/styles';
import Login from '@components/login/Login';
import Logout from '@components/login/Logout';

const SignInPage = () => {
  const loggedState = useSelector(selectLoggedState);

  return (
    <CssVarsProvider>
      <main>{loggedState.isLogged ? <Logout /> : <Login />} </main>
    </CssVarsProvider>
  );
};

export default SignInPage;
