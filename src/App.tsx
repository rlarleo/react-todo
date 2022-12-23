import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store';
import SignUpPage from './pages/login/SignUpPage';
import LoginPage from './pages/login/LoginPage';
import TodoPage from './pages/todo/TodoPage';

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/todo" element={<TodoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
