import React, { useEffect, useState, useCallback } from 'react';
import { CssVarsProvider, TextField, Button } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import {
  Edit as EditIcon,
  PersonRounded as PersonRoundedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Container from '@components/layout/Container';
import { signUp } from '@store/user/user.slice';
import { signUpAccount } from '@store/login/login.slice';

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputText = 'Enter your email';
  const passwordInputTxt = 'Enter your password';

  const [emailText, setEmailText] = useState<string>('');
  const [emailCount, setEmailCount] = useState<number>(0);
  const [hideEmailForm, setHideEmailForm] = useState<boolean>(true);
  const [hidePasswordForm, setHidePasswordForm] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const animatePassword = () => {
    if (email.length !== 0) setHidePasswordForm(false);
  };

  const handleSignUp = useCallback(() => {
    if (password.length !== 0) {
      dispatch(signUp({ email, password }));
      dispatch(signUpAccount({ email, password }));
      navigate(`/login`);
    }
  }, [dispatch, email, navigate, password]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmailText(emailText + emailInputText[emailCount]);
      setEmailCount(emailCount + 1);
    }, 100);
    if (emailCount === emailInputText.length) {
      clearInterval(interval);
      setHideEmailForm(false);
    }
    return () => clearInterval(interval);
  }, [emailCount, emailText]);

  return (
    <CssVarsProvider>
      <main>
        <Container width={600}>
          {emailText}
          {!hideEmailForm && (
            <Stack direction="row" spacing={2}>
              <TextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                startDecorator={<PersonRoundedIcon />}
                fullWidth
                color="info"
              />
              <Button
                style={{ width: '120px' }}
                color="info"
                onClick={() => animatePassword()}
                variant="soft"
              >
                continue
              </Button>
            </Stack>
          )}
          {!hidePasswordForm && (
            <>
              {passwordInputTxt}
              <Stack direction="row" spacing={2}>
                <TextField
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  startDecorator={<EditIcon />}
                  type="password"
                  fullWidth
                  color="success"
                />
                <Button
                  style={{ width: '120px' }}
                  color="success"
                  onClick={() => handleSignUp()}
                  variant="soft"
                >
                  success
                </Button>
              </Stack>
            </>
          )}
        </Container>
      </main>
    </CssVarsProvider>
  );
};

export default SignUpPage;
