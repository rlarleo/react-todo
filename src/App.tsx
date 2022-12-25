import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store';
import SignUpPage from './pages/login/SignUpPage';
import SignInPage from './pages/login/signIn/SignInPage';
import TodoPage from './pages/todo/TodoPage';
import RootPage from './pages/root/RootPage';

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/todo" element={<TodoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
