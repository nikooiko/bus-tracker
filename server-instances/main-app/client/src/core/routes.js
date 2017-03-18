import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

// Components
import App from './App.js';
import Login from '../auth/Login';
import Auth from '../auth/Auth';
import RequireAuth from '../auth/RequireAuth';
import RequireUnauth from '../auth/RequireUnauth';
import Dashboard from '../dashboard/Dashboard';
import DashboardIndex from '../dashboard/DashboardIndex';
import Routes from '../dashboard/routes/Routes';
import RouteShow from '../dashboard/routes/route/Route';
import Home from '../home/Home';

export default (store) => {
  const routeChangeHandler = () => {
    // if (store.getState().sidebar.opened) { // TODO decide if enabled or not
    //   store.dispatch(closeSidebar());
    // }
  };

  return (
    <Route path='/' component={App} onChange={routeChangeHandler}>
      <IndexRoute components={RequireUnauth(Home)}/>
      <Route path='' component={RequireAuth(Dashboard)}>
        <Route path='dashboard' component={DashboardIndex} />
        <Route path='routes' component={Routes}>
          <Route path=':routeId' component={RouteShow} />
        </Route>
      </Route>
      <Route path='auth/' component={RequireUnauth(Auth)}>
        <IndexRedirect to='/'/>
        <Route path='login' component={Login} />
      </Route>
      <Redirect path='*' to='/'/>
    </Route>
  );
};
