import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectLoggedState } from '../../store/login/login.slice';

const RootPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedState = useSelector(selectLoggedState);

  console.log(loggedState);

  useEffect(() => {
    if (loggedState.isLogged) {
      navigate(`/todo`);
    } else {
      navigate(`/login`);
    }
  }, [loggedState.isLogged, navigate]);
  return <div>test</div>;
};

export default RootPage;
