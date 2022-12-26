import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedState } from '../../store/login/login.slice';

const RootPage = () => {
  const navigate = useNavigate();
  const loggedState = useSelector(selectLoggedState);

  useEffect(() => {
    if (loggedState.isLogged) {
      navigate(`/todo`);
    } else {
      navigate(`/login`);
    }
  }, [loggedState.isLogged, navigate]);
  return <div>root page</div>;
};

export default RootPage;
