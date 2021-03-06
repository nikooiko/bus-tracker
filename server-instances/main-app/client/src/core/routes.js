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
import BusRoutes from '../dashboard/bus-routes/List';
import BusRouteCreate from '../dashboard/bus-routes/Create';
import BusRouteEdit from '../dashboard/bus-routes/Edit';
import Stops from '../dashboard/stops/List';
import StopCreate from '../dashboard/stops/Create';
import StopEdit from '../dashboard/stops/Edit';
import Users from '../dashboard/users/List';
import Home from '../home/Home';
import { hideToast } from '../toast/store/actions';

export default (store) => {
  const routeChangeHandler = () => {
    if (!store.getState().toast.hidden) store.dispatch(hideToast());
  };

  return (
    <Route path='/' component={App} onChange={routeChangeHandler}>
      {/*<IndexRoute components={RequireUnauth(Home)}/>*/}
      <IndexRedirect to='/auth/login'/>
      <Route path='' component={RequireAuth(Dashboard)}>
        <Route path='dashboard' component={DashboardIndex} />
        <Route path='routes' component={BusRoutes}>
          <Route path='create' component={BusRouteCreate} />
          <Route path=':routeId/edit' component={BusRouteEdit} />
        </Route>
        <Route path='stops' component={Stops}>
          <Route path='create' component={StopCreate} />
          <Route path=':stopId/edit' component={StopEdit} />
        </Route>
        <Route path='users' component={Users} />
      </Route>
      <Route path='auth' component={RequireUnauth(Auth)}>
        <IndexRedirect to='/'/>
        <Route path='login' component={Login} />
      </Route>
      <Redirect path='*' to='/'/>
    </Route>
  );
};
