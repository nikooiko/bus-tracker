import api from '../../utils/api';
import { routerActions } from 'react-router-redux';

import { AUTH_USER, UNAUTH_USER } from './types';
import { routeAfterAuth, routeAfterUnauth } from '../authConfig';
import { showToast } from '../../toast/store/actions';

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
      })
      .catch(() => {
        const message = 'Wrong password. Try again.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
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
