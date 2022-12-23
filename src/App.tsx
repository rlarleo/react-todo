import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
//import Login from './pages/login/Login'

const Login = lazy(() => import('./pages/login/Login'));
const Todo = lazy(() => import('./pages/todo/Todo'));

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
