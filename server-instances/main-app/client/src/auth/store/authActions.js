import api from '../../utils/api';
import { routerActions } from 'react-router-redux';

import { AUTH_USER, UNAUTH_USER } from './authTypes';
import { routeAfterAuth, routeAfterUnauth } from '../authConfig';

export const login = (credentials) => {
  return (dispatch) => {
    return api.post('/AppUsers/login' , credentials)
      .then(response => {
        const rememberMe = credentials.rememberMe;
        const accessToken = response.data.id;
        const user = {
          id: response.data.userId,
          username: credentials.username,
          isAdmin: (response.data.roles.indexOf('admin') != -1),
          accessToken
        };
        api.setAuthenticationHeader(accessToken);
        dispatch({ type: AUTH_USER, rememberMe, user });
        dispatch(routerActions.push(routeAfterAuth));
      });
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    dispatch(routerActions.push(routeAfterUnauth));
    return Promise.resolve();
  }
};
