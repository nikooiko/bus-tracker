import api from '../../utils/api';
import { routerActions } from 'react-router-redux';

import { AUTH_USER, UNAUTH_USER } from './types';
import { routeAfterAuth, routeAfterUnauth } from '../authConfig';
import { showToast } from '../../toast/store/actions';

// Sync Action Creators
export const authUser = (rememberMe, user) => {
  return { type: AUTH_USER, rememberMe, user };
};

export const unauthUser = () => {
  return { type: UNAUTH_USER };
};


// Async Action Creators
export const login = (credentials) => {
  return (dispatch) => {
    return api.post('/AppUsers/login' , credentials)
      .then(response => {
        const rememberMe = credentials.rememberMe;
        const accessToken = response.data.id;
        const isAdmin = (response.data.roles.indexOf('admin') != -1);
        const user = {
          id: response.data.userId,
          username: credentials.username,
          isAdmin,
          accessToken
        };
        api.setAuthenticationHeader(accessToken);
        dispatch(authUser(rememberMe, user));
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
    return api.post('/AppUsers/logout')
      .catch(() => null)
      .then(() => {
        api.setAuthenticationHeader(null);
        dispatch(unauthUser());
        dispatch(routerActions.push(routeAfterUnauth));
      });
  }
};
