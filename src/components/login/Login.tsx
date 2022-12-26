import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/joy/Alert';
import Container from '@components/layout/Container';
import { selectUsers } from '@store/user/user.slice';
import { selectLoggedState, loginAccount } from '@store/login/login.slice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector(selectUsers);
  const loggedState = useSelector(selectLoggedState);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const handleSignUp = useCallback(() => {
    const found = users.find(
      element => element.email === email && element.password === password,
    );
    if (found) {
      setIsIncorrect(false);
      dispatch(loginAccount({ email, password }));
    } else {
      setIsIncorrect(true);
    }
  }, [dispatch, email, password, users]);

  useEffect(() => {
    if (!loggedState.isLogged) {
      setEmail(loggedState.email || '');
      setPassword(loggedState.password || '');
    }
  }, [loggedState.email, loggedState.isLogged, loggedState.password]);

  return (
    <>
      {isIncorrect && (
        <Alert color="danger">Incorrect username or password.</Alert>
      )}
      <Container width={300}>
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome to Bmeks</b>
          </Typography>
          <Typography level="body2">Sign in to continue.</Typography>
        </div>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="아이디"
          label="Username or email address"
          color="info"
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="비밀번호"
          label="Password"
          color="success"
        />
        <Button variant="soft" sx={{ mt: 1 }} onClick={() => handleSignUp()}>
          Log in
        </Button>
        <Typography
          endDecorator={
            <Link onClick={() => navigate(`/sign-up`)}>Sign up</Link>
          }
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Container>
    </>
  );
};

export default Login;
