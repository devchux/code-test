import 'react-app-polyfill/ie11';
import React, { FC } from 'react';
import '@fortawesome/fontawesome-free/js/all';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import './App.scss';
import Welcome from './Welcome';
import Login from './login';
import Transactions from './transactions';

const App: FC = () => {
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Welcome</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Redirect to="/" />
      </Switch>
      <ToastContainer style={{ fontSize: '16px' }} theme="dark" position="bottom-right" />
    </div>
  );
};

export default App;
